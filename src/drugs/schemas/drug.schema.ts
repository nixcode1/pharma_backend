import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { pointSchema } from 'src/common/schemas/point.schema';

export type DrugDocument = Drug & Document;

@Schema({toJSON: {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id  }
}})
export class Drug {

  @Prop()
  name: string;

  @Prop(raw({
    type: pointSchema,
    required: true,
    index: '2dsphere'
  }))
  location: string;

}

export const DrugSchema = SchemaFactory.createForClass(Drug);