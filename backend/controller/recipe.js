import Recipes from "../models/recipe.js" // Needed to interact with MongoDB
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.fieldname
        cb(null, filename)
    }
})

// multer middleware
const upload = multer({ storage: storage })

// Get all recipes with search and filter support
const getRecipes = async (req, res) => {
    try {
        const { search, category, difficulty, maxTime } = req.query

        // Build query object
        let query = {}

        // Search by title or ingredients (case-insensitive)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { ingredients: { $regex: search, $options: 'i' } }
            ]
        }

        // Filter by category
        if (category && category !== 'All') {
            query.category = category
        }

        // Filter by difficulty
        if (difficulty && difficulty !== 'All') {
            query.difficulty = difficulty
        }

        // Filter by max cooking time
        if (maxTime) {
            // Extract numeric value from time string (e.g., "30 mins" -> 30)
            query.time = { $regex: `^([0-9]|[1-9][0-9]|${maxTime})`, $options: 'i' }
        }

        const recipes = await Recipes.find(query)
        return res.json(recipes)
    } catch (err) {
        return res.status(500).json({ message: "Error fetching recipes", error: err.message })
    }
}

// Get single recipe
const getRecipe = async (req, res) => {
    const recipe = await Recipes.findById(req.params.id)
    res.json(recipe)
}

// Add recipe
const addRecipe = async (req, res) => {
    console.log(req.user)
    const {
        title,
        ingredients,
        instructions,
        time,
        category,
        difficulty
    } = req.body

    if (!title || !ingredients || !instructions) {
        res.json({ message: "Required fields can't be empty" })
    }

    const newRecipe = await Recipes.create({
        title,
        ingredients,
        instructions,
        time,
        category: category || '',
        difficulty: difficulty || '',
        coverImage: req.file.filename,
        createdBy: req.user.id
    })
    return res.json(newRecipe)
}

// Edit recipe
const editRecipe = async (req, res) => {
    const {
        title,
        ingredients,
        instructions,
        time
    } = req.body
    
    let recipe = await Recipes.findById(req.params.id)

    try {
        if (recipe) {
            let coverImage = req.file?.filename
                ? req.file?.filename
                : recipe.coverImage

            await Recipes.findByIdAndUpdate(
                req.params.id,
                { ...req.body, coverImage },
                { new: true }
            )
            res.json({ title, ingredients, instructions, time })
        }
    }
    catch (err) {
        return res.status(404).json({ message: err })
    }
}

// Delete recipe
const deleteRecipe = async (req, res) => {
    try {
        await Recipes.deleteOne({ _id: req.params.id })
        res.json({ status: "ok" })
    }
    catch (err) {
        return res.status(400).json({ message: "error" })
    }
}

export {
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    deleteRecipe,
    upload
}