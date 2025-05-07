import { customAlphabet } from 'nanoid';
import { z } from 'zod';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const generateShortId = customAlphabet(alphabet, 8);

export const urlSchema = z.object({
  url: z.string().url('Invalid URL format'),
});

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}