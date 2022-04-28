const authorModel= require("../models/authorModel")
const jwt=require("jsonwebtoken")

const createAuthor= async function (req, res) {
    try {
        let data = req.body
        
        if ( Object.keys(data).length != 0) {
            let savedData = await authorModel.create(data)
            res.status(201).send({ msg: savedData })
        }
        else res.status(400).send({ msg: "BAD REQUEST"})
    }
    catch (err) {
        
        res.status(500).send({ msg: "Error", error: err.message })
    }

}

const loginAuthor=async function(req,res){
    try{
    let {email,password}=req.body
    let data=await authorModel.find({email:email,password:password})
    if(!data){
        res.status(404).send("Please provide valid email id and password")
    } 
    else{
        let token=jwt.sign({id:data._id},"Functionup uranium")
        res.status(200).send({msg:token})

    }
}
catch(err){
    res.status(500).send({msg:err.message})
}

}



module.exports.createAuthor= createAuthor
module.exports.loginAuthor=loginAuthor
