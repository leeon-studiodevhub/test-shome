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
import { CustomerService } from "./customer.service";
import { CustomerCreateRequest } from "./dto/customer-request.dto";
import { AuthenticatedRequest } from "authenticated.request";
import { IsRequiredPipe } from "../util/pipe/is-required.pipe";
import { CustomerResponse } from "./dto/customer-response.dto";
import { CustomerUpdateRequest } from "./dto/customer-update-request.dto";
import { CustomersResponse } from "./dto/customers-response.dto";
import { CustomerUpdateResponse } from "./dto/customer-update-response";

@Injectable()
@Controller("customer")
@ApiTags("Customers")
@ApiBearerAuth()
export class CustomerController {
  public constructor(private service: CustomerService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CustomerCreateRequest })
  @ApiCreatedResponse({ type: CustomerResponse })
  public async createCustomer(@Body() requestBody: CustomerCreateRequest): Promise<CustomerResponse> {
    //check admin/system role
    //const userId = request.raw.user.userId;
    return await this.service.createCustomer(requestBody);
  }

  @Get()
  @ApiOkResponse({ type: CustomersResponse })
  public async getCustomers(
    @Request() request: AuthenticatedRequest,
    @Query('start') start: number,
    @Query('limit') limit: number
  ): Promise<CustomerResponse[]> {
    return await this.service.getCustomers(start, limit);
  }

  @Get(":id")
  @ApiOkResponse({ type: CustomerResponse })
  public async getCustomerById(
    @Request() request: AuthenticatedRequest,
    @Param("id", IsRequiredPipe) id: number
  ): Promise<CustomerResponse> {
    return await this.service.getCustomerById(id);
  }

  @Put()
  @ApiBody({ type: CustomerUpdateRequest })
  @ApiOkResponse({ type: CustomerResponse })
  public async updateCustomer(
    @Request() request: AuthenticatedRequest,
    @Body() requestBody: CustomerUpdateRequest
  ): Promise<CustomerUpdateResponse> {
    const id = requestBody.id;
    const updated = await this.service.updateCustomerInfo(requestBody, id);
    if (!updated) {
      throw new InternalServerErrorException(
        "Failed to delete contact relationship data."
      );
    }
    return updated;
  }
  @Delete(":id")
  @ApiOkResponse({ type: Boolean })
  @ApiOperation({ operationId: "deleteCustomer" })
  public async deleteCustomer(
    @Request() request: AuthenticatedRequest,
    @Param("id", IsRequiredPipe) id: number
  ): Promise<Boolean> {
    return await this.service.deleteCustomer(id);
  }

}