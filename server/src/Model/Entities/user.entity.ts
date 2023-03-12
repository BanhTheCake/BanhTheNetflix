import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Reviews } from './review.entity';

@Table({
  tableName: 'users',
  freezeTableName: true,
})
export class Users extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  userId: string;

  @HasMany(() => Reviews, {
    foreignKey: 'userId',
    sourceKey: 'userId',
    onDelete: 'CASCADE',
  })
  reviews: Reviews[];

  @Column
  username: string;

  @Column
  displayName: string;

  @Column
  password: string;
}
