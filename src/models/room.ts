import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';

// create interface Room table column
export interface RoomAttributes {
  id: number;
  roomType: string;
  noOfBed: number;
  status: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> {}

export const Room: ModelDefined<RoomAttributes, RoomCreationAttributes> =
  sequelize.define(
    'Room',
    {
      id: {
        field: 'Id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roomType: {
        field: 'RoomType',
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      noOfBed: {
        field: 'NoOfBed',
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        field: 'Status',
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'Room',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['Id'],
        },
      ],
    }
  );
