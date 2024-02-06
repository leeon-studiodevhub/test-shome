import { IsEmail, IsString, MaxLength, MinLength} from "class-validator";
import { AdminEntity } from "../repository/admin.entity";

export class AdminCreateRequest {
  @IsString()
  @MaxLength(100)
  public name: string;

  @IsEmail()
  @MaxLength(100)
  public email: string;

  @IsString()
  @MaxLength(20)
  public phone: string;

  @IsString()
  @MaxLength(100)
  public password: string;

  public static toEntity(request:AdminCreateRequest): AdminEntity {
    const entity = new AdminEntity();
    entity.name = request.name;
    entity.email = request.email;
    entity.password = request.password;
    entity.status = true;
    entity.createdAt= new Date();
    entity.updatedAt = new Date();
    return entity;
  }
}
