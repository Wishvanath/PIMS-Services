import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';

// create interface for Meddicine table column
export interface MedicineAttributes {
  medicineId: number;
  medicineName: string;
  medicineType: string;
  medicineDescp: string;
  medicinePrice: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MedicineCreationAttributes
  extends Optional<MedicineAttributes, 'medicineId'> {}

export const Medicine: ModelDefined<
  MedicineAttributes,
  MedicineCreationAttributes
> = sequelize.define(
  'Medicine',
  {
    medicineId: {
      field: 'MedicineId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medicineName: {
      field: 'MedicineName',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    medicineType: {
      field: 'MedicineType',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    medicineDescp: {
      field: 'MedicineDescp',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    medicinePrice: {
      field: 'MedicinePrice',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'Medicine',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['MedicineId'],
      },
    ],
  }
);
