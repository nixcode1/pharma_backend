import { Module } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { PharmaciesController } from './pharmacies.controller';
import { Pharmacy } from './entities/pharmacy.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacySchema } from './schemas/pharmacy.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pharmacy.name, schema: PharmacySchema }])],
  controllers: [PharmaciesController],
  providers: [PharmaciesService]
})
export class PharmaciesModule {}
