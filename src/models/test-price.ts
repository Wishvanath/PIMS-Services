import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';

// create interface for TestPrice table column
export interface TestPriceAttributes {
  testId: number;
  testPrice: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TestPriceCreationAttributes
  extends Optional<TestPriceAttributes, 'testId'> {}

export const TestPrice: ModelDefined<
  TestPriceAttributes,
  TestPriceCreationAttributes
> = sequelize.define(
  'TestPrice',
  {
    testId: {
      field: 'TestId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    testPrice: {
      field: 'TestPrice',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'TestPrice',
    timestamps: false,
  }
);
