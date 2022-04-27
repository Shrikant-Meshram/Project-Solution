
const blogsModel = require("../models/blogsModel")
const authorModel=require("../models/authorModel")




const createBlogs = async function (req, res) {
    try {
        let data = req.body
        let author=data.authorId
        if(!author){
            res.status(404).send("Author is not present")
        }
        let authorID=await authorModel.findById(author)
        if(!authorID){
            req.status(404).send("Please provide valid author id")
        }
        if ( Object.keys(data).length != 0) {
            let savedData = await blogsModel.create(data)
            res.status(201).send({ msg: savedData })
        }
        else res.status(400).send({ msg: "BAD REQUEST"})
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

const getBlogs=async function(req,res){
    try{
        let newArr=[]
        
        let data=await blogsModel.find(req.query)
        
        if(data.length===0){
            let data2=await blogsModel.find({isDeleted:false,isPublished:true})
            if(data2.length===0){
                res.status(404).send("Not Found")
            }
            else{
            res.status(200).send({msg:data2})
            }
        }
        else{
            for(let i=0;i<data.length;i++){
                if(data[i].isDeleted==false && data[i].isPublished==true){
                    let data1=data[i]
                    newArr.push(data1)

                }
            }
            res.status(200).send({msg:newArr})

            

        }
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }

}
const updateBlogs=async function(req,res){
    try{
        let {title,body,tags,subcategory}=req.body
        let id=req.params.blogId 
        let data=await blogsModel.findById(id)

        
        if(data!==null && data.isDeleted===false){
            let update1=data.tags
            let update2=data.subcategory
            let date=new Date()
            update1.push(tags)
            update2.push(subcategory)
            let savedData=await blogsModel.findOneAndUpdate({_id:data._id},
            {$set:{title:title,body:body,tags:update1,subcategory:update2,isPublished:true,publishedAt:`${date}`}},
            {new:true}
            
            )
          res.status(200).send({msg:savedData})
        }
        else{
            res.status(404).send("Not present")
        }

    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}

const deleteId=async function(req,res){
    try{
    
    let data=req.params.blogId
    
    let date=new Date()
    let blogid=await blogsModel.findById(data)
    
    if(blogid!==null && blogid.isDeleted===false){
        let savedData=await blogsModel.findOneAndUpdate({_id:blogid._id},
            {$set:{isDeleted:true,deletedAt:`${date}`}},{new:true})
        res.status(200).send({})    
    }
    else{
        res.status(404).send("Not Found")
    }
}
catch(err){
    res.status(500).send({msg:err.message})
}
    
    

    

    
}

const deleteByQuery=async function(req,res){
    try{
    let date=new Date()
    const data=await blogsModel.find(req.query)
    if(!data){
        res.status(404).send("Not Found")
    }
    else{
        for(let i=0;i<data.length;i++){
            await blogsModel.findOneAndUpdate({_id:data[i]._id},{$set:{isDeleted:true,deletedAt:`${date}`}})
            
        }
        res.status(200).send({})

    }
}
catch(err){
    res.status(500).send({msg:err.message})
}
    

}






// DELETE /blogs?queryParams
// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this



module.exports.createBlogs = createBlogs
module.exports.getBlogs=getBlogs
module.exports.updateBlogs=updateBlogs
module.exports.deleteId=deleteId
module.exports.deleteByQuery=deleteByQuery
