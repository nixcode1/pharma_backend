import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class IORedisService {
   private client: Redis

    async onModuleInit() {
        this.client = new Redis();
    }

    getClient(): Redis {
        return this.client;
    }
}
