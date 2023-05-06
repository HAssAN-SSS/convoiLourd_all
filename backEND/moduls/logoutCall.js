let mysql = require('mysql2')

function logOutCall(reqBody,res){
    dbConnection = mysql.createConnection({
        user:'root',
        password:'password',
        host:'127.0.0.1',
        port:'3306',
        database:'convoiLourd'
    })
    dbConnection.query(`UPDATE authentification
                        SET date_authen_out = NOW()
                        WHERE id_user = ${reqBody.id_user} AND version = ${reqBody.version};`
                        ,(err,dbRes,dields) => {
                            if(err) {
                                res.end(JSON.stringify('logOut rejected'))
                            }else {
                                res.end(JSON.stringify('logOut accepted'))

                            }

                        })

}

module.exports = logOutCall
