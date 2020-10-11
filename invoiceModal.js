const mongoose=require('mongoose');
const invoiceSchema=new mongoose.Schema({
    comapny:{type :String},
    customer:{type:String},
    invoiceNo:{type:String},
    itemlist:{type:String}, 
    count:{type :String},
    total:{type:String},
    discount:{type:String},
    subtotal:{type:String}


});

const invoiceModel=mongoose.model("Invoice",invoiceSchema);

module.exports=invoiceModel;