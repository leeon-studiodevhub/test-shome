import { ApplicationEntity } from "../../application/repository/application.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "data" })
export class DataEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "content" })
  public content: string;

  @Column({ name: "status", default: true })
  public status: Boolean;

  @Column({ type: "timestamp", name: "createdAt" })
  public createdAt: Date;

  @Column({ type: "timestamp", name: "updatedAt" })
  public updatedAt: Date;

  @ManyToOne(() => ApplicationEntity, (application) => application.dataSet, {onDelete: "CASCADE"})
  public application: ApplicationEntity;
}
