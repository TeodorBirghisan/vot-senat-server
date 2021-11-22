import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

interface IUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
}

interface IUserCreationAttributes {
  email: string;
  password: string;
}

@Table
export class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  // timestamps!
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  role: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  phoneNumber: string;
}
