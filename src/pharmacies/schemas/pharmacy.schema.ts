import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { pointSchema } from 'src/common/schemas/point.schema';
import { Item } from './item.schema';

export type PharmacyDocument = Pharmacy & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Pharmacy {
  @Prop()
  name: string;

  @Prop(
    raw({
      type: pointSchema,
      required: true,
      index: '2dsphere',
    }),
  )
  location: {
    type: string;
    coordinates: number[];
  };

  @Prop({ required: false })
  products?: Item[];
}

export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);
