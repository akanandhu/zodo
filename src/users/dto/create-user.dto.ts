import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsBoolean,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsEnum(["superAdmin", "client", "user", "staff", "hsAdmin"])
  user_type?: "superAdmin" | "client" | "user" | "staff" | "hsAdmin";

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
}
