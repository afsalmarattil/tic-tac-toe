import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  avatar?: string;
  wins: number;
  symbol: string,
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String },
  wins: { type: Number, default: 0 },
  symbol: {type: String},
  
});

export default mongoose.model<IUser>('User', UserSchema);
