import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { Pharmacy, PharmacyDocument } from './schemas/pharmacy.schema';
import { Drug } from './schemas/drug.schema';

@Injectable()
export class PharmaciesService {
  constructor(@InjectModel(Pharmacy.name) private pharmacyModel: Model<PharmacyDocument>) { }

  async onModuleInit() {
    console.log("Seeding data...");
    await this.seedData()
    console.log("Seeding down");

  }

  create(createPharmacyDto: CreatePharmacyDto) {
    return 'This action adds a new pharmacy';
  }

  findAll() {
    return `This action returns all pharmacies`;
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

  async seedData() {
    this.pharmacyModel.collection.drop();
    const pharm = await this.pharmacyModel.create({
      name: "Test Pharm",
      location: { type: 'Point', coordinates: [4.896373473997349, 6.907649779181705] }
    })
    for (let i = 0; i < 1; i++) {
      const drugs = this.seedAThousandDrugs()
      await this.pharmacyModel.updateOne({ id: pharm._id },
        { $push: { drugs: { $each: drugs } } })
      console.log("Added a thousand drugs to db");
      const count = await this.pharmacyModel.aggregate([
        {
          $project: {
            name: 1,
            productCount: { $cond: { if: { $isArray: "$drugs" }, then: { $size: "$drugs" }, else: "NA" } },
            size_MB: { "$divide": [{"$bsonSize": "$$ROOT"}, 1000000]}
          }
        }
      ])
      console.log("COUNT: ", count)
    }

  }

  seedAThousandDrugs(): Array<Drug> {
    console.log("Creating a thousand seed data...");

    const drugs = <Array<Drug>>[];
    for (let i = 0; i < 1000; i++) {
      drugs.push(
        {
          name: "TestDrug",
          genericName: "Test",
          price: 100.0
        }
      )
    }

    console.log("Creating a thousand seed data... Completed");

    return drugs;
  }
}
