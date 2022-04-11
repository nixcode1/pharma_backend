import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { pointSchema } from 'src/common/schemas/point.schema';

export type DrugDocument = Drug & Document;

@Schema()
export class Drug {

  @Prop()
  name: string;

  @Prop({type: mongoose.Schema.Types.Decimal128})
  price: number

  @Prop()
  genericName: string

}

export const DrugSchema = SchemaFactory.createForClass(Drug);