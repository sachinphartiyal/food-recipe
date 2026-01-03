import express from "express" // Needed to create router and handle HTTP requests
import { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } from "../controller/recipe.js"
import verifyToken from "../middleware/auth.js"

const router = express.Router()

router.get("/", getRecipes) //Get all recipes
router.get("/:id", getRecipe) //Get recipe by id
router.post("/", upload.single('file'), verifyToken, addRecipe) //add recipe
router.put("/:id", upload.single('file'), verifyToken, editRecipe) //Edit recipe
router.delete("/:id", verifyToken, deleteRecipe) //Delete recipe

export default router