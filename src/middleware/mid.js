const blogsModel = require("../models/blogsModel")

let jwt=require("jsonwebtoken")

const authenticate=async function(req,res,next){
    try{

        let token = req.headers["x-api-key"]
        
        if(!token) return res.send({msg:"Token is required"})
        
        let decodedToken = jwt.verify(token, 'Project1')
        
        if(decodedToken){
            next()
        }
        


    }

catch(err){
    res.status(500).send({msg:err.message})
}


}

const authorise=async function(req,res,next){
    try{
        let token=req.headers["x-api-key"]
        let decodedToken=jwt.verify(token,"Project1")
        
        let data=decodedToken.userId
    
        let blogId=req.params.blogId  //params //delete,put
        console.log(blogId)
        let authorID=req.body.authorId  //body
        let queryAuthor=req.query.authorId  //query //get,delete
        if(authorID){
            if(data===authorID){
                next()
            }
            else{
                return res.status(403).send({msg:"cannot access other's account"})

            }

               
        }
        if(blogId){
            
            let xyz=await blogsModel.findById(blogId)
            console.log(xyz)
            let x=data===xyz.authorId
            console.log(x)
            if(data===xyz.authorId){
                next()
            }
            else{
                return res.status(403).send({msg:"cannot access other's account"})

            }

        }
        if(queryAuthor){
            if(queryAuthor===data){
                next()
            }
            else{
                return res.status(403).send({msg:"cannot access other's account"})

            }
        }
        else{
            return res.status(403).send({msg:"cannot access other's account"})
        }

        
    
        
}
catch(err){
    return res.status(500).send({msg:err.message})
}

}
module.exports.authenticate=authenticate
module.exports.authorise=authorise