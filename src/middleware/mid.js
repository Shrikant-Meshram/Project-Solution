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
        let blogId=req.params.blogId  //get blogd from path params for put and delete api
        let queryAuthor=req.query.authorId  //get authorId from query parameter for get and delete api
        
        
        
        
        let data=decodedToken.userId //we are fetching authorid
        let authorID=req.body.authorId // get the authorId from req.body for post api
        console.log(authorID)
        if(authorID){  //first check whether authorId is present in body then exexute if else it will not go to next handler
            if(data==authorID){
                
                next()
            }
            else{
                return res.status(403).send({msg:"cannot access other's account"})

            }

               
        }

        

        else if(blogId){ // checks whether blogId is present in path params if present then execute this else it will not go to next handler
            let xyz=await blogsModel.findById(blogId)
            let pathAuthor=xyz.authorId
            
            
            
            if(data!=pathAuthor.toString()){
                
                return res.status(403).send({msg:"cannot access other's account"})
                
            }
            console.log(1)
         next()
                

            

        }

        
        
        else if(queryAuthor){ //checks whether authorId is present in query parameter then exexute this else it will not go to next handler
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

module.exports.authenticate=authenticate
module.exports.authorise1=authorise1
