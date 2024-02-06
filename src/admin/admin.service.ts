import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { AdminResponse } from "./dto/admin-response.dto";
import { AdminCreateRequest } from "./dto/admin-request.dto";
import { AdminDatabase } from "./repository/admin.repository";
import { AdminUpdateRequest } from "./dto/admin-update-request.dto";
import { AdminsResponse } from "./dto/admins-response.dto";

@Injectable()
export class AdminService {
  public constructor(private readonly db: AdminDatabase) {}

  public async getAdminById(id: number): Promise<AdminsResponse> {
    const entities = await this.db.getAdminById(id);
    return {
      customers: entities,
    };
  }

  public async getAdmins(start: number, limit: number): Promise<AdminResponse[]> {
    const entities = await this.db.getAdmins(start, limit);
    return entities;
  }

  public async createCustomer(adminCreateRequest: AdminCreateRequest): Promise<AdminResponse> {
    const toEntity = AdminCreateRequest.toEntity(
      adminCreateRequest
    );
    const createdEntity = await this.db.createAdmin(toEntity);
    if (!createdEntity)
      throw new InternalServerErrorException("Failed to create the record");
    return createdEntity;
    
  }

  public async updateAdmin(
    adminUpdateRequest: AdminUpdateRequest,
    customerId: number
  ): Promise<AdminResponse> {
    const entity = AdminUpdateRequest.toEntity(
      adminUpdateRequest
    );
    const createdEntity = await this.db.updateAdmin(entity);
    if (!createdEntity)
      throw new InternalServerErrorException("Failed to create the record");
    return createdEntity;
  }


  public async deleteAdmin(id: number): Promise<Boolean> {
    return await this.db.deleteAdmin(id);
  }
}
