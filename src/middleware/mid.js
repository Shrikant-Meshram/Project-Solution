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
    return res.status(500).send({msg:err.message})
}


}

const authorise1=async function(req,res,next){
    try{
        let token=req.headers["x-api-key"]
        let decodedToken=jwt.verify(token,"Project1")
        let blogId=req.params.blogId  //params //delete,put
        let queryAuthor=req.query.authorId  //query //get,delete
        
        
        
        
        let data=decodedToken.userId
        let authorID=req.body.authorId
        console.log(authorID)
        if(authorID){
            if(data==authorID){
                
                next()
            }
            else{
                return res.status(403).send({msg:"cannot access other's account"})

            }

               
        }

        

        else if(blogId){
            let xyz=await blogsModel.findById(blogId)
            let pathAuthor=xyz.authorId
            
            
            
            if(data!=pathAuthor.toString()){
                
                return res.status(403).send({msg:"cannot access other's account"})
                
            }
            console.log(1)
         next()
                

            

        }

        
        
        else if(queryAuthor){
            if(queryAuthor===data){
                next()
            }
            else{
                return res.status(403).send({msg:"cannot access other's account"})

            }
        }
        else{
            return res.status(400).send({msg:"BAD REQUEST"})
        }




        
        
        
    
        
        
        
        
        
        

        
    
        
}
catch(err){
    return res.status(500).send({msg:err.message})
}

}
const authorise2=async function(req,res,next){
    try{
        let token=req.headers["x-api-key"]
        let decodedToken=jwt.verify(token,"Project1")
        
        let data=decodedToken.userId
        let blogId=req.params.blogId  //params //delete,put
        
        let xyz=await blogsModel.findById(blogId)
        let pathAuthor=xyz.authorId
        if(pathAuthor){
            
            
            
            if(data!=pathAuthor.toString()){
                
                return res.status(403).send({msg:"cannot access other's account"})
                
            }
         next()
                

            

        }


        let queryAuthor=req.query.authorId  //query //get,delete
        
        
        if(queryAuthor){
            if(queryAuthor===data){
                next()
            }
            else{
                return res.status(403).send({msg:"cannot access other's account"})

            }
        }
        else{
            return res.status(400).send({msg:"BAD REQUEST"})
        }
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }

}


const authorise3=async function(req,res,next){
    try{
        let queryAuthor=req.query.authorId  //query //get,delete
        
        
        if(queryAuthor){
            if(queryAuthor===data){
                next()
            }
            else{
                return res.status(403).send({msg:"cannot access other's account"})

            }
        }
        else{
            return res.status(400).send({msg:"BAD REQUEST"})
        }

    }
    catch(err){
        res.ststus(500).send({msg:err.message})
    }
}
module.exports.authenticate=authenticate
module.exports.authorise1=authorise1
module.exports.authorise2=authorise1
module.exports.authorise3=authorise1