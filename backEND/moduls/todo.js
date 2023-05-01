let mysql = require('mysql2')
let todoCall = require('./todoCall')

function todo(req,res){

    let reqBody = ''
    
    req.on('data',(chunk) => {
        reqBody += chunk.toString()
    })
    req.on('end',() => {

        reqBody = JSON.parse(reqBody) 

        if (reqBody){

           todoCall(reqBody,res)

        }else{

        }
        
    })
}
module.exports = todo
