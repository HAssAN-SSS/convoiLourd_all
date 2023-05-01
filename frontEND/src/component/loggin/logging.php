<?php
$pass_user = 123;
$name_user = 'hassan';
    $mysqliObj = new mysqli('localhost','root','gatito','convoiLourd');

    if ($mysqliObj->connect_error) {
        die ('connection problem :' . $mysqliObj->connect_error);
    };
    // $feed = $mysqliObj->query("SELEC name_user,pass_user FROM user WHERE(name_user =".$name_user ."AND pass_user =" .$pass_user);
    $feed = $mysqliObj->query("select * from user");

    if (mysqli_num_rows($feed) > 0){
        while($row= mysqli_fetch_assoc($feed)) {
            echo (
                $row["pass_user"]
            );
        }

    }
    echo (
        "
        {
            authen_pass : ok
        }
        "
    )
?>