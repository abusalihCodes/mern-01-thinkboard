import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()


// middleware
if(process.env.NODE_ENV !== "production") {
app.use(cors({
     origin:"http://localhost:5173",
}));

}
app.use(express.json()); //this middleware will parse the JSON bodies in notesRoutes.js : req.body
app.use(rateLimiter);



app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname,"../Frontend/dist")))

app.get("*",(req,res) => {
     res.sendFile(path.join(__dirname,"../Frontend/","dist","index.html"))
})
}

// Sources/EndPoint (this was moved to notesRoutes.js )

//HTTP requests

connectDB().then(() => {
     app.listen(PORT, () => {
     console.log("Server started on PORT:",PORT);
     });
});

