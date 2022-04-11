import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { pointSchema } from 'src/common/schemas/point.schema';
import { Drug } from './drug.schema';

export type PharmacyDocument = Pharmacy & Document;

@Schema({toJSON: {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id  }
}})
export class Pharmacy {

  @Prop()
  name: string;

  @Prop(raw({
    type: pointSchema,
    required: true,
    index: '2dsphere'
  }))
  location: string;

  @Prop({required: false})
  drugs?: Drug[]

}

export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);