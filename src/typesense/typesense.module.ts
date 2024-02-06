import { Module } from '@nestjs/common';
import { TypesenseService } from './typesense.service';
import {} from './typesense.instance'

@Module({
  providers: [TypesenseService],
  exports: [TypesenseService]
})
export class TypesenseModule {}
