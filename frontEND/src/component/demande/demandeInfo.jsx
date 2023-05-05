import './demandeInfo.css'
import { store } from '../../store'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'

export default function DemandeInfo(props) {
    let [valido,setValido] = useState(false)
    // let valido 
    let [re_rend,setre_rend] = useState(false)
    let Dispatch = useDispatch()

    let params = useParams()
    let puedes = true 
    let [demandeData,setDemandeData] = useState(store.getState())
    
    useEffect(() => {
        setDemandeData(() => store.getState())  
        
    },[props.rende])
    // ?--------------------------------set basic opt list----------------------------------
        let lesBascopt = demandeData.user_operation.basicopt
        let basicOptList =[]
        let cc = 0
        for(let key in lesBascopt) {
            cc =+ 1
            basicOptList.push(
                <button key={lesBascopt[key]+cc} className={lesBascopt[key]+'btn'} onClick={whenbasicOtpClick}>{lesBascopt[key]}</button>
            )
        }
        
    // ?--------------------------------set basic opt list----------------------------------
        if(demandeData.sideOptActuel !== 'To_Do') {
                   puedes = false
                }
    // !------------------------------------onclick function for each btn ---------------------
        function whenbasicOtpClick (event) {
            
            if(event.target.textContent === 'Validate') {
                console.log('basicOpt:',  event.target.textContent)
                validate (params)
            }else if(event.target.textContent === 'Refuse') {
                refusation(params)
            }
        }

                    // =======================Validate=================

        function validate (params) {
            // props.rende ? props.setre_rend(false) : props.setre_rend(true)
            console.log(params.role)
            fetch('http://localhost:3001/validate',
            {
            method:'POST',
            body:JSON.stringify(
                {
                    id_demande:params.id_demande,
                    id_user:params.id_user,
                    role:params.role
                   }
                   )
        })
            .then(respon => respon.json())
            .then((data) => {
                console.log(data)
                    // Dispatch(validation())
                setValido(data.access)
                // let valido = data[0].access
                
                // console.log(valido)

            })
            .catch(err => console.log('validation error: ',err))
        }
                    // =======================Validate=================
                    // !==========================Refuse================

        function refusation (params) {
            setValido(true)
            // props.rende ? props.setre_rend(false) : props.setre_rend(true)
            console.log(params.role)
            fetch('http://localhost:3001/refusation',
            {
            method:'POST',
            body:JSON.stringify(
                {
                    id_demande:params.id_demande,
                    id_user:params.id_user,
                    role:params.role
                    }
                    )
        })
            .then(respon => respon.json())
            .then((data) => {
                console.log(data)
                setValido(data.access)
                // console.log('valido',data)

            })
            .catch(err => console.log('validation error: ',err))
        }
                    // !==========================Refuse================

    // !------------------------------------onclick function for each btn ---------------------

    let demandeActuelData = demandeData.dmdActual.demandeInfo
    return(
        <div className="demandeinfo">
            
                <h4>Demande Info</h4><hr />
                <div className='id-date-demande-info'>
                    <div className='id-demande-info'>#{demandeActuelData.id_demande}</div>
                    <div><b>Date Demande:</b><br></br>{demandeActuelData.date_demande} </div>
                    
                </div>
                <hr />
                <div className='client-societe-demande-info'>

                    <div className='client-info-demande-info'>

                                <div className='client-info-demande-info-item'>
                                <b>Client:  </b><span>{demandeActuelData.lname_user} {demandeActuelData.name_user.toUpperCase()}</span>
                                </div>
                                <div className='client-info-demande-info-item'>
                                <b>Tel: </b><span>{demandeActuelData.tel_user}</span>
                                </div>
                                <div className='client-info-demande-info-item'>
                                <b>Email: </b><span>{demandeActuelData.email_user}</span>
                                </div>

                    </div>

                    <div className='societe-cliente-info'>
                        <div className='logo_societe'><img src="/img/tme.png" alt="logo" width={'120vw'}/></div>
                        <div className='cliente-societe-name'> <b>Societe: </b><span>{demandeActuelData.societe_user}</span></div>
                    </div>

                </div>
                <hr />
                
                <div className='operation-demande-info'>
                    <div className='operatio-pointSorte-demande'>
                        <div className='operation-demande-info-case'><b>Operation: </b><span>{demandeActuelData.operation}</span></div>
                        <div><b>Point Sortie: </b><span>{demandeActuelData.point_sortie}</span></div>

                    </div>
                    <div className='operatio-pointSorte-demande'>
                        <div ><b>Date Operation: </b><span className='data-operation'>{demandeActuelData.date_operation}</span></div>
                        <div><b>Fechier: </b><span>{demandeActuelData.fechier}</span></div>

                    </div>
                </div>
                    <hr />
                    {/* ----------opt buttons---------------- */}
                <div className='basicOpt'>
                    {!puedes ?<><h2>{demandeData.sideOptActuel}</h2><br />{demandeActuelData.myDateOpt}</>  : (valido === 'usuario no tiene access' ? '!error': (valido === 'valido' ?<h2>valido <br /></h2>  : (valido ? 'conexion error!' : basicOptList) ))}
                </div>
        </div>
    )
}