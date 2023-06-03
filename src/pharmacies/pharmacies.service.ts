import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { Pharmacy, PharmacyDocument } from './schemas/pharmacy.schema';
// import { Drug } from './schemas/drug.schema';
import { RedisService } from 'src/common/services/redis.service';
// import { GeoCoordinates, GeoReplyWith, GeoSearchOptions } from '@redis/client/dist/lib/commands/generic-transformers';
// import mongoose from 'mongoose';
import { IORedisService } from 'src/common/services/ioredis.service';
import { Drug, DrugDocument } from 'src/drugs/schemas/drug.schema';
import { SearchService } from 'src/global/services/search.service';

@Injectable()
export class PharmaciesService {
  constructor(
    @InjectModel(Pharmacy.name) private pharmacyModel: Model<PharmacyDocument>,
    @InjectModel(Drug.name) private drugModel: Model<DrugDocument>,
    private searchService: SearchService, // private redisService: RedisService, // private ioredisService: IORedisService,
  ) {}

  async onModuleInit() {
    // console.log('Seeding data...');
    // console.log('Seeding down');
    this.find('Em', 1000);
  }

  create(createPharmacyDto: CreatePharmacyDto) {
    return 'This action adds a new pharmacy';
  }

  async find(name: string, range: number): Promise<Pharmacy[]> {
    const nearbyPharmIds = await this.searchNearByPharms(
      [4.896336137252542, 6.906888119058976],
      range,
    );

    await this.searchDrug(name);

    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} pharmacy`;
  }

  update(id: number, updatePharmacyDto: UpdatePharmacyDto) {
    return `This action updates a #${id} pharmacy`;
  }

  remove(id: number) {
    return `This action removes a #${id} pharmacy`;
  }

  private async searchNearByPharms(
    coordinates: number[],
    distance: number,
  ): Promise<string[]> {
    const mongodbStartTime = Date.now();
    const mongoSearch = await this.pharmacyModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [4.896336137252542, 6.906888119058976],
          },
          $minDistance: 0,
          $maxDistance: 70,
        },
      },
    });
    console.log('Mongo', Date.now() - mongodbStartTime);
    const pharmIds = mongoSearch.map((e) => e.id);
    console.log(pharmIds);

    return pharmIds;
  }

  private async searchDrug(query: string): Promise<void> {
    const result = await this.searchService.searchDrug(query);
    console.log(result);
  }
}
