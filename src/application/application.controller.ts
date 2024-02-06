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
import { ApplicationService } from "./application.service";
import { ApplicationCreateRequest } from "./dto/application-request.dto";
import { AuthenticatedRequest } from "authenticated.request";
import { IsRequiredPipe } from "../util/pipe/is-required.pipe";
import { ApplicationResponse } from "./dto/application-response.dto";
import { ApplicationUpdateRequest } from "./dto/application-update-request.dto";
import { ApplicationsResponse } from "./dto/applications-response.dto";
import { ApplicationUpdateResponse } from "./dto/application-update-response";
import { start } from "repl";
import path from "path";

@Injectable()
@Controller("application")
@ApiTags("Applications")
@ApiBearerAuth()
export class ApplicationController {
  public constructor(private service: ApplicationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: ApplicationCreateRequest })
  @ApiCreatedResponse({ type: ApplicationResponse })
  public async createApplication( @Request() request: AuthenticatedRequest, 
                          @Body() requestBody: ApplicationCreateRequest,
                          //@Param('customerId') customerId: number
                          @Query('customerId') customerId: number): Promise<ApplicationResponse> {
    const userId = request.raw.user.userId;
    return await this.service.createApplication(customerId, userId, requestBody);
  }

  @Get()
  @ApiOkResponse({ type: ApplicationsResponse })
  public async getApplications(
    @Request() request: AuthenticatedRequest,
    @Query('start') start: number,
    @Query('limit') limit: number,
    @Query('customerId') customerId: number
    //@Param('customerId') customerId: number
  ): Promise<ApplicationResponse[]> {
    const userId = request.raw.user.userId;
    return await this.service.getApplications(customerId, userId, start, limit);
  }

  @Get(":appId")
  @ApiOkResponse({ type: ApplicationResponse })
  public async getApplicationById(
    @Request() request: AuthenticatedRequest,
    @Param('appId') appId: number
  ): Promise<ApplicationResponse> {
    return await this.service.getApplicationById(appId);
  }

  @Put()
  @ApiBody({ type: ApplicationUpdateRequest })
  @ApiOkResponse({ type: ApplicationResponse })
  public async updateApplication(
    @Request() request: AuthenticatedRequest,
    @Body() requestBody: ApplicationUpdateRequest,
  ): Promise<ApplicationUpdateResponse> {
    const appId = requestBody.id;
    const updated = await this.service.updateApplication(requestBody, appId);
    if (!updated) {
      throw new InternalServerErrorException(
        "Failed to delete contact relationship data."
      );
    }
    return updated;
  }
  @Delete(":appId")
  @ApiOkResponse({ type: Boolean })
  @ApiOperation({ operationId: "deleteApp" })
  public async deleteApplication(
    @Request() request: AuthenticatedRequest,
    @Param("appId", IsRequiredPipe) appId: number
  ): Promise<Boolean> {
    return await this.service.deleteApplication(appId);
  }
}