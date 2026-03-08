const text = require('body-parser/lib/types/text');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const productScheme = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:[
        {
            type:String,
            required:true
        }
    ],
    brands:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0
    },
    Oldprice:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    dateCreates:{
        type:Date,
        default:Date.now
    }
    
})

exports.Product =mongoose.model('Product',productScheme);