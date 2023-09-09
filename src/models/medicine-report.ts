import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';
import { Supplier } from './supplier';
import { Medicine } from './medicine';

// create interface for MedicineReport table column
export interface MedicineReportAttributes {
  id: number;
  company: string;
  quantity: number;
  box: number;
  productionDate: Date;
  expiryDate: Date;
  country: string;
  supplierId: number;
  medicineId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MedicineReportCreationAttributes
  extends Optional<MedicineReportAttributes, 'id'> {}

export const MedicineReport: ModelDefined<
  MedicineReportAttributes,
  MedicineReportCreationAttributes
> = sequelize.define(
  'MedicineReport',
  {
    id: {
      field: 'Id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    company: {
      field: 'Company',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    quantity: {
      field: 'Quantity',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    box: {
      field: 'Box',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productionDate: {
      field: 'ProductionDate',
      type: DataTypes.DATE(6),
      allowNull: true,
    },
    expiryDate: {
      field: 'ExpiryDate',
      type: DataTypes.DATE(6),
      allowNull: true,
    },
    country: {
      field: 'Country',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    supplierId: {
      field: 'SupplierId',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medicineId: {
      field: 'MedicineId',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'MedicineReport',
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ['Id'],
      },
    ],
  }
);

// create association
Supplier.hasMany(MedicineReport, {
  foreignKey: 'Supplier_supplierId_FK',
  sourceKey: 'supplierId',
});
MedicineReport.belongsTo(Supplier, {
  as: 'supplier',
  foreignKey: 'Supplier_supplierId_FK',
  targetKey: 'supplierId',
});

Medicine.hasMany(MedicineReport, {
  foreignKey: 'Medicine_medicineId_FK',
  sourceKey: 'medicineId',
});
MedicineReport.belongsTo(Medicine, {
  as: 'medicine',
  foreignKey: 'Medicine_medicineId_FK',
  targetKey: 'medicineId',
});
