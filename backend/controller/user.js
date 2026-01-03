import User from "../models/user.js" // Used to interact with MongoDB
import bcrypt from "bcrypt" // Used to hash and compare passwords
import jwt from "jsonwebtoken" // Used to generate and verify JSON Web Tokens (JWTs)

// User Sign Up
const userSignUp = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" })
    }

    // check if user already exists
    let user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({ error: "Email already exists" })
    }

    // hash password
    const hashPwd = await bcrypt.hash(password, 10)

    // create new user
    const newUser = await User.create({
        email, password: hashPwd
    })

    // generate token - jwt
    let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY)

    return res.status(200).json({ token, user: newUser })
}

// User Login
const userLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" })
    }

    // check if user exists
    let user = await User.findOne({ email })

    // compare password
    if (user && await bcrypt.compare(password, user.password)) {
        let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY)
        return res.status(200).json({ token, user })
    }
    else {
        return res.status(400).json({ error: "Invaild credientials" })
    }
}

// Get User
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id) // /user/:id
    res.json({ email: user.email })
}

export { userLogin, userSignUp, getUser }