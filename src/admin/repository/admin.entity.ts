import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "admin" })
export class AdminEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name" })
  public name: string;

  @Column({ name: "email", unique: true })
  public email: string;

  @Column({ name: "phone", nullable: true })
  public phone: string;

  @Column({ name: "password" })
  public password: string;

  @Column({ name: "status", default: true })
  public status: Boolean;

  @Column({ type: "timestamp", name: "createdAt" })
  public createdAt: Date;

  @Column({ type: "timestamp", name: "updatedAt" })
  public updatedAt: Date;
}
