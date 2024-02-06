import { IsEmail, IsString, MaxLength, MinLength} from "class-validator";
import { CustomerEntity } from "../repository/customer.entity";

export class CustomerCreateRequest {
  @IsString()
  @MaxLength(100)
  public companyName: string;

  @IsEmail()
  @MaxLength(100)
  public companyEmail: string;

  @IsString()
  @MaxLength(20)
  public companyPhone: string;

  @IsString()
  @MaxLength(100)
  public companyDomain: string;

  @IsString()
  @MaxLength(100)
  public password: string;

  @IsString()
  public userId: string;

  public static toEntity(request:CustomerCreateRequest): CustomerEntity {
    const entity = new CustomerEntity();
    entity.companyName = request.companyName;
    entity.companyEmail = request.companyEmail;
    entity.companyDomain = request.companyDomain;
    entity.companyPhone = request.companyPhone;
    entity.password = request.password;
    entity.userId = request.userId;
    entity.status = true;
    entity.createdAt= new Date();
    entity.updatedAt = new Date();
    return entity;
  }
}
