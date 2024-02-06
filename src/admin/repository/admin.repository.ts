import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminCreateRequest } from "../dto/admin-request.dto";
import { AdminResponse } from "../dto/admin-response.dto";
import { AdminEntity } from "./admin.entity";
@Injectable()
export class AdminDatabase {
  public constructor(
    @InjectRepository(AdminEntity)
    private readonly repository: Repository<AdminEntity>
  ) {}

  public async getAdminById(id: number): Promise<AdminEntity[]> {
    return await this.repository.find({
      where: [
        {
          id: id,
        },
      ],
      order: {
        id: "DESC",
      },
    });
  }

  public async getAdmins(start: number, limit: number): Promise<AdminEntity[]> {
    return await this.repository.find({
      order: {
        createdAt: "DESC",
      },
      skip: start,
      take: limit
    });
  }

  public async createAdmin(adminRequest: AdminEntity): Promise<AdminEntity> {
    const insertThreadResult = await this.repository.insert(adminRequest);
    adminRequest.id = insertThreadResult.identifiers[0].id;
    return adminRequest;
  }

  public async deleteAdmin(id: number): Promise<Boolean> {
    const updateResult: any = await this.repository.delete({
      id: id
    });
    return updateResult.affected !== undefined && updateResult.affected > 0;
  }

  public async updateAdmin(adminRequest: AdminEntity): Promise<AdminEntity> {
    const updateResult = await this.repository.update(
      { id: adminRequest.id },
      adminRequest
    );
    return adminRequest;
  }

}
