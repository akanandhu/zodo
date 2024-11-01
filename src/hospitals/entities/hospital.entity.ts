import { HospitalAddress } from "src/types/hospital.type";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "hospitals" })
export class Hospital {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  logo: string;

  @Column({ nullable: false })
  location: string;

  @Column("simple-json", { nullable: false })
  address: HospitalAddress;

  @Column("simple-json", { nullable: false })
  billing_address: HospitalAddress;

  @Column("simple-json", { nullable: true })
  admins: { name: string; role: string; email: string; password: string }[];

  @Column({ nullable: false })
  gst: string;

  @Column({ nullable: true })
  website: string;

  @Column("simple-json", { nullable: true })
  ratings: { userID: string; rating: number; submittedOn: Date }[];

  @Column("simple-json", { nullable: true })
  feedbacks: { userID: string; remark: string; submittedOn: Date }[];

  @Column({ type: "uuid", nullable: true })
  parent_id: string | null;

  @Column("simple-json", { nullable: true })
  documents: Record<string, string>;

  @Column("simple-json", { nullable: true })
  fastTag: { enabled: boolean; count: number; price: number };

  @Column("simple-json", { nullable: true })
  departments: string[];

  @Column({ nullable: false, default: "pending" })
  current: "active" | "pending" | "rejected";

  @Column({ type: "boolean", default: false })
  isDisabled: boolean;

  @Column({ type: "boolean", default: false })
  isDeactivated: boolean;
}
