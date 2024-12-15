import mongoose from "mongoose"

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

//Declaring Schemas

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: [true, "Please enter username"] }
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