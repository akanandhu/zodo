import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsBoolean,
  IsUUID,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsEnum(["superAdmin", "client", "user", "staff"])
  user_type?: "superAdmin" | "client" | "user" | "staff";

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsString()
  role: "hsAdmin" | "doctor" ;

  @IsUUID()
  hospital_id: string;
}
