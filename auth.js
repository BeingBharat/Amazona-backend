const jwt=require('jsonwebtoken');



const isAuth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        try{
            console.log("dd"+token);

            const onlytoken=token.slice(7,token.length);
            console.log("dd"+onlytoken);

            jwt.verify(onlytoken,"secret",(err,decode)=>{
                console.log("dd"+decode);
                req.user=decode;
                next();
            });
        }catch(error){
             res.status(401).send({msg:'invalid token'});
                console.log("ee"+error);

        }
    }
}
     
     



module.exports=isAuth;