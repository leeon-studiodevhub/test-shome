import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApplicationCreateRequest } from "../dto/application-request.dto";
import { ApplicationResponse } from "../dto/application-response.dto";
import { ApplicationEntity } from "./application.entity";
import { CustomerEntity } from "../../customer/repository/customer.entity";

@Injectable()
export class ApplicationDatabase {
  
  public constructor(
    @InjectRepository(ApplicationEntity)
    private readonly repository: Repository<ApplicationEntity>
  ) {}

  public async getApplicationById(id: number): Promise<ApplicationEntity> {
    return await this.repository.findOneByOrFail({id});
  }

  public async getApplicationsByCustomer(customer:CustomerEntity, start: number, limit: number): Promise<ApplicationEntity[]> {
    //join customer table and find results
    return await this.repository.find({
      where: {
        customer: {id: customer.id}
      },
      order: {
        createdAt: "DESC",
      },
      skip: start,
      take: limit
    });
  }

  public async createApplication(applicationRequest: ApplicationEntity): Promise<ApplicationEntity> {
    const insertThreadResult = await this.repository.insert(applicationRequest);
    applicationRequest.id = insertThreadResult.identifiers[0].id;
    return applicationRequest;
  }

  public async deleteApplication(id: number): Promise<Boolean> {
    const updateResult: any = await this.repository.delete({id});
    return updateResult.affected !== undefined && updateResult.affected > 0;
  }

  public async updateApplicationInfo(applicationRequest: ApplicationEntity): Promise<ApplicationEntity> {
    const updateResult = await this.repository.update(
      { id: applicationRequest.id },
      applicationRequest
    );
    return applicationRequest;
  }

}
