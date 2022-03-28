import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrugsModule } from './drugs/drugs.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/pharm_find'), DrugsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}