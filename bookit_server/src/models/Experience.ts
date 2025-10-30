import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Experience extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public location!: string;
  public price!: number;
  public imageUrl!: string;
  public availableSlots!: number;
}

Experience.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availableSlots: {
      type: DataTypes.JSON, // ✅ use JSON instead of INTEGER
      allowNull: false,
      defaultValue: [], // ✅ default empty array
    },
  },
  {
    sequelize,
    modelName: "Experience",
    tableName: "experiences",
    timestamps: true,
  }
);

export default Experience;
