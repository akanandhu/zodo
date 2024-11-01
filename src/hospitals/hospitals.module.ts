import { Module } from "@nestjs/common";
import { HospitalsService } from "./hospitals.service";
import { HospitalsController } from "./hospitals.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hospital } from "./entities/hospital.entity";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Hospital]), UsersModule],
  controllers: [HospitalsController],
  providers: [HospitalsService],
  exports: [HospitalsService],
})
export class HospitalsModule {}
