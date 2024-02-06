import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { DataResponse } from "./dto/data-response.dto";
import { DataCreateRequest } from "./dto/data-request.dto";
import { DataDatabase } from "./repository/data.repository";
import { DataUpdateRequest } from "./dto/data-update-request.dto";
import { DatasetResponse } from "./dto/dataset-response.dto";
import { ApplicationService } from "../application/application.service";
import { ApplicationEntity } from "../application/repository/application.entity";
import { TypesenseService } from "../typesense/typesense.service";

@Injectable()
export class DataService {

  public constructor(private readonly applicationService: ApplicationService,
                      private readonly db: DataDatabase,
                      private readonly typesenseService: TypesenseService) {}

  public async getDataById(id: number): Promise<DataResponse> {
    return await this.db.getDataById(id);
    
  }

  public async getDataByApplicationId(applicationId: number, start: number, limit: number): Promise<DataResponse[]> {
    const entities = await this.db.getDatasetByApplicationId(applicationId, start, limit);
    return entities;
  }

  public async createData(applicationId: number, dataCreateRequest: DataCreateRequest): Promise<DataResponse> {
    const toEntity = DataCreateRequest.toEntity(
      dataCreateRequest
    );

    //extract application
    const application : ApplicationEntity = await this.applicationService.getApplicationEntityById(applicationId);

    // Set application
    const createdEntity = await this.db.createData(toEntity, application);
    
    if (!createdEntity)
      throw new InternalServerErrorException("Failed to create the record");

    this.typesenseService.singleDocumentIndexing(application.appID, dataCreateRequest);
    
    return createdEntity;
    
  }

  public async updateData(
    dataUpdateRequest: DataUpdateRequest,
    customerId: number
  ): Promise<DataResponse> {
    const entity = DataUpdateRequest.toEntity(
      dataUpdateRequest
    );
    const createdEntity = await this.db.updateData(entity);
    if (!createdEntity)
      throw new InternalServerErrorException("Failed to create the record");
    return createdEntity;
  }

  public async deleteData(id: number): Promise<Boolean> {
    return await this.db.deleteData(id);
  }
}
