let mysql = require('mysql2')

function refusedCall(reqBody,res){
    dbConnection = mysql.createConnection({
        user:'root',
        password:'password',
        host:'127.0.0.1',
        port:'3306',
        database:'convoiLourd'
    })


    //! ______________________________________________refused_______________________________________________
    function refused(reqBody) {
        dbConnection.query(`SELECT demande.id_demande,demande.id_demande AS iddmd,name_user,lname_user,(SELECT societe_user FROM demande 
                                                                                                        JOIN process
                                                                                                        ON process.id_demande = demande.id_demande
                                                                                                        JOIN user
                                                                                                        ON user.id_user = process.id_user
                                                                                                        WHERE type_process = 'register' AND demande.id_demande = iddmd) AS societe_user,
                            date_demande,operation,date_operation FROM demande
                            JOIN process
                            ON process.id_demande = demande.id_demande
                            JOIN user
                            ON user.id_user = process.id_user
                            WHERE (type_process = 'refuse' AND user.id_user = '${reqBody.id_user}') OR (type_process = 'refuse_m' AND user.id_user = '${reqBody.id_user}');`,(err,dbRes,dields) => {
            // dataToEnv=dbRes[0][0].usuario
            console.log(dbRes)
            res.end(JSON.stringify(dbRes))
        })
    }
    refused(reqBody)
    //! ______________________________________________refused_______________________________________________

    // dbConnection.query(`CALL refused("${reqBody.id_user}")`,(err,dbRes,dields) => {
    //     console.log((reqBody.id_user))
    //     // dataToEnv=dbRes[0][0].usuario
    //     res.end(JSON.stringify(dbRes[0]))
    // })
   
}

module.exports = refusedCall