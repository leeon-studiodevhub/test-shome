import { Injectable } from '@nestjs/common';
import { getTypesenseConfig } from './typesense.instance';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { SearchParams, SearchResponse } from 'typesense/lib/Typesense/Documents';
import { TypesenseClient } from './typesense';

@Injectable()
export class TypesenseService {
    booksSchema: CollectionCreateSchema = {
        name: 'my-collection',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'authors', type: 'string[]', facet: true },
          { name: 'publication_year', type: 'int32', facet: true },
          { name: 'ratings_count', type: 'int32' },
          { name: 'average_rating', type: 'float' },
        ],
        default_sorting_field: 'ratings_count',
      };
      

    private readonly typesense = getTypesenseConfig('localhost', 8108, 'http', 'xyz', this.booksSchema);

    /**
   *
   * Index my Data
   *
   */
  public async createCollection(appId: string, schema: string): Promise<object> {

    const fields = JSON.parse(schema);

    const filteredSchema : CollectionCreateSchema = {
      name: appId,
      fields
    }

    try {
      const typesense : TypesenseClient = getTypesenseConfig('localhost', 8108, 'http', 'xyz', filteredSchema);
      return await typesense.createCollection();
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  public async getCollection(appId: string): Promise<object>{
    try {
      const typesense : TypesenseClient = getTypesenseConfig('localhost', 8108, 'http', 'xyz', this.booksSchema);
      return await typesense.retrieveCollection(appId);
      //typesense.createCollection
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
    
  }
  /**
   *
   * Index my Data
   *
   */
  async singleDocumentIndexing(appId: string, data: object): Promise<object> {
    /*let document = {
      'id': '124',
      'company_name': 'Stark Industries',
      'num_employees': 5215,
      'country': 'USA'
    }*/
    try {
      return await this.typesense.singleIndex(data, appId);
    } catch (error) {
      return error.message;
    }
  }

  async multipleDocumentIndexing(appId: string, data: string): Promise<object> {
    /*let documents = [{
      'id': '124',
      'company_name': 'Stark Industries',
      'num_employees': 5215,
      'country': 'USA'
    }]*/

    const object = JSON.parse(data);
    try {
      return await this.typesense.batchIndex(object, appId);
    } catch (error) {
      return error.message;
    }
  }

  /**
   *
   * getting Search Data
   *
   */
  async searchData(appId: string, query: SearchParams): Promise<SearchResponse<object>> {
    try {
      return this.typesense.searchByQuery(query, appId);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
