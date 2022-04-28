const blogsModel = require("../models/blogsModel")

let jwt=requie("jsonwebtoken")

const authenticate=async function(req,res,next){
    try{

    let token=req.headers.x-api-key 
    if(!token){
        res.status(404).send("token not present")
    }
    else{
        let verify=jwt.verify(token,"Functionup uranium")
        if(!verify){
            res.send(404).send("not valid token id")
        }
        else{
            next()
        }


    }
}
catch(err){
    res.status(500).send({msg:err.message})
}


}

const authorise=async function(req,res,next){
    try{
    let blogId=req.params.blogId
    let {authorId}=await blogsModel.findById(blogId)
    
    let token=req.headers.x-api-key 
    let verify=jwt.verify(token,"Functionup uranium")
    let data=verify.id
    if(data===authorId){
        next()
    }
    else{
        res.status(403).send({msg:"cannot access other's account"})
    }
}
catch(err){
    res.status(500).send({msg:err.message})
}

}
module.exports.authenticate=authenticate
module.exports.authorise=authorise