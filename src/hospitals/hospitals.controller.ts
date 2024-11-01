import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HospitalsService } from "./hospitals.service";
import { CreateHospitalDto } from "./dto/create-hospital.dto";
import { UpdateHospitalDto } from "./dto/update-hospital.dto";
import { Paginate, PaginateQuery } from "nestjs-paginate";

@Controller("hospitals")
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Post()
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalsService.create(createHospitalDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.hospitalsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.hospitalsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateHospitalDto: UpdateHospitalDto
  ) {
    return this.hospitalsService.update(id, updateHospitalDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.hospitalsService.remove(id);
  }
}
