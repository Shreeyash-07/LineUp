const mongoose = require("mongoose");

const tempQSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: [true, "Please enter the name"],
        },
        phone: {
            type: String,
            required: [true, "Please enter the password"],
            length: 10,
            //to deselect while fetching schema
        },
        comfirm :{
            type: Boolean,
            required:true,
            default:false
        },
        token:{
            type: String,
            required: true,
            select: false,
        }
        
    },
    { timestamps: true }
);

const tempQ = mongoose.model("TempQ", tempQSchema);
module.exports = tempQ;

