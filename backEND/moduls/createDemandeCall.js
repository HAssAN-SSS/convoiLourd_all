let mysql = require('mysql2')

function createDemandeCall(reqBody,res) {
    let dbConnection = mysql.createConnection(
        {
            user:'root',
            password:'password',
            host:'127.0.0.1',
            port:'3306',
            database:'convoiLourd'
        }
    ) 
    dbConnection.query(`CALL setData(
                                    '${reqBody.largeur}',
                                    '${reqBody.heuteur}',
                                    '${reqBody.longueur}',
                                    '${reqBody.poide}',
                                    '${reqBody.essieux}',
                                    '${reqBody.espacement_essieux}',
                                    '${reqBody.type_operation}',
                                    '${reqBody.date_operation}',
                                    '${reqBody.point_sortie}',
                                    '${reqBody.matricule}',
                                    '${reqBody.id_user}'
                                    )`,
                                    (err,dbRes,dields) => {

                            console.log(dbRes)
                            console.log(err)
                        })
}
module.exports = createDemandeCall