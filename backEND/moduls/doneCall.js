let mysql = require('mysql2')

function doneCall(reqBody,res){
    dbConnection = mysql.createConnection({
        user:'root',
        password:'password',
        host:'127.0.0.1',
        port:'3306',
        database:'convoiLourd'
    })
    // ---------------------------------------------roleHunt---------------------------------------------
    function roleHunt(reqBody) {
        switch (reqBody.role) {
            case 'tme' : done('v-tme',reqBody.id_user)
            break;
            
            case 'capt' : done('v-capt',reqBody.id_user)
            break;

            case 'd_tech' : done('v-d_tech',reqBody.id_user)
            break;

            case 'exploi' : done('v-exploi',reqBody.id_user)
            break;

            case 'terr' : done('v-terr',reqBody.id_user)
            break;

            default : console.log('no hay role para todo')
        }
    }
    roleHunt(reqBody)
    // ---------------------------------------------roleHunt---------------------------------------------
    // ?===============================================done===============================================
    function done(type_process,usuarioId) {
        dbConnection.query(`SELECT demande.id_demande,demande.id_demande AS iddmd,name_user,lname_user,(SELECT societe_user FROM demande 
                                                                                            JOIN process
                                                                                            ON process.id_demande = demande.id_demande
                                                                                            JOIN user
                                                                                            ON user.id_user = process.id_user
                                                                                            WHERE type_process = 'register' AND demande.id_demande = iddmd) AS societe_user,date_demande,operation,date_operation FROM demande
                            JOIN process
                            ON process.id_demande = demande.id_demande
                            JOIN user
                            ON user.id_user = process.id_user
                            WHERE user.id_user  = '${usuarioId}' AND type_process = '${type_process}' ORDER BY date_process DESC ;`,(err,dbRes,dields) => {
            // dataToEnv=dbRes[0][0].usuario
            console.log((err))
            if(dbRes) {
                
                console.log((err))

                res.end(JSON.stringify(dbRes))
            }
        })
    }
    // ?===============================================done===============================================


    // dbConnection.query(`CALL done("${reqBody.id_user}","${reqBody.role}")`,(err,dbRes,dields) => {
    //     // dataToEnv=dbRes[0][0].usuario
    //     if(dbRes) {
            
    //         console.log((dbRes[0]))
    //         res.end(JSON.stringify(dbRes[0]))
    //     }
    // })
   
}

module.exports = doneCall