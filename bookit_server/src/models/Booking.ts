import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";  // ✅ correct import
import Experience from "./Experience";
import Promo from "./Promo";

class Booking extends Model { 
  public id!: number;
  public experienceId!: number;
  public userName!: string;
  public userEmail!: string;
  public bookingDate!: Date;
  public totalAmount!: number;
  public finalAmount!: number;
  public promoCode?: string;
  public status!: "CONFIRMED" | "FAILED";
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    experienceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "experiences",
        key: "id",
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    finalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    promoCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("CONFIRMED", "FAILED"),
      allowNull: false,
      defaultValue: "CONFIRMED",
    },
  },
  {
    sequelize,
    modelName: "Booking",
    tableName: "bookings",
    timestamps: true,
  }
);

// // 🔗 Associations
// Experience.hasMany(Booking, { foreignKey: "experienceId" });
// Booking.belongsTo(Experience, { foreignKey: "experienceId" });

export default Booking;
