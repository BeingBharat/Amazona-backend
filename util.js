const jwt=require('jsonwebtoken');

const getToken=(user)=>{
    return jwt.sign({_id:user.id,name:user.name,email:user.email,isAdmin:user.isAdmin},"secret",{
expiresIn:'1h'
    })
}




module.exports=getToken;
