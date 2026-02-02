import express from "express";
import cors from "cors";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes import
import userRoutes from "./routes/user.js";
import recipeRoutes from "./routes/recipe.js";

// routes declaration
app.use(express.static("public"));
app.use("/", userRoutes);
app.use("/recipe", recipeRoutes);

export {app};