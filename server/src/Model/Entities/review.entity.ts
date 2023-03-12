import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './user.entity';

@Table({
  tableName: 'reviews',
  freezeTableName: true,
})
export class Reviews extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column
  userId: string;

  @BelongsTo(() => Users, {
    foreignKey: 'userId',
    targetKey: 'userId',
  })
  user: Users;

  @Column({ values: ['tv', 'movie'] })
  mediaType: 'tv' | 'movie';

  @Column
  mediaId: number;

  @Column
  mediaTitle: string;

  @Column
  mediaPoster: string;

  @Column({
    type: DataType.TEXT('medium'),
  })
  content: string;
}
