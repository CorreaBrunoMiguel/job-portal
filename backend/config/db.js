const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log("Tentando conectar MongoDB em:", uri); // log temporário
  try {
    await mongoose.connect(uri);
    console.log("MongoDB conectado 🚀");
  } catch (error) {
    console.error("Erro ao conectar MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
