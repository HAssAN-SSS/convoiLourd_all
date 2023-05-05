import './itinerier.css'
import { useState,useEffect } from 'react'
import { store } from '../../store'

export default function Itineraire(props) {
    let [iti,setiti] = useState()
    useEffect(() => {
    setiti(() => store.getState().dmdActual.itineraire)  

},[props.rende])
    if(iti){

        return(
            <div className="itineraire">
            <div className='iti-title'>
                <h2>itineraire info</h2>
                <img src="/img/map.png" alt="dfsd"  width={'50%'} />

            </div>
            <div className='iti-data'>

                <div className='iti-data-item'>

                    <span className='iti-data-icon-Capacite'></span>

                    <span>Capacite: </span>
                    <span className='iti-data-item-data'>{iti.capacite}</span>
                </div>
                <div className='iti-data-item'>

                    <span className='iti-data-icon-Largeur'></span>

                    <span>Largeur: </span>
                    <span className='iti-data-item-data'>{iti.largeure}</span>
                </div>
                <div className='iti-data-item'>

                    <span className='iti-data-icon-Geometry'></span>

                    <span>Geometry: </span>
                    <span className='iti-data-item-data'>{iti.geometry_iti}</span>
                </div>
                <div className='iti-data-item'>

                    <span className='iti-data-icon-Flux'></span>
                    <span>Flux: </span>
                    <span className='iti-data-item-data'>{iti.flux}</span>
                </div>

            </div>
            <div className='iti-shema'>
            </div>
        </div>
    )
}else{
    return (
        <h2>loading...</h2>
    )
}
}