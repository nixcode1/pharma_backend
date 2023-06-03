import { Model } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { Drug } from './entities/drug.entity';
import { DrugDocument } from './schemas/drug.schema';

@Injectable()
export class DrugsService implements OnModuleInit {
  constructor(@InjectModel(Drug.name) private drugModel: Model<DrugDocument>) {}

  onModuleInit() {
    // this.drugModel.collection.drop();
    // this.drugModel.insertMany(
    //   <Drug>[
    //     {
    //       name: 'Emzor paracetamol',
    //     },
    //     {
    //       name: 'M&B paracetamol',
    //     },
    //     {
    //       name: 'Ampliclox',
    //     },
    //   ],
    //   {},
    //   function (err) {
    //     if (err) return console.log('Failed to seed drugs db: ', err);
    //     return console.log('Drugs seeded');
    //   },
    // );
  }

  create(createDrugDto: CreateDrugDto) {
    return 'This action adds a new drug';
  }

  findAll(range: number) {
    return this.drugModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [4.897105874430844, 6.906863246817034],
          },
          $maxDistance: range,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} drug`;
  }

  update(id: number, updateDrugDto: UpdateDrugDto) {
    return `This action updates a #${id} drug`;
  }

  remove(id: number) {
    return `This action removes a #${id} drug`;
  }
}
