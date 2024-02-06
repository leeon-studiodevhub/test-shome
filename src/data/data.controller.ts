import {
  Body,
  Controller,
  Injectable,
  Post,
  Request,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Put,
  InternalServerErrorException,
  Get,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { DataService } from "./data.service";
import { DataCreateRequest } from "./dto/data-request.dto";
import { AuthenticatedRequest } from "authenticated.request";
import { IsRequiredPipe } from "../util/pipe/is-required.pipe";
import { DataResponse } from "./dto/data-response.dto";
import { DataUpdateRequest } from "./dto/data-update-request.dto";
import { DatasetResponse } from "./dto/dataset-response.dto";
import { DataUpdateResponse } from "./dto/data-update-response";
import { start } from "repl";
import { CustomerService } from "../customer/customer.service";

@Injectable()
@Controller("data")
@ApiTags("Data")
@ApiBearerAuth()
export class DataController {
  public constructor(private service: DataService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: DataCreateRequest })
  @ApiCreatedResponse({ type: DataResponse })
  public async createData( @Request() request: AuthenticatedRequest, 
                          @Body() requestBody: DataCreateRequest,
                          //@Param('appId') appId: number
                          @Query('appId') appId: number
                          ): Promise<DataResponse> {
    return await this.service.createData(appId, requestBody);
  }

  @Get()
  @ApiOkResponse({ type: DatasetResponse })
  public async getDataSet(
    @Request() request: AuthenticatedRequest,
    @Query('start') start: number,
    @Query('limit') limit: number,
    @Query('appId') appId: number
  ): Promise<DataResponse[]> {
    return await this.service.getDataByApplicationId(appId, start, limit);
  }

  @Get(":id")
  @ApiOkResponse({ type: DataResponse })
  public async getData(
    @Request() request: AuthenticatedRequest,
    @Param('id') id: number
  ): Promise<DataResponse> {
    return await this.service.getDataById(id);
  }

  @Put()
  @ApiBody({ type: DataUpdateRequest })
  @ApiOkResponse({ type: DataResponse })
  public async updateData(
    @Request() request: AuthenticatedRequest,
    @Query('id') id: number,
    @Body() requestBody: DataUpdateRequest
  ): Promise<DataUpdateResponse> {
    const updated = await this.service.updateData(requestBody, id);
    if (!updated) {
      throw new InternalServerErrorException(
        "Failed to delete contact relationship data."
      );
    }
    return updated;
  }
  @Delete(":id")
  @ApiOkResponse({ type: Boolean })
  @ApiOperation({ operationId: "deletetag" })
  public async deleteData(
    @Request() request: AuthenticatedRequest,
    @Param("id", IsRequiredPipe) id: number
  ): Promise<Boolean> {
    return await this.service.deleteData(id);
  }
}