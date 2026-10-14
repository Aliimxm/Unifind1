const { Sequelize } = require("sequelize");
require("pg"); // Explicitly require pg for Vercel bundler

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres@localhost:5432/campusfind";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not set, using local development fallback:", DATABASE_URL);
}

// Setup Sequelize instance
let sequelize = null;
let initializationError = null;

try {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }

  const isLocalDevDb = /localhost|127\.0\.0\.1/.test(DATABASE_URL);

  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: isLocalDevDb
      ? {}
      : {
          ssl: {
            require: true,
            rejectUnauthorized: false, // Required for Neon
          },
        },
    pool: {
      max: 2,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  });
} catch (err) {
  console.error("Sequelize initialization error:", err.message);
  initializationError = err.message;
  sequelize = null;
}

const connectDB = async () => {
  if (!sequelize) throw new Error("DATABASE_URL is not configured correctly: " + initializationError);
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("PostgreSQL (Neon) connected successfully");
  } catch (error) {
    console.error("NeonDB connection failed:", error.message);
    throw error;
  }
};

module.exports = { sequelize, connectDB, initializationError };
