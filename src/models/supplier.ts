import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';

// create interface for Meddicine table column
export interface SupplierAttributes {
  supplierId: number;
  supplierName: string;
  phone: number;
  email: string;
  address: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SupplierCreationAttributes
  extends Optional<SupplierAttributes, 'supplierId'> {}

export const Supplier: ModelDefined<
  SupplierAttributes,
  SupplierCreationAttributes
> = sequelize.define(
  'Supplier',
  {
    supplierId: {
      field: 'SupplierId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    supplierName: {
      field: 'SupplierName',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      field: 'Phone',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      field: 'Email',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      field: 'Address',
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: 'Supplier',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['SupplierId'],
      },
    ],
  }
);
