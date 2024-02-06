import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from "@nestjs/common";
import { ApplicationResponse } from "./dto/application-response.dto";
import { ApplicationCreateRequest } from "./dto/application-request.dto";
import { ApplicationDatabase } from "./repository/application.repository";
import { ApplicationUpdateRequest } from "./dto/application-update-request.dto";
import { ApplicationsResponse } from "./dto/applications-response.dto";
import { CustomerService } from "../customer/customer.service";
import { CustomerEntity } from "../customer/repository/customer.entity";
import { ApplicationEntity } from "./repository/application.entity";
import { TypesenseService } from "../typesense/typesense.service";

@Injectable()
export class ApplicationService {
  public constructor(private readonly db: ApplicationDatabase,
                      private readonly customerService: CustomerService,
                      private readonly typesenseService: TypesenseService) {}

  public async createApplication(customerId:number,
                                userId: string,
                                applicationCreateRequest: ApplicationCreateRequest): Promise<ApplicationResponse> {
    const toEntity = ApplicationCreateRequest.toEntity(
      applicationCreateRequest
    );

    //Generate and set app-id and api-key
    toEntity.appID = this.generateAppId();
    toEntity.apiKey = this.generateAPIKey();
    
    //extract cutomer
    const customer: CustomerEntity = await this.customerService.getCustomerEntityById(customerId, userId);

    // Set the customer
    toEntity.customer = customer;
    
    const createdEntity = await this.db.createApplication(toEntity);
    if (!createdEntity)
      throw new InternalServerErrorException("Failed to create the record");

    this.typesenseService.createCollection(toEntity.appID, toEntity.schema);
    
    return createdEntity;
    
  }

  public async getApplicationById(id: number): Promise<ApplicationResponse> {
    const entity =  await this.db.getApplicationById(id);
    return ApplicationResponse.fromEntity(entity);
  }

  public async getApplicationEntityById(id: number): Promise<ApplicationEntity> {
    return await this.db.getApplicationById(id);
  }

  public async getApplications(customerId:number, userId: string, start: number, limit: number): Promise<ApplicationResponse[]> {
    
    const customer: CustomerEntity = await this.customerService.getCustomerEntityById(customerId, userId);
    const entities = await this.db.getApplicationsByCustomer(customer, start, limit);
    return entities;
  }

  public async updateApplication(
    applicationUpdateRequest: ApplicationUpdateRequest,
    applicationId: number
  ): Promise<ApplicationResponse> {
    const entity = ApplicationUpdateRequest.toEntity(
      applicationUpdateRequest
    );
    entity.id = applicationId;
    const createdEntity = await this.db.updateApplicationInfo(entity);
    if (!createdEntity)
      throw new InternalServerErrorException("Failed to create the record");
    return createdEntity;
  }

  public async deleteApplication(id: number): Promise<Boolean> {
    return await this.db.deleteApplication(id);
  }


  public generateAppId() : string {
    return `test-app-id-${Math.random() * 100}`;
  }

  public generateAPIKey() : string {
    return `test-api-key-${Math.random() * 100}`;
  }

}
