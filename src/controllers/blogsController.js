
const blogsModel = require("../models/blogsModel")
const authorModel=require("../models/authorModel")




const createBlogs = async function (req, res) {
    try {
        let data1 = req.body 
        
        
        let savedData = await blogsModel.create(data1) //if all the consitions satisfy then like title,body etc all the mandatory so it will execute this
        return res.status(201).send({ status:true,data: savedData })
        
    }
    catch (err) {
        
        return res.status(400).send({ status:false, error: err.message })
    }
}

const getBlogs=async function(req,res){
    try{
        let data2=req.query 
        
        let data1=await blogsModel.find({$and:[data2,{isDeleted:false},{isPublished:true}]}) //checks whether all the conditions will satisfy or not if not then send error message
        if(data1.length===0){
            return res.status(404).send({status:false,msg:"Not Found"})
        }
        else{
            return res.status(200).send({status:true,data:data1})

        }

            

        
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }

}
const updateBlogs=async function(req,res){
    try{
        
        let id=req.params.blogId 
        let data=await blogsModel.findById(id)

        if(!data){ //if no data found then send error message
            return res.status(400).send({status:false,data:"blog not present"})
        }
        const updateBlog=await blogsModel.findOne({_id:id,isDeleted:false}) // checks whether all conditions are satisfied or not
        console.log(updateBlog)
        if(!updateBlog){
            return res.status(404).send({status:false,data:"Not Found"})

        }
         
        if(updateBlog.isPublished===true){ // cant't update if it is already published
            return res.status(400).send({status:false,data:"already published"})
        }
        if(req.body.title){
            updateBlog.title=req.body.title
        }
        if(req.body.body){
            updateBlog.body=req.body.body
        }
        
        if(req.body.tags){
            let value=req.body.tags
            
            let update1=updateBlog.tags
            
            update1.push(value)
            
            updateBlog.tags=update1 
            
        }
    
        if(req.body.subcategory){
            let value=req.body.subcategory
            let update2=updateBlog.subcategory
            update2.push(value)
            updateBlog.subcategory=update2 
        }
        
        let date=new Date()
        updateBlog.isPublished=true
        updateBlog.publishedAt=`${date}`
        updateBlog.save() //updates the particular document if present or create the document if it is not present 
        res.status(200).send({status:true,data:updateBlog})

    }
    catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}

const deleteId=async function(req,res){
    try{
    
    let data=req.params.blogId
    
    let date=new Date()
    let blogid=await blogsModel.findById(data)
    if(!blogid){
        return res.status(404).send({status:false,data:"Blog id doesnot exist"})
    }
    
    else if(blogid.isDeleted===false){
        let savedData=await blogsModel.findOneAndUpdate({_id:blogid._id}, // 
            {$set:{isDeleted:true,deletedAt:`${date}`}},{new:true})
        return res.status(200).send({})    
    }
    else{
        return res.status(404).send({status:false,data:"Not Found"})
    }
}
catch(err){
    res.status(500).send({status:false,data:err.message})
}
    
    

    

    
}

const deleteByQuery=async function(req,res){
    try{
    let date=new Date()
    const data=await blogsModel.find({$and:[req.query,{isDeleted:false},{isPublished:false}]})
    console.log(data)

    if(data.length==0){
        return res.status(400).send({status:false,data:"BAD REQUEST"})
    }
    else{
        
        for(let i=0;i<data.length;i++){
            
            await blogsModel.findOneAndUpdate({_id:data[i]._id},{$set:{isDeleted:true,deletedAt:`${date}`}})
            }
            
        }
        return res.status(200).send({})
        

    }

catch(err){
    res.status(500).send({status:false,data:err.message})
}
    

}









module.exports.createBlogs = createBlogs
module.exports.getBlogs=getBlogs
module.exports.updateBlogs=updateBlogs
module.exports.deleteId=deleteId
module.exports.deleteByQuery=deleteByQuery
