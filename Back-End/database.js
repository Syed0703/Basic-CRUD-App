const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/crudApp").then(()=>{
    console.log("DB Connected");
}).catch((error)=>{
    console.log("DB Connection Error:", error.message)
})

const userSchema = new mongoose.Schema({

    name: {
        required: true,
        type: String
    },

    age: {
        required: true,
        type: Number
    },
    city: {
        required: true,
        type: String
    }
});

const userModel = new mongoose.model('User', userSchema);
module.exports = userModel;