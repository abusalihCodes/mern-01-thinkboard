import mongoose from "mongoose";

// 1st step-create a schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type : String,
            required : true,
        },
        content: {
           type : String,
            required : true,
        },
    },
    {timestamps: true}
);

// 2nd step-model based of that schema 

const Note = mongoose.model("Note",noteSchema)

export default Note;