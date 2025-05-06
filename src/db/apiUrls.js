import {UAParser} from "ua-parser-js";
import supabase from "./supabase";

// export async function getClicks() {
//   let {data, error} = await supabase.from("clicks").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Unable to load Stats");
//   }

//   return data;
// }


/**
 * Fetches a single URL by ID
 * @param {string} urlId - The ID of the URL to fetch
 * @param {Object} options - Optional parameters
 * @param {boolean} options.withClicks - Include click statistics
 * @returns {Promise<Object|null>} The URL object or null if not found
 */
export async function getUrl(urlId, { withClicks = false } = {}) {
  try {
    // Fetch the URL
    const { data: urlData, error: urlError } = await supabase
      .from('urls')
      .select('*')
      .eq('id', urlId)
      .single();

    if (urlError) {
      if (urlError.code === 'PGRST116') { // No rows found
        return null;
      }
      throw urlError;
    }

    // If we don't need clicks, return early
    if (!withClicks) {
      return urlData;
    }

    // Fetch click statistics if requested
    const { data: clicksData, error: clicksError } = await supabase
      .from('clicks')
      .select('*')
      .eq('url_id', urlId);

    if (clicksError) throw clicksError;

    // Aggregate some useful click statistics
    const deviceStats = clicksData.reduce((acc, click) => {
      acc[click.device] = (acc[click.device] || 0) + 1;
      return acc;
    }, {});

    const locationStats = clicksData.reduce((acc, click) => {
      const key = `${click.city}, ${click.country}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return {
      ...urlData,
      clicks: clicksData,
      totalClicks: clicksData.length,
      deviceStats,
      locationStats,
      lastClickedAt: clicksData.length > 0 
        ? new Date(Math.max(...clicksData.map(c => new Date(c.created_at)))) 
        : null
    };
  } catch (error) {
    console.error(`Error fetching URL ${urlId}:`, error);
    throw error;
  }
}


/**
 * Fetches URLs from the database
 * @param {Object} options - Optional parameters
 * @param {string} options.userId - Filter URLs by user ID
 * @param {boolean} options.withClicks - Include click statistics for each URL
 * @returns {Promise<Array>} Array of URL objects
 */
export async function getUrls({ userId = null, withClicks = false } = {}) {
  try {
    // Base query
    let query = supabase
      .from('urls')
      .select('*');

    // Filter by user if userId is provided
    if (userId) {
      query = query.eq('user_id', userId);
    }

    // Execute the query
    const { data, error } = await query;

    if (error) throw error;

    // If we need to include click statistics
    if (withClicks && data.length > 0) {
      const urlIds = data.map(url => url.id);
      const { data: clicksData, error: clicksError } = await supabase
        .from('clicks')
        .select('*')
        .in('url_id', urlIds);

      if (clicksError) throw clicksError;

      // Aggregate clicks data and merge with URLs
      const clicksByUrl = clicksData.reduce((acc, click) => {
        if (!acc[click.url_id]) {
          acc[click.url_id] = [];
        }
        acc[click.url_id].push(click);
        return acc;
      }, {});

      return data.map(url => ({
        ...url,
        clicks: clicksByUrl[url.id] || [],
        totalClicks: (clicksByUrl[url.id] || []).length
      }));
    }

    return data;
  } catch (error) {
    console.error('Error fetching URLs:', error);
    throw error;
  }
}

export async function getClicksForUrls(urlIds) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

export async function createUrl({ title, longUrl, customUrl, user_id }, qrCodeBlob) {
  try {
    // Upload QR code to storage if blob is provided
    let qrCodeUrl = null;
    if (qrCodeBlob) {
      const fileName = `qr_codes/${user_id}/${Date.now()}.png`;
      const { error: uploadError } = await supabase.storage
        .from('qr_codes') // Make sure you have this bucket created in Supabase Storage
        .upload(fileName, qrCodeBlob);

      if (uploadError) throw uploadError;

      // Get public URL of the uploaded QR code
      const { data: urlData } = supabase.storage
        .from('qr_codes')
        .getPublicUrl(fileName);
      
      qrCodeUrl = urlData.publicUrl;
    }

    // Insert the URL record
    const { data, error } = await supabase
      .from('urls')
      .insert({
        title,
        original_url: longUrl,
        short_url: customUrl || null, // If no custom URL, let Supabase generate one
        user_id,
        qr_code_url: qrCodeUrl,
        clicks: 0
      })
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error creating URL:', error);
    throw error;
  }
}


export async function getClicksForUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}

const parser = new UAParser();

export const storeClicks = async ({id, originalUrl}) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop"; // Default to desktop if type is not detected

    const response = await fetch("https://ipapi.co/json");
    const {city, country_name: country} = await response.json();

    // Record the click
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    // Redirect to the original URL
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click:", error);
  }
};

export async function deleteUrl(urlId, userId) {
    try {
      // First get the URL record to check for QR code
      const { data: urlData, error: fetchError } = await supabase
        .from('urls')
        .select('qr_code_url')
        .eq('id', urlId)
        .eq('user_id', userId)
        .single();
  
      if (fetchError) throw fetchError;
  
      // If the URL has a QR code, delete it from storage
      if (urlData.qr_code_url) {
        // Extract the file path from the URL
        const filePath = urlData.qr_code_url.split('/qr_codes/')[1];
        
        const { error: deleteStorageError } = await supabase.storage
          .from('qr_codes')
          .remove([filePath]);
  
        if (deleteStorageError) {
          console.warn('Failed to delete QR code from storage:', deleteStorageError);
          // Continue with URL deletion even if QR code deletion fails
        }
      }
  
      // Delete the URL record
      const { error: deleteError } = await supabase
        .from('urls')
        .delete()
        .eq('id', urlId)
        .eq('user_id', userId);
  
      if (deleteError) throw deleteError;
  
      return true;
    } catch (error) {
      console.error('Error deleting URL:', error);
      throw error;
    }
  }
