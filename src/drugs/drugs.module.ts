import { Module } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { DrugsController } from './drugs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Drug } from './entities/drug.entity';
import { DrugSchema } from './schemas/drug.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Drug.name, schema: DrugSchema }]),
  ],
  controllers: [DrugsController],
  providers: [DrugsService],
})
export class DrugsModule {}
