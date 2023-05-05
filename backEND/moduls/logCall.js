let mysql = require('mysql2')

function logCall(reqBody,res){
    dbConnection = mysql.createConnection({
        user:'root',
        password:'password',
        host:'127.0.0.1',
        port:'3306',
        database:'convoiLourd'
    })
    dbConnection.query(`CALL check_access("${reqBody.name_user}","${reqBody.pass_user}")`,(err,dbRes,dields) => {
        console.log(JSON.stringify(dbRes))
        if(dbRes) {
            dataToEnv=dbRes[0][0].usuario
            res.end(JSON.stringify(dataToEnv))

        }
        console.log(err)
    })
   
}

module.exports = logCall
/*
!-------------------------------------------------------------check_access--PROCEDURE---------------------------------------------
DROP PROCEDURE IF EXISTS check_access;
DELIMITER $$
CREATE PROCEDURE check_access(in username VARCHAR(50),in passo VARCHAR(50))
BEGIN
    DECLARE id VARCHAR(50);
    DECLARE roleOut VARCHAR(15);
    DECLARE versionA VARCHAR(100);
    DECLARE authenCount VARCHAR(100);
    DECLARE nameout VARCHAR(40);
    DECLARE lname VARCHAR(40);
    


     SELECT id_user,role,name_user,lname_user INTO id,roleOut,nameout,lname FROM user WHERE (name_user = username AND pass_user = passo);

  
     INSERT INTO authentification(id_user) VALUES (id);

     SELECT COUNT(version) INTO authenCount FROM authentification WHERE (id_user = id AND date_authen_out IS NULL);

     SELECT version INTO versionA FROM authentification WHERE (id_user = id) ORDER BY date_authen_in DESC LIMIT 1;

     IF id IS NOT NULL AND roleOut IS NOT NULL THEN SELECT JSON_OBJECT( "id",id,"role",roleOut,"version",versionA,"authenCount",authenCount,"lname",lname,"name",nameout) AS usuario;
     else SELECT 'not access' AS usuario;
     END IF;

END

DELIMITER ;
call check_access('aziz','123');
!-------------------------------------------------------------check_access--PROCEDURE---------------------------------------------
*/