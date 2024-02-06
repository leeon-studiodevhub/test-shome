import { DataEntity } from "../../data/repository/data.entity";
import { CustomerEntity } from "../../customer/repository/customer.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "application" })
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "title", unique: true })
  public title: string;

  @Column({ name: "description", nullable: true })
  public description: string;

  @Column({ name: "schema" })
  public schema: string;

  @Column({ name: "type" })
  public type: string;

  @Column({ name: "appID", unique: true })
  public appID: string;

  @Column({ name: "apiKey", unique: true })
  public apiKey: string;

  @Column({ name: "status", default: true })
  public status: Boolean;

  @Column({ type: "timestamp", name: "createdAt" })
  public createdAt: Date;

  @Column({ type: "timestamp", name: "updatedAt" })
  public updatedAt: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.applications, {onDelete: "CASCADE"})
  public customer: CustomerEntity;

  @OneToMany(() => DataEntity, (dataSet) => dataSet.application, {cascade: true})
  public dataSet: DataEntity[];
}
