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

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    private readonly userService: UsersService
  ) {}

  async create(createHospitalDto: CreateHospitalDto) {
    try {
      const createUserDto: CreateUserDto = {
        first_name: createHospitalDto.admin.name,
        last_name: "",
        user_type: "hsAdmin",
        email: createHospitalDto.admin.email,
        password: "Password",
        is_active: true,
      };
      const adminUser = await this.userService.create(createUserDto);

      const hospital = this.hospitalRepository.create({
        ...createHospitalDto,
        admins: [
          {
            name: adminUser.first_name,
            email: adminUser.email,
            password: adminUser.password,
            role: "hsAdmin",
          },
        ],
      });

      await this.hospitalRepository.save(hospital);
      return {
        statusCode: HttpStatus.CREATED,
        message: "Hospital created successfully",
        data: hospital
      };
    } catch (err) {
      throw new InternalServerErrorException("Failed to create hospital");
    }
  }

  findAll(): Promise<Hospital[]> {
    return this.hospitalRepository.find();
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
    await this.hospitalRepository.update(id, updateHospitalDto);
    const updatedHospital = await this.hospitalRepository.findOne({
      where: { id },
    });
    if (!updatedHospital) {
      throw new NotFoundException(`Hospital with ID ${id} not found`);
    }
    return updatedHospital;
  }

  async remove(id: string) {
    const result = await this.hospitalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Hospital with ID ${id} not found`);
    }
  }
}
