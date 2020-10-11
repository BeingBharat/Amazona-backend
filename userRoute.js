const express=require('express');
const isAuth = require('./auth');
const User=require('./userModel');
const Invoice=require('./invoiceModal');
const getToken=require('./util');
const router=express.Router();

router.post('/signin',async (req,res)=>{
const signinUser= await User.findOne({
    email:req.body.email,
    password:req.body.password
});
console.log("ssss"+signinUser);

if(signinUser){
    res.send({msg:{
        _id:signinUser.id,
        name:signinUser.name,
        email:signinUser.email,
        isAdmin:signinUser.isAdmin,
        token:getToken(signinUser)
    }});
}else{
res.send({msg:"Invalid Email or Password"});
}
});

router.post('/register',async (req,res)=>{
try{    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const newUser=await user.save();
    if(newUser){
        res.send({msg:{
            _id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
            token:getToken(newUser)
        }});
    }
}
    catch(error)
   {
    res.send({msg:"Invalid User Data",error:error});
   } 
    });

router.post("/invoicedata",isAuth, async (req,res)=>{
    const invoice= new Invoice({
        comapny:req.body.cd,
        customer:req.body.cs,
        invoiceNo:req.body.inv,
        itemlist: req.body.li,
        count:req.body.ct,
        total:req.body.tt,
        discount:req.body.ds,
        subtotal:req.body.st

    });
    const newInvoice=invoice.save();
    if(newInvoice){
    res.send({msg: "saved"});

    }else{
    res.status(401).send({msg:"Not Saved"});

    }
    

})
router.get("/invoicedata", async (req,res)=>{
    const invoice=await Invoice.find({});
    res.send(invoice);
   
    

});
router.get("/invoicedata/:id", async (req,res)=>{
 
    const result=await Invoice.findById(req.params.id);
    if(result){
        console.log(result);
                res.send(result);
    }else{
        res.status(404).send({message:"product Not Found"});
    }
});
router.delete("/invoicedata/:id",isAuth, async (req,res)=>{
    const deleteInvoice =await Invoice.findById(req.params.id);
    console.log("delete"+deleteInvoice);

    if(deleteInvoice){
        await deleteInvoice.remove();
        console.log("delete"+deleteInvoice);
        res.send({msg:"product deleted"});
    }else{
        res.status(401).send("Error In Deleting");
    }
   
    

});
router.put("/invoicedata/:id",isAuth, async (req,res)=>{
    const productId=req.params.id;
  
        Invoice.update({_id:productId},{
            comapny:req.body.cd,
            customer:req.body.cs,
            invoiceNo:req.body.inv,
            itemlist:req.body.li,
            count:req.body.ct,
            total:req.body.tt,
            discount:req.body.ds,
            subtotal:req.body.st,
        },(err,raw)=>{
            if (err) {
    return res.status(500).send({msg :"error in updating product"});
                
            }
            if(raw)
        return res.status(200).send({msg:"updating product success"});
           
        });



   
    
    
     
  
})
module.exports=router;