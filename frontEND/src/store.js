import { legacy_createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
export let store

let initialState = null

// let dispatch = useDispatch()
// !-----------------------------------------------------------REDUCER------------------------------------
function todoReduer(state = initialState,action){

    switch(action.type){

        case FETCH_LOADING :
            return {
                ...state,
                loading:action.paylod.loading,
                sideOptActuel : 'To_Do',
                valido:false
                
            }
        case FETCH_DONE :
            return (
                {
                    ...state,
                    loading:false,
                    lesDemandes: action.paylod
                                    
                }
            )
        case OPERATION_AFFECT :
            return ({
                ...state,
                
                    user_operation : action.paylod
                    }
            )
        case PUT_SIDEOPT_ACTUEL :
            return ({
                ...state,
                
                    sideOptActuel : action.paylod
                    }
            )
        case PUT_DEMANDE_ACTUEL :
            return ({
                ...state,
                
                    dmdActual : action.paylod
                    }
            )
        case TODO_FETCH :
            return (
                    {
                    ...state,
                    loading:false,
                    lesDemandes:action.paylod,

                    }
            )
            case REFUSED_FETCH :
                return (
                        {
                        ...state,
                        loading:false,
                        lesDemandes: action.paylod
                                        
                        }
                )
            case VALIDO_O_NO :
                return (
                        {
                        ...state,
                        valido:true
                        }
                )
            case USER_INFO :
                return (
                        {
                        ...state,
                        user_info : action.paylod
                        }
                )
        default: return (state)
    }
}
// !-----------------------------------------------------------REDUCER-----------------------------------------------------

const FETCH_DONE = 'FETCH_DONE'
const FETCHE_ERROR = 'FETCH_ERROR'
const FETCH_LOADING = 'FETACH_LOADING'
const OPERATION_AFFECT = 'OPERATION_AFFECT'
const PUT_SIDEOPT_ACTUEL = 'PUT_SIDEOPT_ACTUEL'
const PUT_DEMANDE_ACTUEL = 'PUT_DEMANDE_ACTUEL'
const TODO_FETCH = 'TODO_FETCH'
const REFUSED_FETCH = 'REFUSED_FETCH'
const VALIDO_O_NO = 'VALIDO_O_NO'
const USER_INFO = 'USER_INFO'
export function fetchDone(data) {
    return(
        {
            type:FETCH_DONE,
            paylod : data,
            
        }
        )
    }
export function fetchError() {
        return(
        {
            type:FETCHE_ERROR,
            
        }
        )
    }

export function fetchLoading() {
        return(
            {
                type:FETCH_LOADING,
                paylod:{
                    loading:true
                }
                
            }
            )
        }

export function operationAffect(lesOpt) {
        return(
                {
                    type:OPERATION_AFFECT,
                    paylod: lesOpt
                        
                }
                
                )
            }

export function sideOptActuel(optActuel) {
    return(
            {
                type:PUT_SIDEOPT_ACTUEL,
                paylod: optActuel
                    
            }
            
            )
        }
export function demandeActuel(demandeInfo) {
    return(
            {
                type:PUT_DEMANDE_ACTUEL,
                paylod: demandeInfo
                    
            }
            
            )
        }
export function todoFetch(data) {
    return(
            {
                type:TODO_FETCH,
                paylod: data
                    
            }
            
            )
        }
export function refusedFetch(data) {
    return(
            {
                type:REFUSED_FETCH,
                paylod: data
                    
            }
            
            )
        }
export function validation(respon) {
    return(
            {
                type:VALIDO_O_NO,
                paylod:respon
            }
            
            )
        }
export function user_Info(respon_data) {
    console.log('USER_INFO')
    return(
            {
                type: USER_INFO ,
                paylod : respon_data
            }
            
            )
        }
// export function fetchLlamada () {
//     let dispatch = useDispatch()
//     return function (dispatch) {
//         dispatch(fetchLoading)
//         fetch('http://loacalhost:3001/logging',{
//             method:'POST',
//             body:JSON.stringify(
//                 {
//                     name_user:'aziz',
//                     pass_user:'123'
//                 }
//             )
//         })
//         .then(response => response.json())
//         .then(data => {
//             dispatch(fetchDone(data))
//         })
//         .catch(err => store.dispatch(fetchError))
//     }
// }
       
store = legacy_createStore(todoReduer)
store.subscribe(() => {
    console.log(store.getState())
})