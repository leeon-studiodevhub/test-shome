import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DataCreateRequest } from "../dto/data-request.dto";
import { DataResponse } from "../dto/data-response.dto";
import { DataEntity } from "./data.entity";
import { ApplicationEntity } from "../../application/repository/application.entity";

@Injectable()
export class DataDatabase {
  public constructor(
    @InjectRepository(DataEntity)
    private readonly repository: Repository<DataEntity>
  ) {}

  public async getDataById(id: number): Promise<DataEntity> {
    return await this.repository.findOneByOrFail({id});
  }

  public async getDatasetByApplicationId(applicationId: number, start: number, limit: number): Promise<DataEntity[]> {
    
    return await this.repository.find({
      where: {
        //join appid    
      },
      order: {
        createdAt: "DESC",
      },
      skip: start,
      take: limit
    });
  }

  public async createData(dataRequest: DataEntity, applicationEntity: ApplicationEntity): Promise<DataEntity> {
    const insertThreadResult = await this.repository.insert(dataRequest);
    dataRequest.id = insertThreadResult.identifiers[0].id;
    return dataRequest;
  }

  public async deleteData(id: number): Promise<Boolean> {
    const updateResult: any = await this.repository.delete({
      id: id
    });
    return updateResult.affected !== undefined && updateResult.affected > 0;
  }

  public async updateData(dataRequest: DataEntity): Promise<DataEntity> {
    const updateResult = await this.repository.update(
      { id: dataRequest.id },
      dataRequest
    );
    return dataRequest;
  }

}
