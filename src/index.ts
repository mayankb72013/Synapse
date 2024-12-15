import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { string, z } from 'zod'
import bcrypt from 'bcrypt'
import { Users, Content, Tags, Links } from './db'
import mongoose from "mongoose"

const app = express();
dotenv.config();
async function dbConnect() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING + "");
}
dbConnect();

app.use(express.json());
app.get("/", function (req, res) {
    res.json({
        msg: "You've reached here successfully"
    })
})
app.post("/api/v1/signup", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const inputValidation = z.object({
        username: z.string().min(3, { message: "Must be at least 3 characters" }),
        password: z.string().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/), "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.")
    })
    const validationIsSuccess = inputValidation.safeParse(req.body);
    if (validationIsSuccess) {
        const hashedPassword = bcrypt.hashSync(password, 5);

        try {
            const isUser = await Users.findOne({
                username: username
            })
            if (isUser) {
                res.status(403).json({
                    msg: "User already exists"
                })
            }
            await Users.create({
                username: username,
                password: hashedPassword
            })
            res.status(200).json({
                msg: "You've been Signed Up"
            })
        } catch (error) {
            res.status(500).json({
                msg: error
            })
        }
    }
    else {
        res.status(411).json({
            msg: "Error in inputs"
        })
    }
})
app.post("/api/v1/signin", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const isValid = z.object({
        username: z.string().min(3, "Must be at least 3 characters"),
        password: z.string()
    })

    const validatedSuccessfully = isValid.safeParse(req.body);
    let user;
    if (validatedSuccessfully) {
        try {
            user = await Users.findOne({
                username: username
            })
        } catch (error) {
            res.status(503).json({
                msg: "Server side error"
            })
        }
        if (user) {
            const verifiedPassword = bcrypt.compareSync(password, user.password);
            if (verifiedPassword) {
                const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET + "");
                res.status(200).json({
                    token: token
                })
            }
            else{
                res.status(403).json({
                    msg : "Wrong Password"
                })
            }
        }
        else{
            res.status(404).json({
                msg: "No such user exists"
            })
        }
    }
    else{
        res.status(400).json({
            msg: "Incorrect input format"
        })
    }
})
app.post("/api/v1/content", function (req, res) {

})
app.get("/api/v1/content", function (req, res) {

})
app.delete("/api/v1/content", function (req, res) {

})
app.listen(3000)