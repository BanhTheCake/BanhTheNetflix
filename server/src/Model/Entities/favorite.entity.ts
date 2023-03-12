import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'favorites',
  freezeTableName: true,
})
export class Favorites extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column
  userId: string;

  @Column({ values: ['tv', 'movie'] })
  mediaType: 'tv' | 'movie';

  @Column
  mediaId: number;

  @Column
  mediaTitle: string;

  @Column
  mediaPoster: string;

  @Column
  mediaRate: number;
}
