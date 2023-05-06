let mysql = require('mysql2')

function todoCall(reqBody,res){
    dbConnection = mysql.createConnection({
        user:'root',
        password:'password',
        host:'127.0.0.1',
        port:'3306',
        database:'convoiLourd'
    })
    // !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^check version^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    let versionOk = null
     function check_version(reqBody) {
         dbConnection.query(`SELECT id_user FROM authentification WHERE VERSION = ${reqBody.version} AND date_authen_out IS NULL`,(err,dbRes,dields) => {
            versionOk = dbRes
            console.log('version test',reqBody.id_user)
            console.log(' !error check_version',err)
            try {

                if (dbRes[0].id_user == reqBody.id_user) {
    
                    roleHunt(reqBody)
                }
            } catch (error) {
                console.log('version no tiene access')
            }
            

            
        })
        
     }
     check_version(reqBody)
    // !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^check version^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// console.log('check_version',check_version(reqBody))
    // ---------------------------------------------roleHunt---------------------------------------------
    function roleHunt(reqBody) {
        // let go =  check_version(reqBody)
        console.log('versionOk',versionOk)
            // if(versionOk) {

                switch (reqBody.role) {
                    case 'tme' : todoCall_1('register')
                    break;
                    
                    case 'capt' : captTodoCall()
                    break;
                    
                    case 'd_tech' : todoCall_1('v-capt')
                    break;
                    
                    case 'exploi' : todoCall_1('v-d_tech')
                    break;
                    
                    case 'terr' : todoCall_1('v-exploi')
                    break;
                    
                    case 'client' : client(reqBody)
                    break;
                    
                    default : console.log('no hay role para todo')
                }
            // }
        }
    // roleHunt(reqBody)

    // ---------------------------------------------roleHunt---------------------------------------------
    // ================================================todoCall_1===========================================
    function todoCall_1(etapa) {
        dbConnection.query(`SELECT demande.id_demande,name_user,lname_user,societe_user,date_demande,operation,date_operation FROM demande
                            JOIN process
                            ON process.id_demande = demande.id_demande
                            JOIN user
                            ON user.id_user = process.id_user
                            WHERE etap = '${etapa}' AND type_process = 'register' ORDER BY date_process DESC ;`,(err,dbRes,dields) => {

                                console.log(err)
                                console.log(dbRes)

                                res.end(JSON.stringify(dbRes))

                            })

    }
    // ================================================todoCall_1===========================================
    // !__________________________________________________captTodoCall__________________________________________

    function captTodoCall() {
        dbConnection.query(`SELECT demande.id_demande,name_user,lname_user,societe_user,date_demande,operation,date_operation FROM demande
                            JOIN process
                            ON process.id_demande = demande.id_demande
                            JOIN user
                            ON user.id_user = process.id_user
                            WHERE (etap = 'v-tme' AND type_process = 'register') OR (etap = 'refuse_m' AND type_process = 'register') ORDER BY date_process DESC ;
                            ;`,(err,dbRes,dields) => {

            console.log(dbRes)
            res.end(JSON.stringify(dbRes))

        })
    }
    // !__________________________________________________captTodoCall__________________________________________

    //?-----------------------------------------------------client----------------------------------------
    function client(reqBody) {
        console.log(reqBody.sideActuel)
        dbConnection.query(`SELECT role FROM user WHERE id_user = ${reqBody.id_user}`,(err,dbRes,dields) => {
            if(dbRes[0].role === reqBody.role) {
                switch (reqBody.sideActuel) {
                    case 'Demandes' :
                        dbConnection.query(`SELECT demande.id_demande,date_demande,operation,date_operation,etap FROM demande
                                            JOIN process
                                            ON demande.id_demande = process.id_demande
                                            JOIN user
                                            ON process.id_user = user.id_user
                                            WHERE type_process = 'register' AND user.id_user = ${reqBody.id_user};`,(err,dbRes,dields) => {
                            console.log(err)
                            console.log(dbRes)
                            res.end(JSON.stringify(dbRes))
                        })
                    break;

                    case 'start' :
                        dbConnection.query(`SELECT demande.id_demande,date_demande,operation,date_operation,etap FROM demande
                                            JOIN process
                                            ON demande.id_demande = process.id_demande
                                            JOIN user
                                            ON process.id_user = user.id_user
                                            WHERE type_process = 'register' AND user.id_user = ${reqBody.id_user};`,(err,dbRes,dields) => {
                            console.log(err)
                            console.log(dbRes)
                            res.end(JSON.stringify(dbRes))
                        })
                    break;

                    case 'Accepted' :
                        dbConnection.query(` SELECT demande.id_demande,date_demande,operation,date_operation,etap FROM demande
                                                JOIN process
                                                ON demande.id_demande = process.id_demande
                                                JOIN user
                                                ON process.id_user = user.id_user
                                                WHERE type_process = 'register' AND user.id_user = ${reqBody.id_user} AND etap = 'cloture';`,(err,dbRes,dields) => {
                            console.log(err)
                            console.log(dbRes)
                            res.end(JSON.stringify(dbRes))
                        })
                    break;

                    case 'Refused_' :
                        dbConnection.query(`SELECT demande.id_demande,date_demande,operation,date_operation,etap FROM demande
                                            JOIN process
                                            ON demande.id_demande = process.id_demande
                                            JOIN user
                                            ON process.id_user = user.id_user
                                            WHERE type_process = 'register' AND user.id_user = ${reqBody.id_user} AND etap = 'refuse';`,(err,dbRes,dields) => {
                            console.log(err)
                            console.log(dbRes)
                            res.end(JSON.stringify(dbRes))
                        })
                    break;
                }
                dbConnection.query(``,(err,dbRes,dields) => {

                })
            }
        })
    }

    //?-----------------------------------------------------client----------------------------------------




    // dbConnection.query(`CALL to_do("${reqBody.id_user}","${reqBody.role}","${reqBody.sideActuel}")`, (err,dbRes,dields) => {
    //     console.log( 'todo::', dbRes)
    //     console.log( 'id::', reqBody.id_user)
    //     console.log( 'role::', reqBody.role)

    //     // dataToEnv=dbRes[0][0].usuario
    //     if(dbRes) {

    //         res.end(JSON.stringify(dbRes[0]))
    //     }
    // })
   
}


module.exports = todoCall
