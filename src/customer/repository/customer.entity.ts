import { ApplicationEntity } from "../../application/repository/application.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "customer" })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "companyName", unique: true })
  public companyName: string;

  @Column({ name: "companyEmail", unique: true })
  public companyEmail: string;

  @Column({ name: "companyPhone", nullable: true })
  public companyPhone: string;

  @Column({ name: "companyDomain" })
  public companyDomain: string;

  @Column({ name: "password" })
  public password: string;

  @Column({ name: "status", default: true })
  public status: Boolean;

  @Column({ name: "count", default: 0 })
  public count?: number;

  @Column({ name: "userId" })
  public userId: string;
  
  @Column({ type: "timestamp", name: "createdAt" })
  public createdAt: Date;

  @Column({ type: "timestamp", name: "updatedAt" })
  public updatedAt: Date;

  @OneToMany(() => ApplicationEntity, (applications) => applications.customer, {cascade: true})
  public applications: ApplicationEntity[];
}
