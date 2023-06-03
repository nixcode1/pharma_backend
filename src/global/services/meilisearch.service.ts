import { Injectable } from '@nestjs/common';
import { MeiliSearch } from 'meilisearch';
import { Drug } from 'src/drugs/schemas/drug.schema';
import { SearchService } from './search.service';

@Injectable()
export class MeilisearchService extends SearchService {
  async searchDrug(query: string): Promise<Drug[]> {
    const data = await this.client.index('drugs').search(query);
    console.log(data);
    return data.hits as Drug[];
  }
  private client: MeiliSearch;
  constructor() {
    super();
    this.client = new MeiliSearch({ host: 'http://127.0.0.1:7700' });
  }
}
