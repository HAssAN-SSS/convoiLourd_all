import './nav.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
export default function Nav () {
let params = useParams()
    return(
        <div className="navbar">
            <div className='nav-logo'>
                <Link to={`/${params.role}/${params.id_user}/${params.version}`}>
                    <img src="/img/tme.png" alt="logo" srcset="" width={'100%'} />
                
                </Link>

            </div>


        </div>
    )
}