
import './aside.css'
import { refusedFetch, store } from '../../store'
import { useDispatch } from 'react-redux'
import { sideOptActuel } from '../../store'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import { refusedFetch } from '../../store'
import { todoFetch } from '../../store'
import { Navigate } from 'react-router-dom'
import { fetchDone } from '../../store'

export default function Aside(props) {
    let Dispatch = useDispatch()
    let params = useParams()
    let listOpt = []
    let [storeDataOpt,setStoreDataOpt] = useState (store.getState())
    let [letGo,setLetGo] = useState(false)
    let [sideData,setSideData] = useState([])
    // let [sideOptActuel,serSideoptActuel] = useState(storeDataOpt.sideOptActuel)

    // console.log('aside data:',storeDataOpt.user_operation.sideOpt)
    for(let key in storeDataOpt.user_operation.sideOpt){

        listOpt.push(
            <div className={'operation ' + storeDataOpt.user_operation.sideOpt[key]} key={storeDataOpt.user_operation.sideOpt[key]} onClick={() => { Dispatch(sideOptActuel(storeDataOpt.user_operation.sideOpt[key]));
            sideCall() }} >
                {storeDataOpt.user_operation.sideOpt[key]}
            </div>
        )
    }

// !=================================================
let call =false
useEffect(() => {call = true})
 function sideCall(){

    // props.redender((prv) => prv === 0 ? 1 : 0)
    //  useEffect(() => {
        //  Dispatch(fetchLoading())

        //  let optVlue = evnet.target.value
        //  console.log('optVlue',optVlue)
        // setSideData(() => storeDataOpt.sideOptActuel)
         fetch('http://localhost:3001/'+store.getState().sideOptActuel,
         {
             method:'POST',
             
             body:JSON.stringify(
                        {
                            id_user:params.id_user,
                            role:params.role,
                            sideActuel:store.getState().sideOptActuel


                        }
                    )
               }
               )
               .then(response => response.json()
               )
               .then(data => {
                                setSideData(() => data)
                                Dispatch(fetchDone(data))

                                // Dispatch(todoFetch(data))
                                console.log('sideData fetch',data)
                                // Dispatch(todoFetch(data))
                                props.redender((prv) => prv === 0 ? 1 : 0)
                                
                                    if(storeDataOpt.sideOptActuel === 'Refused') {
                                        // Dispatch(refusedFetch(data))
                                        
                                    } else if(storeDataOpt.sideOptActuel === 'To_Do') {
                                        
                                    }
                                    
                                })
     .catch(error => {
       console.log('fetchError a hassan')
    //    Dispatch(fetchError())
     });
     
        //    },[letGo,Dispatch])
        
}
// !=================================================
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^create demande^^^^^^^^^^^^^^^^^^^^^^^^^
function CreactDeamndeBtn() {
    return (
        <button>
            Create +
        </button>
    )
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^create demande^^^^^^^^^^^^^^^^^^^^^^^^^


console.log('sideData',sideData)
    return(
        <div className="aside"  >
            {listOpt}
            {params.role === 'client' ? <CreactDeamndeBtn /> : '' }
        </div>
    )
}
