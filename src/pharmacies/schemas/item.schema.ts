import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.Decimal128 })
  price: number;

  @Prop()
  genericName: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
