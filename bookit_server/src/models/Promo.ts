import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Promo extends Model {
  public id!: number;
  public code!: string;
  public discountPercentage!: number;
  public expiryDate!: Date;
  public minimumAmount!: number;
}

Promo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    discountPercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    minimumAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Promo",
    tableName: "promos",
    timestamps: true,
  }
);

export default Promo;
