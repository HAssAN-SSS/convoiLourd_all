import React from 'react';
import { Navigate } from 'react-router-dom';
import './logging.css';
import { user_Info } from '../../store'
import { useDispatch } from 'react-redux'



export default function Loggin () {
    let [userInfo,setUserInfo] = React.useState(null)
    let [letGo,setLetGo] = React.useState(false)
    let Dispatch = useDispatch()

    let [loginValue,setLoginValue] = React.useState(
        {
            name:'',
            pass:''
        }
    )
    
    function logBtn (userInfo) {
        console.log('userInfo')
        fetch('http://localhost:3001/login',
            {
                method:'POST',
               
                body:JSON.stringify(
                    {
                        name_user:loginValue.name,
                        pass_user:loginValue.pass
                    }
                )
            }
        )
          .then(response => response.json())
          .then(data => {
                setUserInfo(data)
                Dispatch(user_Info(data))
                setLetGo(() => true)
          })
          .catch(error => {
            console.log('loggging error fetch:',error)
          });
        //   console.log(userInfo)

    }

    function inputCollecter (event) {
        setLoginValue (prev => {
            return(
                {
                    ...prev,[event.target.name]:event.target.value
                }
            )
        })
    }
    // {letGo ?  <Redirect to={'/:role/:id_user/:version'}/> : 'ooo'}
    // function testLog(){
    //     if(userInfo.rel && userInfo.id) {
    //         setLetGo(() => true)
    //     }
    // }
    return (
    <>
        <div className="logging">
            <img src="./img/tme.png" alt="tmeLogo" />
            <label htmlFor="user">User:</label>
            <input
             type="text" 
             name="name" 
             id="name"
             value={loginValue.name}
             onChange={inputCollecter}
             />
            <label htmlFor="user_pass">Password:</label>
            <input 
            type="password" 
            name="pass" 
            id="pass"
            value={loginValue.pass}
            onChange={inputCollecter} 
            />
            <button onClick={logBtn}>log in</button>
        </div>
        <h5>
            { userInfo === 'not access' ?  <b>"Invalid username or password. Please check and try again."</b> : ''  }
            {(userInfo === 'not access' || userInfo === null) || <Navigate to={`/${userInfo.role}/${userInfo.id}/${userInfo.version}`} />}
           
        </h5>
       
    </>
)
}