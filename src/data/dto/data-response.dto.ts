import { DataEntity } from "../repository/data.entity";
import { DataUpdateRequest } from "./data-update-request.dto";

export class DataResponse {
  public id: number;
  public content: string;
  public status: Boolean;

  public static fromEntity(entity: DataResponse): DataResponse {
    const response = new DataResponse();
    response.id = entity.id;
    response.content = entity.content;
    response.status = entity.status;
    return response;
  }
}
