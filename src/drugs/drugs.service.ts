import { Model } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { Drug } from './entities/drug.entity';
import { DrugDocument } from './schemas/drug.schema';

@Injectable()
export class DrugsService implements OnModuleInit {

  constructor(@InjectModel(Drug.name) private drugModel: Model<DrugDocument>) { }

  onModuleInit() {
    this.drugModel.collection.drop();
    this.drugModel.insertMany([
      {
        name: "Ken Communications",
        location: { type: 'Point', coordinates: [4.896373473997349, 6.907649779181705] }
      },
      {
        name: "First Bank",
        location: { type: 'Point', coordinates: [4.896702204408156, 6.90685229805645] }
      },
      {
        name: "Genesis",
        location: { type: 'Point', coordinates: [4.895432201721392, 6.906951681894093] }
      },
      {
        name: "Exquiste Kitchen",
        location: { type: 'Point', coordinates: [4.896537609625513, 6.903776182564811] }
      },
      {
        name: "Uniport Main Gate",
        location: { type: 'Point', coordinates: [4.8955053377948055, 6.915162287410065] }
      },
      {
        name: "Lulu Briggs",
        location: { type: 'Point', coordinates: [4.902106603592787, 6.908990848952584] }
      },
      {
        name: "Tegod Pharmacy",
        location: { type: 'Point', coordinates: [4.890325087043335, 6.902450464662324] }
      },
      {
        name: "Icon Mobile",
        location: { type: 'Point', coordinates: [4.896336137252542, 6.906888119058976] }
      }
    ], {}, function (err) {
      if (err) return console.log("Failed to seed drugs db: ", err);;
      return console.log('DB seeded');
      

    });
  }

  create(createDrugDto: CreateDrugDto) {
    return 'This action adds a new drug';
  }

  findAll(range: number) {
    return this.drugModel.find({ location: { $near: { $geometry: { type: "Point", coordinates: [ 4.897105874430844, 6.906863246817034] }, $maxDistance: range } } })
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
