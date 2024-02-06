import { IsEmail, IsString, MaxLength, MinLength} from "class-validator";
import { ApplicationEntity } from "../repository/application.entity";
import { ApplicationService } from "../application.service";

export class ApplicationCreateRequest {
  @IsString()
  @MaxLength(100)
  public title: string;

  @IsEmail()
  public description: string;

  @IsString()
  public schema: string;

  @IsString()
  @MaxLength(50)
  public type: string;

  constructor(private readonly applicationService: ApplicationService) {}

  public static toEntity(request:ApplicationCreateRequest): ApplicationEntity {
    const entity = new ApplicationEntity();
    entity.title = request.title;
    entity.description = request.description;
    entity.schema = request.schema;
    entity.type = request.type;
    entity.status = true;
    entity.createdAt= new Date();
    entity.updatedAt = new Date();
    return entity;
  }
}
