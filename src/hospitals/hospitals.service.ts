import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateHospitalDto } from "./dto/create-hospital.dto";
import { UpdateHospitalDto } from "./dto/update-hospital.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Hospital } from "./entities/hospital.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { paginate, PaginateQuery } from "nestjs-paginate";

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    private readonly userService: UsersService
  ) {}

  async create(createHospitalDto: CreateHospitalDto) {
    try {
      const { admin, ...rest } = createHospitalDto;
      const hospital = this.hospitalRepository.create(rest);
      const createdUserRole = 'hsAdmin'
      const createUserDto: CreateUserDto = {
        first_name: createHospitalDto.admin.name,
        last_name: "",
        user_type: "staff",
        email: createHospitalDto.admin.email,
        password: "Password",
        is_active: true,
        hospital_id: hospital.id,
        role: createdUserRole,
      };
      const user = await this.userService.create(createUserDto);

      await this.userService.addRoleToUser(user, createdUserRole);

      await this.hospitalRepository.save(hospital);
      return {
        statusCode: HttpStatus.CREATED,
        message: "Hospital created successfully",
        data: hospital,
      };
    } catch (err) {
      console.log(err, 'errorCheck')
      throw new InternalServerErrorException("Failed to create hospital");
    }
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.hospitalRepository, {
      sortableColumns: ["id"],
      maxLimit: 20,
    });
  }

  async findOne(id: string): Promise<Hospital> {
    const hospital = await this.hospitalRepository.findOne({ where: { id } });
    if (!hospital) {
      throw new NotFoundException(`Hospital with ID ${id} not found.`);
    }
    return hospital;
  }

  async update(
    id: string,
    updateHospitalDto: UpdateHospitalDto
  ): Promise<Hospital> {
    try {
      const hospital = await this.hospitalRepository.findOne({
        where: { id },
      });
      if (!hospital) {
        throw new NotFoundException(`Hospital with ID ${id} not found`);
      }

      if (updateHospitalDto.admin) {
        hospital.admins = [...(hospital.admins || []), updateHospitalDto.admin];
      }

      Object.assign(hospital, updateHospitalDto);
      return this.hospitalRepository.save(hospital);
    } catch (err) {
      console.log(err, "errorCheck");
    }
  }

  async remove(id: string) {
    const result = await this.hospitalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Hospital with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: "Hospital deleted successfully",
    };
  }
}
