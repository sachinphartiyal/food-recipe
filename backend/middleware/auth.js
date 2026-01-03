import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
    // Authorization: Bearer <token>
    let token = req.headers["authorization"]

    // If no token → user is not logged in
    if (token) {
        token = token.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid token" })
            }

            console.log(decoded)
            req.user = decoded
            next()
        })
    }
    else {
        return res.status(400).json({ message: "Invalid token" })
    }
}
export default verifyToken