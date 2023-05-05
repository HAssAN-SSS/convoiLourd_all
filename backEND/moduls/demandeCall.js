let mysql = require('mysql2')

function demandeCall(reqBody,res){
    dbConnection = mysql.createConnection({
        user:'root',
        password:'password',
        host:'127.0.0.1',
        port:'3306',
        database:'convoiLourd'
    })
    // ?------------------------------------------------------demandeData----------------------------------
    function demande(reqBody) {
        let resTotal = []
        dbConnection.query(`SELECT itineraire.id_iti,capacite,largeure,geometry_iti,flux FROM demande
                            JOIN itineraire
                            ON itineraire.id_demande = demande.id_demande
                            WHERE demande.id_demande = '${reqBody.id_demande}';`,(err,dbRes,dields) => {
                                console.log(err)
                                resTotal.push(dbRes)
                            })
        dbConnection.query(`SELECT vehicule.matricule,espace_essieux,essieux,hauteur,poid,longueur,vehicule.largeur FROM demande
                            JOIN vehicule
                            ON vehicule.id_demande = demande.id_demande
                            WHERE demande.id_demande = '${reqBody.id_demande}';`,(err,dbRes,dields) => {
                                console.log(err)
                                resTotal.push(dbRes)
        })
        dbConnection.query(`SELECT demande.id_demande,demande.id_demande AS iddmd,(SELECT date_process FROM demande
                                                                                    JOIN process
                                                                                    ON process.id_demande = demande.id_demande
                                                                                    JOIN user 
                                                                                    ON user.id_user = process.id_user
                                                                                    WHERE user.id_user = '${reqBody.id_user}' AND demande.id_demande = iddmd ORDER BY date_operation DESC LIMIT 1) AS myDateOpt
                            ,date_demande,date_operation,point_sortie,operation,fichier,name_user,lname_user,societe_user,tel_user,email_user,role,etap FROM demande
                            JOIN process
                            ON process.id_demande = demande.id_demande
                            JOIN user 
                            ON user.id_user = process.id_user
                            WHERE demande.id_demande = '${reqBody.id_demande}' AND type_process = 'register';`,(err,dbRes,dields) => {
                                console.log(err)
                                resTotal.push(dbRes)
                                if(dbRes) {
                                    res.end(JSON.stringify({itineraire: resTotal[0][0],
                                        vehicule: resTotal[1][0],
                                        demandeInfo: resTotal[2][0]
                                    }))
                        
                                }
        })
    }
    demande(reqBody)
    // ?------------------------------------------------------demandeData----------------------------------

    // dbConnection.query(`CALL demande(${reqBody.id_demande},${reqBody.id_user})`,(err,dbRes,dields) => {
    //     console.log('demandeCall:',(dbRes[0]))
    //     // dataToEnv=dbRes[0][0].usuario
    //     if(dbRes) {
    //         res.end(JSON.stringify({itineraire:dbRes[0][0],
    //             vehicule:dbRes[1][0],
    //             demandeInfo:dbRes[2][0]
    //         }))

    //     }
    // })
   
}

module.exports = demandeCall