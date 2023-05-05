let createDemandeCall = require('./createDemandeCall')

function createDemande(req,res){

    let reqBody = ''
    
    req.on('data',(chunk) => {
        reqBody += chunk.toString()
    })
    req.on('end',() => {

        reqBody = JSON.parse(reqBody) 
        if (reqBody){
            console.log('createDemandeCall',reqBody )
            createDemandeCall(reqBody,res)

        }else{

        }
        
    })
}
module.exports = createDemande
 