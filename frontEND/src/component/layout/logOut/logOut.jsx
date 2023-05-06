import './logOut.css'
import { store } from '../../../store'
import { Navigate, useParams } from 'react-router'
import { useState } from 'react'


export default function LogOut() {
    let [kill,setKill] = useState(false)
    let params = useParams()
    function logout() {
        console.log('logOut')
        fetch('http://localhost:3001/logout',
            {
                method : 'POST',
                body : JSON.stringify(
                    {
                       id_user : params.id_user,
                       version : params.version

                    }

                )
                
            }
            
        )
        .then(respon => respon.json() )
        .then(data => {
            if(data === 'logOut accepted') {
                setKill(true) 
            }


            })
        .catch(err => console.log('logout error ',err))
    }
    return(
        <div className="logout">
            <button className="logout-btn" onClick={logout}>logout</button>
            <div className='user-info'>
                <span>{store.getState().user_info.role} : {store.getState().user_info.lname} {store.getState().user_info.name} </span>
            </div>
            {kill ? <Navigate to={`/logging`} /> : ''}
        </div>
    )
}