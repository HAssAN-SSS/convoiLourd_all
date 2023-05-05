import './vehicule.css'
import { useState } from 'react'
import { store } from '../../store'
import { useEffect } from 'react'
import { useParams } from 'react-router'

export default function Vehicule(props) {
    
    let [vehicule,setVehicul] = useState()
    let params = useParams()
    useEffect(() => {
        if(props.create !== true) {

            setVehicul(() => store.getState().dmdActual.vehicule)  
        }

    },[props.rende])
    

    if(vehicule && props.create !== true){

    return(
        <div className='vehicule'>
            <h2>Vehicule info</h2>
            <div className='matricul'>#Matricule: {vehicule.matricule}</div>
            <div className='vehicule-info'>
                <div className='vehicule-info-leftside'>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/width.png" alt=""  width={'15%'} /></span> largeur: <span className='vehicul-data'>{vehicule.largeur ? vehicule.largeur + 'm': 'null' }</span></div>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/height.png" alt=""  width={'15%'} /></span> heuteur: <span className='vehicul-data'>{vehicule.hauteur ? vehicule.hauteur + 'm': 'null' }</span></div>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/length.png" alt=""  width={'15%'} /></span> longueur: <span className='vehicul-data'>{vehicule.longueur ? vehicule.longueur + 'm': 'null' }</span></div>



                </div>
                <div className='vehicule-info-righttside'>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/weight.png" alt=""  width={'15%'} /></span> poide: <span className='vehicul-data'>{vehicule.poid ? vehicule.poid + 'kg': 'null'} </span></div>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/essiex.png" alt=""  width={'15%'} /></span> essieux: <span className='vehicul-data'>{vehicule.essieux ? vehicule.essieux : 'null'}</span></div>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/axles.png" alt=""  width={'15%'} /></span> espacement essieux: <span className='vehicul-data'>{vehicule.espace_essieux ? vehicule.espace_essieux + 'm': 'null'}</span></div>



                </div>
                <div className='img-vehicule'>
                    <img src="/img/truck.png" alt="img"  width={'100%'} height={'80%'}/>
                </div>
            </div>
        </div>
    )
}
// ----------------------------------para create demande ------------------------
    else if(props.create === true) {
    return(
        
        <div className='vehicule'>
            <h2>Vehicule info</h2>
            <div className='matricul'>#Matricule: <input type="text" name='matricule' value={props.inputsData.matricule} onChange={props.inputsCollecter} placeholder='La Matricule...'  required /></div>
            <div className='vehicule-info'>
                <div className='vehicule-info-leftside'>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/width.png"  width={'15%'} /></span> largeur: <span className='vehicul-data'><input type="number" name='largeur' min={0} max={20000} value={props.inputsData.largeur} onChange={props.inputsCollecter} required/> m</span></div>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/height.png"  width={'15%'} /></span> heuteur: <span className='vehicul-data'><input type="number" name='heuteur' min={0} max={20000} value={props.inputsData.heuteur} onChange={props.inputsCollecter} required/> m</span></div>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/length.png"  width={'15%'} /></span> longueur: <span className='vehicul-data'><input type="number" name='longueur' min={0} max={20000} value={props.inputsData.longueur} onChange={props.inputsCollecter} required/> m</span></div>



                </div>
                <div className='vehicule-info-righttside'>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/weight.png"  width={'15%'} /></span> poide: <span className='vehicul-data'><input type="number" name='poide' min={0} max={20000} value={props.inputsData.poide} onChange={props.inputsCollecter} required/> kg</span></div>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/essiex.png"  width={'15%'} /></span> essieux: <span className='vehicul-data'><input type="number" name='essieux' min={0} max={20000} value={props.inputsData.essieux} onChange={props.inputsCollecter} required/></span></div>
                    <div className='item-vehicul-info'><span className='vehicule-info-icon'><img src="/img/axles.png"  width={'15%'} /></span> espacement essieux: <span className='vehicul-data'><input type="number" name='espacement_essieux' min={0} max={20000} value={props.inputsData.espacement_essieux}  onChange={props.inputsCollecter} required/> m</span></div>



                </div>
                <div className='img-vehicule'>
                    <img src="/img/truck.png" alt="img"  width={'100%'} height={'80%'}/>
                </div>
            </div>
        </div>
    )
    }
    // ----------------------------------para create demande ------------------------

    else{
    return(
        <h1>loging</h1>
    )
    }
}