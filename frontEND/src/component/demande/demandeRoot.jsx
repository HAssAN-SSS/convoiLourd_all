import React, { useEffect, useState } from "react"
import { useParams } from "react-router" 
import './demandeRoot.css'
import DemandeInfo from "./demandeInfo"
import Itineraire from "./itinerier"
import Vehicule from "./vehicule"
import { useDispatch } from "react-redux"
import { demandeActuel } from "../../store"
import Nav from "../layout/nav"
export default function DemandeRoot() {
    let params = useParams()
    let Dispatch = useDispatch()
    let [letGo,setLetGo] = useState(false)
    let [re_rend,setre_rend] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3001/demande',
            {
            method:'POST',
            body:JSON.stringify(
                {
                    id_demande:params.id_demande,
                    id_user:params.id_user
                   }
                   )
        })
        .then((respon)=> respon.json())
        .then((data) => {
            Dispatch(demandeActuel(data))
            console.log('demande data is her:',data)
            setLetGo(() => true)

        })
        .catch(err => 'demande data error')
    },[])
    // setLetGo(false)
    return (
        <div className="demande-root">
            <Nav />
            {letGo ? <DemandeInfo rende={letGo} setre_rend={setre_rend}/> : 'loading...'}
            {letGo ? <Itineraire rende={letGo} setre_rend={setre_rend}/> : 'loading...'}

            {letGo ? <Vehicule rende={letGo} setre_rend={setre_rend}/> : 'loading...'}
            
            {/* <Itineraire /> */}
            {/* <Vehicule /> */}
        </div>
    )
}