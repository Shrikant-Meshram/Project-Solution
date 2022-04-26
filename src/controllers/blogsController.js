
const blogsModel = require("../models/blogsModel")
const authorModel=require("../models/authorModel")



const createBlogs = async function (req, res) {
    try {
        let data = req.body
        let author=data.authorId
        if(!author){
            res.status(404).send("Author is not present")
        }
        let authorID=authorModel.findById(author)
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
        let authorId=req.query.authorId
        let data=await blogsModel.find({isDeleted:false, isPublished:true,authorid:`${authorId}`})
        if(!data){
            res.status(404).send("Not Found")
        }
        else{
            res.status(200).send({msg:data})

        }
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }

}


module.exports.createBlogs = createBlogs
module.exports.getBlogs=getBlogs
