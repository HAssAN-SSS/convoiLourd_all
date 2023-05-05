let mysql = require('mysql2')

function validateCall(reqBody,res){
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
                case 'tme' : validate('v-tme',reqBody)
                break;
                
                case 'capt' : validate('v-capt',reqBody)
                break;
    
                case 'd_tech' : validate('v-d_tech',reqBody)
                break;
    
                case 'exploi' : validate('v-exploi',reqBody)
                break;
    
                case 'terr' : validate('cloture',reqBody)
                break;
    
                default : console.log('no hay role para todo')
            }
        }
        roleHunt(reqBody)
    
        // ---------------------------------------------roleHunt---------------------------------------------
        // ?=============================================validate===============================================
        function validate(etapa,reqBody) {
            // -------------------------------verfier role------------------------------
            dbConnection.query(`SELECT role FROM user
            WHERE id_user = '${reqBody.id_user}';`,(err,dbRes,dields) => {
                console.log(dbRes)
                // -------------------------------verfier role------------------------------
                if(dbRes[0].role === reqBody.role) {
                                            dbConnection.query(`UPDATE demande SET etap = '${etapa}'
                                                                WHERE id_demande = '${reqBody.id_demande}';
                                                
                                                                `,(err,dbRes,dields) => {
                                                                   
                                                                    console.log(err)
                                                                })
                                            dbConnection.query(`
                                                                INSERT INTO process(type_process,id_user,id_demande)
                                                                VALUES ('${etapa}',${reqBody.id_user},${reqBody.id_demande});`,(err,dbRes,dields) => {
                                               
                                                                console.log(err)
                                                                res.end(JSON.stringify({access : 'valido' }))
                                            })

                                        }else {dbConnection.query(`SELECT 'usuario no tiene access' AS access;`,(err,dbRes,dields) => {
                                            console.log(err)
                                            res.end(JSON.stringify(dbRes))
                                            }
                                        )}
                                    })

            
        }
        // ?=============================================validate===============================================

    // dbConnection.query(`CALL validate("${reqBody.id_user}","${reqBody.id_demande}","${reqBody.role}")`, (err,dbRes,dields) => {
    //     console.log(( 'validate:', dbRes))
    //     console.log(err)
    //     // dataToEnv=dbRes[0][0].usuario
    //     res.end(JSON.stringify(dbRes[0]))
    // })
   
}

module.exports = validateCall
