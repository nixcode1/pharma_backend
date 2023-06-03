import { Module } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { PharmaciesController } from './pharmacies.controller';
import { Pharmacy } from './entities/pharmacy.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacySchema } from './schemas/pharmacy.schema';
import { RedisService } from 'src/common/services/redis.service';
import { IORedisService } from 'src/common/services/ioredis.service';
import { Drug, DrugSchema } from 'src/drugs/schemas/drug.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacy.name, schema: PharmacySchema },
      { name: Drug.name, schema: DrugSchema },
    ]),
  ],
  controllers: [PharmaciesController],
  providers: [PharmaciesService],
})
export class PharmaciesModule {}
