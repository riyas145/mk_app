import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  photo: string;
  @Prop()
  address: string;
  @Prop()
  dob: Date;
  @Prop({ default: true })
  isActive: boolean;
  @Prop({ default: false })
  isVerified: boolean;
}
export const UserSchema = SchemaFactory.createForClass(Users);
