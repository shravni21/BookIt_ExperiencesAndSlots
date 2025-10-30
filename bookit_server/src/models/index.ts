import sequelize from "../config/db";
import Booking from "./Booking";
import Experience from "./Experience";
import Promo from "./Promo";

// Define associations

// Experience → Booking
Experience.hasMany(Booking, { foreignKey: "experienceId" });
Booking.belongsTo(Experience, { foreignKey: "experienceId" });

// Promo → Booking
Promo.hasMany(Booking, { foreignKey: "promoCode", sourceKey: "code" });
Booking.belongsTo(Promo, { foreignKey: "promoCode", targetKey: "code" });

export { sequelize, Booking, Experience, Promo };
