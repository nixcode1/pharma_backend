import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { pointSchema } from 'src/common/schemas/point.schema';

export type DrugDocument = Drug & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
})
export class Drug {
  @Prop(
    raw({
      type: String,
      required: true,
      index: 'text',
    }),
  )
  name: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId })
  id: string;

  @Prop()
  genericName: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId })
  genericId: string;
}

export const DrugSchema = SchemaFactory.createForClass(Drug);
