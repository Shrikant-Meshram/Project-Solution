const authorModel= require("../models/authorModel")
const jwt=require("jsonwebtoken")

const createAuthor= async function (req, res) {
    try {
        let data = req.body
        
    
        let savedData = await authorModel.create(data)
        res.status(201).send({ status:true,data: savedData })
        
    
    }
    catch (err) {
        
        res.status(400).send({ status:false, data: err.message })
    }

}

const loginAuthor=async function(req,res){
    try{
    let {email,password}=req.body
    let data=await authorModel.findOne({email:email,password:password})
    if(!data){
        res.status(400).send({status:false,data:"Please provide valid email id and password"})
    } 
    else{
        let token=jwt.sign({userId:data._id,batch:"uranium"},"Project1")
        res.status(200).send({status:true,data:{token:token}})

    }
}
catch(err){
    res.status(500).send({status:false,data:err.message})
}

}



module.exports.createAuthor= createAuthor
module.exports.loginAuthor=loginAuthor
