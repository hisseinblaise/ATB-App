require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routers/usersRouter");
const contactRouter = require("./routers/contactRouter");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors")

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conneté avec succès!");
  })
  .catch((error) => {
    console.error("Erreur de connexion!:", error);
  });
  app.use(cors());
  app.use(express.json());
  app.use("/api/auth",usersRouter);
  app.use("/api/contact",contactRouter);
  app.listen(PORT, () => {
    console.log(`Serveur est démarré sur le http://localhost: ${PORT}`);
  })
