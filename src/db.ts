import mongoose from "mongoose"

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

//Declaring Schemas

const userSchema = new Schema({
    username: { type: String, minLength: [3, "Must be at least 3 characters"], unique: true, required: true },
    password: {
        type: String,
        validate: {
            validator: function isValidPassword(password: string): boolean {
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasDigit = /\d/.test(password);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                const hasMinLength = password.length >= 8;

                return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && hasMinLength;
            },
            message: `Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.`
        }
        , required: [true, "Please enter username"]
    }
})

const contentSchema = new Schema(+{
    link: {type: String},
    type: {type: String},
    title: {type: String},
    tags: {type: [objectId]},
    userId: {type: objectId}
})

const tagSchema = new Schema({
    title: {type: String}
})

const linkSchema = new Schema({
   hash: {type: String},
   userId: {type: objectId}
})

//Creating models for the above schemas

export const Users = mongoose.model('Users',userSchema);
export const Content = mongoose.model('Content',contentSchema);
export const Tags = mongoose.model('tags',tagSchema);
export const Links = mongoose.model('links',linkSchema);