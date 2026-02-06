import "./config/env.js";
import app from "./app.js";
import admin from "./config/firebase.js"

const PORT = process.env.PORT || 3030 ;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

console.log(`firebase admin: ${admin}`);