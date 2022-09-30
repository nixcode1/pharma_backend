import { Injectable } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient();
    await this.client.connect();
  }

  getClient(): RedisClientType {
    return this.client;
  }
}
