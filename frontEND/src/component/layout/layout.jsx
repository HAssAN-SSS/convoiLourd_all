import Aside from "./aside"
import Nav from "./nav"
import Main from "./main"
import './layout.css'
import { operationAffect } from "../../store"
import { useParams } from "react-router"
import { fetchDone,fetchError,fetchLoading,store } from "../../store"
import { useDispatch} from "react-redux"
import { useEffect , useState} from "react"
import { todoFetch } from '../../store';

export let params

export default function Layout () {
  let [letGo,setLetGo] = useState(false)
  let dataStore = store.getState()
  let [sideOptVar,setSideOptVar] = useState('To_Do')
  console.log(dataStore)
  let Dispatch = useDispatch()
  // !------------------useEffect------------------
   useEffect(() => {
       Dispatch(fetchLoading())
      //  console.log('useEffect')
       fetch('http://localhost:3001/To_Do',
       {
           method:'POST',
           
           body:JSON.stringify(
               {
                   id_user:params.id_user,
                   role:params.role,
                   sideActuel:'start'
                  }
                  )
              }
              )
              .then(response => response.json()
              )
              .then(data => {
                                  Dispatch(fetchDone(data))
                                  setLetGo(prv => true)
                                  setOperations(params.role)
                                  console.log('ferst data is come')
                                  
    })
    .catch(error => {
      console.log('fetchError To_Do',error)
      Dispatch(fetchError())
    });
    
          },[])
          // store.subscribe(() => console.log(store.getState()))
        // !----------------------------------useEffect----------------------------
     params = useParams()
    //  console.log('params.id',params.role)
     let [lesOpt,setLesOpt] = useState(null)
     
     //  ------------------------------------set operation foreach role -------------------
     
     function setOperations(role) {
       if (role === 'tme') {
         setLesOpt(prv => {
                        return(
                          {
                          sideOpt:{
                            sideOpt1: 'To_Do',
                            sideOpt2: 'Done',
                            sideOpt3: 'Refused',
                          },
                          basicopt:{
                            opt1: 'Validate',
                            opt2: 'Refuse',
                            opt3: 'Choisir_itineraire'
                            }
                          }
                        )
                })
      }else if(role === 'client') {
                      setLesOpt(prv => {
                        return(
                          {
                          sideOpt:{
                            sideOpt1: 'Demandes',
                            sideOpt2: 'Accepted',
                            sideOpt3: 'Refused_',
                          },
                          basicopt:{
                            // opt1: 'Submite',
                            // opt2: 'Cancel',
                            }
                          }
                        )
                })
      }else{
                      setLesOpt(prv => {
                        return(
                          {
                            sideOpt:{
                            
                            sideOpt1: 'To_Do',
                            sideOpt2: 'Done',
                            sideOpt3: 'Refused',
                          },
                          basicopt:{
                            opt1: 'Validate',
                            opt2: 'Refuse',
                            }
                          }
                        )
                })
      }
      
    }
    Dispatch(operationAffect(lesOpt))
    //  ------------------------------------set operation foreach role -------------------
    // ?-------------------------------------render demandes foreach role------------------------
    // let datosDemandas = dataStore.lesDemandes  ? dataStore.lesDemandes.todo : ''
    // function renderDemandes(){
      //   switch(dataStore.sideoptActuel){
        //     case 'Done' : datosDemandas = dataStore.lesDemandes.done; 
        //         break
        //     case 'Refused' : datosDemandas = dataStore.lesDemandes.refused
        //         break
        //     default : datosDemandas = dataStore.lesDemandes.todo
        // }
        // }
        let [boolSide,setBollside] = useState(1)
        
    // ?-------------------------------------render demandes foreach role------------------------

       return (
           <div className="layout" >
   
               {letGo?<Nav />:'loding...'}

               {letGo? <Aside redender={setBollside} sideOptVar={setSideOptVar}/>:'loding...'}
               {letGo?<Main boolSide={boolSide}/>:'loding...'}

           </div>
       )
}