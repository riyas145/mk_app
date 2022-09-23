import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocumet = Category & Document;
@Schema()
export class Category {
  @Prop({ require: true, unique: true })
  category_name: string;
  @Prop({ default: true })
  isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
