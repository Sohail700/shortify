import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUrl extends Document {
  shortId: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
}

const urlSchema = new Schema<IUrl>({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  clicks: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite in dev hot reload
const Url: Model<IUrl> =
  mongoose.models.Url || mongoose.model<IUrl>('Url', urlSchema);

export default Url;
