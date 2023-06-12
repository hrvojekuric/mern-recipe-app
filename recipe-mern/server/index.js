import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./src/routes/user.js";
import { RecipeRouter } from "./src/routes/recipe.js";
import "dotenv/config.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/recipes", RecipeRouter);
app.use("/auth", userRouter);
mongoose.connect(process.env.MONGO_DB);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
