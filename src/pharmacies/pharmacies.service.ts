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
    await this.seedData();
    console.log("Seeding down");
  }

  create(createPharmacyDto: CreatePharmacyDto) {
    return 'This action adds a new pharmacy';
  }

  async find(name: string, range: number): Promise<Array<Pharmacy>> {
    const query = await this.pharmacyModel.aggregate([

      {
        $geoNear: {
          near: { type: "Point", coordinates: [4.897105874430844, 6.906863246817034] },
          distanceField: "distance",
          maxDistance: range,
          // query: {
          //   "drugs.name": {
          //     '$regex': name,
          //     '$options': 'i'
          //   }
          // },
          key: 'location',
          spherical: false
        }
      },
      {
        $unwind:
        {
          path: "$drugs",
        }
      },
      {
        $match:
        {
          "drugs.name": {
            '$regex': name,
            '$options': 'i'
          }
        }
      },
    ])

    return query;
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
    // Create pharmacies
    const listOfPharms = [{

      location: { type: 'Point', coordinates: [4.896373473997349, 6.907649779181705] }
    },
    {
      location: { type: 'Point', coordinates: [4.896702204408156, 6.90685229805645] }
    },
    {
      location: { type: 'Point', coordinates: [4.895432201721392, 6.906951681894093] }
    },
    {
      location: { type: 'Point', coordinates: [4.896537609625513, 6.903776182564811] }
    },
    {
      location: { type: 'Point', coordinates: [4.8955053377948055, 6.915162287410065] }
    },
    {
      location: { type: 'Point', coordinates: [4.902106603592787, 6.908990848952584] }
    },
    {
      location: { type: 'Point', coordinates: [4.890325087043335, 6.902450464662324] }
    },
    {
      location: { type: 'Point', coordinates: [4.896336137252542, 6.906888119058976] }
    }];
    this.pharmacyModel.collection.drop();
    let drugsData;
    for (let i = 0; i < listOfPharms.length; i++) {
      let pharm = await this.pharmacyModel.create({
        ...listOfPharms[i],
        name: `Pharm ${i + 1}`
      })

      if (i < 4) {
        drugsData = drugList[i]
      } else {
        drugsData = drugList[i - 4];
      }

      const data = await this.pharmacyModel.findByIdAndUpdate(pharm._id,
        { $push: { drugs: { $each: drugsData } } })
    }
    const search = await this.find("na", 1000);
    console.log(JSON.stringify(search, null, 4));
  }



  // async seedTestData() {
  //   this.pharmacyModel.collection.drop();
  //   const pharm = await this.pharmacyModel.create({
  //     name: "Test Pharm",
  //     location: { type: 'Point', coordinates: [4.896373473997349, 6.907649779181705] }
  //   })
  //   for (let i = 0; i < 1; i++) {
  //     const drugs = this.seedAThousandDrugs()
  //     await this.pharmacyModel.updateOne({ id: pharm._id },
  //       { $push: { drugs: { $each: drugs } } })
  //     console.log("Added a thousand drugs to db");
  //     const count = await this.pharmacyModel.aggregate([
  //       {
  //         $project: {
  //           name: 1,
  //           productCount: { $cond: { if: { $isArray: "$drugs" }, then: { $size: "$drugs" }, else: "NA" } },
  //           size_MB: { "$divide": [{"$bsonSize": "$$ROOT"}, 1000000]}
  //         }
  //       }
  //     ])
  //     console.log("COUNT: ", count)
  //   }

  // }

  // seedAThousandDrugs(): Array<Drug> {
  //   console.log("Creating a thousand seed data...");

  //   const drugs = <Array<Drug>>[];
  //   for (let i = 0; i < 1000; i++) {
  //     drugs.push(
  //       {
  //         name: "TestDrug",
  //         genericName: "Test",
  //         price: 100.0
  //       }
  //     )
  //   }

  //   console.log("Creating a thousand seed data... Completed");

  //   return drugs;
  // }
}

const drugs1 = [
  {
    name: "Paracetamol",
    genericName: "Test",
    price: 50.0
  },
  {
    name: "Panadol",
    genericName: "Test",
    price: 50.0
  },
  {
    name: "Amala",
    genericName: "Test",
    price: 50.0
  },
]

const drugs2 = [
  {
    name: "Paracetamol",
    genericName: "Test",
    price: 60.0
  },
  {
    name: "Vitamin C",
    genericName: "Test",
    price: 50.0
  },
]

const drugs3 = [
  {
    name: "Paracetamol",
    genericName: "Test",
    price: 90.0
  },
  {
    name: "Amala",
    genericName: "Test",
    price: 50.0
  },
  {
    name: "Vitamin C",
    genericName: "Test",
    price: 50.0
  },
]

const drugs4 = [
  {
    name: "Gentamincin",
    genericName: "Test",
    price: 80.0
  },
  {
    name: "Coartem",
    genericName: "ACT",
    price: 50.0
  },
  {
    name: "Vitamin C",
    genericName: "Test",
    price: 50.0
  },
]

const drugList = [drugs1, drugs2, drugs3, drugs4];
