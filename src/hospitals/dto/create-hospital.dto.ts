import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";

export class HospitalAddress {
  @IsString()
  lineOne: string;

  @IsString()
  lineTwo: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  state: string;

  @IsString()
  pincode: string;
}

export class Admin {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class Rating {
  @IsUUID()
  userID: string;

  @IsString()
  rating: number;

  @IsString()
  submittedOn: Date;
}

export class Feedback {
  @IsUUID()
  userID: string;

  @IsString()
  remark: string;

  @IsString()
  submittedOn: Date;
}

export class FastTag {
  @IsBoolean()
  enabled: boolean;

  @IsNumber()
  count: number;

  @IsNumber()
  price: number;
}

export class CreateHospitalDto {
  @IsString()
  name: string;

  @IsString()
  logo: string;

  @IsString()
  location: string;

  @IsObject()
  @ValidateNested()
  @Type(() => HospitalAddress)
  address: HospitalAddress;

  @IsObject()
  @ValidateNested()
  @Type(() => HospitalAddress)
  billing_address: HospitalAddress;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Admin)
  admin: Admin;

  @IsOptional()
  @IsString()
  gst: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Rating)
  ratings?: Rating[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Feedback)
  feedbacks?: Feedback[];

  @IsOptional()
  @IsUUID()
  parent_id?: string;

  @IsObject()
  @IsOptional()
  documents?: Record<string, string>;

  @IsObject()
  @ValidateNested()
  @Type(() => FastTag)
  fastTag?: { enabled: boolean; count: number; price: number };

  @IsArray()
  @IsOptional()
  departments?: string[];

  @IsString()
  @IsOptional()
  @IsIn(["active", "pending", "rejected"])
  current: "active" | "pending" | "rejected";

  @IsBoolean()
  @IsOptional()
  isDisabled: boolean;

  @IsBoolean()
  @IsOptional()
  isDeactivated: boolean;
}
