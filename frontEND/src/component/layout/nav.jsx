import './nav.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import LogOut from './logOut/logOut'
export default function Nav () {
let params = useParams()
    return(
        <div className="navbar">
            <div className='logo'>
                <img src="/img/truck_logo.png" alt=""  width={'15%'} />
                <h1>ConvoiLourd</h1>
            </div>
            <div className='nav-logo'>
                <Link to={`/${params.role}/${params.id_user}/${params.version}`}>
                    <img src="/img/tme.png" alt="logo"  width={'100%'} />
                
                </Link>

            </div>
            <LogOut />
            


        </div>
    )
}