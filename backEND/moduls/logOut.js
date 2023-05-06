let mysql = require('mysql2')
let logOutCall = require('./logoutCall')

function logOut(req,res){

    let reqBody = ''
    
    req.on('data',(chunk) => {
        reqBody += chunk.toString()
    })
    req.on('end',() => {

        reqBody = JSON.parse(reqBody) 
        if (reqBody){
            console.log('logOutCall',reqBody )
            logOutCall(reqBody,res)

        }else{

        }
        
    })
}
module.exports = logOut
 