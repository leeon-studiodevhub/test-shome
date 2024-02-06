import { ApplicationEntity } from "../repository/application.entity";
import { ApplicationUpdateRequest } from "./application-update-request.dto";

export class ApplicationResponse {
  public id: number;
  public title: string;
  public description: string;
  public schema: string;
  public type: string;
  public appID: string;
  public apiKey: string;
  public status: Boolean;

  public static fromEntity(entity: ApplicationResponse): ApplicationResponse {
    const response = new ApplicationResponse();
    response.id = entity.id;
    response.title = entity.title;
    response.description = entity.description;
    response.schema = entity.schema;
    response.type = entity.type;
    response.appID = entity.appID;
    response.apiKey = entity.apiKey;
    response.status = entity.status;
    return response;
  }
}
