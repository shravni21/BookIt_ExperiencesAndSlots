import sequelize from "./config/db";
import Experience from "./models/Experience";
import Promo from "./models/Promo";
import Booking from "./models/Booking";

const seedDatabase = async () => {
    try {
        console.log("🌱 Starting database seeding...");

        // Drop & recreate all tables
        await sequelize.sync({ force: true });
        console.log("✅ Database synced (all tables recreated).");

        // --- Experiences ---
        const experiences = await Experience.bulkCreate([
            {
                title: "Sunset Trek at Sinhagad",
                description: "A scenic trek with panoramic views of Pune at sunset.",
                location: "Sinhagad Fort, Pune",
                price: 499,
                imageUrl: "https://plus.unsplash.com/premium_photo-1694475518874-bd12a29e3332?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1966",
                availableSlots: ["2025-11-01 17:00", "2025-11-02 18:00"],
            },
            {
                title: "River Rafting Adventure",
                description: "A thrilling river rafting experience in Kolad.",
                location: "Kolad, Maharashtra",
                price: 1299,
                imageUrl: "https://images.unsplash.com/photo-1658355691173-88dbb2dce6f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2081",
                availableSlots: ["2025-11-03 10:00", "2025-11-04 14:00"],
            },
            {
                title: "Camping under the Stars",
                description: "Relax by the lake, enjoy bonfire and stargazing.",
                location: "Pawna Lake, Pune",
                price: 999,
                imageUrl: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
                availableSlots: ["2025-11-05 18:00", "2025-11-06 18:00"],
            },
        ]);

        console.log(`Inserted ${experiences.length} experiences.`);

        // --- Promo Codes ---
        const promos = await Promo.bulkCreate([
            {
                code: "WELCOME10",
                discountPercentage: 10,
                expiryDate: "2025-12-31",
            },
            {
                code: "FESTIVE20",
                discountPercentage: 20,
                expiryDate: "2025-11-30",
            },
            {
                code: "SUPER50",
                discountPercentage: 50,
                expiryDate: "2025-12-15",
            },
        ]);

        console.log(`Inserted ${promos.length} promo codes.`);

        // --- Bookings ---
        const bookings = await Booking.bulkCreate([
            {
                experienceId: experiences[0].id,
                userName: "Shravni Patil",
                userEmail: "shravni@example.com",
                bookingDate: new Date(),
                totalAmount: 499,
                finalAmount: 449, // after promo
                promoCode: "WELCOME10",
                status: "CONFIRMED",
            },
            {
                experienceId: experiences[1].id,
                userName: "Rehan",
                userEmail: "rehan@example.com",
                bookingDate: new Date(),
                totalAmount: 1299,
                finalAmount: 1039,
                promoCode: "FESTIVE20",
                status: "CONFIRMED",
            },
        ]);

        console.log(`📘 Inserted ${bookings.length} bookings.`);

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedDatabase();
