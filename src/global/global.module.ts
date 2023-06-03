import { Global, Module } from '@nestjs/common';
import { MeilisearchService } from './services/meilisearch.service';
import { SearchService } from './services/search.service';

@Global()
@Module({
  providers: [
    {
      provide: SearchService,
      useClass: MeilisearchService,
    },
  ],
  exports: [SearchService],
})
export class GlobalModule {}
