let mysql = require('mysql2')

function doneCall(reqBody,res){
    dbConnection = mysql.createConnection({
        user:'root',
        password:'password',
        host:'127.0.0.1',
        port:'3306',
        database:'convoiLourd'
    })
    dbConnection.query(`CALL done("${reqBody.id_user}","${reqBody.role}")`,(err,dbRes,dields) => {
        // dataToEnv=dbRes[0][0].usuario
        if(dbRes) {
            
            console.log((dbRes[0]))
            res.end(JSON.stringify(dbRes[0]))
        }
    })
   
}

module.exports = doneCall