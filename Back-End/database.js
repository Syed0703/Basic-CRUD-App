const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/crudApp").then(()=>{
    console.log("DB Connected");
}).catch((error)=>{
    console.log("DB Connection Error:", error.message)
})

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    city: String,
});

const user = new mongoose.model('User', userSchema);
module.exports = user;