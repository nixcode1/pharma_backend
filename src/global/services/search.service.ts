import { Drug } from 'src/drugs/schemas/drug.schema';

export abstract class SearchService {
  abstract searchDrug(query: string): Promise<Drug[]>;
}
