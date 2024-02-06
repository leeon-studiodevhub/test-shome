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
import { AdminService } from "./admin.service";
import { AdminCreateRequest } from "./dto/admin-request.dto";
import { AuthenticatedRequest } from "authenticated.request";
import { IsRequiredPipe } from "../util/pipe/is-required.pipe";
import { AdminResponse } from "./dto/admin-response.dto";
import { AdminUpdateRequest } from "./dto/admin-update-request.dto";
import { AdminsResponse } from "./dto/admins-response.dto";
import { AdminUpdateResponse } from "./dto/admin-update-response";
import { start } from "repl";

@Injectable()
@Controller("admin")
@ApiTags("Admins")
@ApiBearerAuth()
export class AdminController {
  public constructor(private service: AdminService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: AdminCreateRequest })
  @ApiCreatedResponse({ type: AdminResponse })
  public async createAdmin( @Request() request: AuthenticatedRequest, 
                          @Body() requestBody: AdminCreateRequest): Promise<AdminResponse> {
    return await this.service.createCustomer(requestBody);
  }

  @Get()
  @ApiOkResponse({ type: AdminsResponse })
  public async getAdmins(
    @Request() request: AuthenticatedRequest,
    @Query('start') start: number,
    @Query('limit') limit: number
  ): Promise<AdminResponse[]> {
    return await this.service.getAdmins(start, limit);
  }

  @Put()
  @ApiBody({ type: AdminUpdateRequest })
  @ApiOkResponse({ type: AdminsResponse })
  public async updateAdmin(
    @Request() request: AuthenticatedRequest,
    @Query('id') id: number,
    @Body() requestBody: AdminUpdateRequest
  ): Promise<AdminUpdateResponse> {
    const updated = await this.service.updateAdmin(requestBody, id);
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
  public async deleteAdmin(
    @Request() request: AuthenticatedRequest,
    @Param("id", IsRequiredPipe) id: number
  ): Promise<Boolean> {
    return await this.service.deleteAdmin(id);
  }
}