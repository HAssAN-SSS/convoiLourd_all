import Vehicule from "../demande/vehicule"
import './createDemande.css'
import Nav from "../layout/nav"
import { useState } from "react"
import { useParams } from "react-router"
// import '../demande/vehicule.css'

export default function CreateDeamande() {
    let params = useParams()
    let [operation,setOperation] = useState(0)
    let [dateoperation,setDateoperation] = useState(null)
    let [pointSorie,setPointSorie] = useState(null)
    let [largeur,setLargeur] = useState(0)
    let [heuteur,setHeuteur] = useState(null)
    let [longueur,setLongueur] = useState(null)
    let [poide,setPoide] = useState(null)
    let [essieux,setEssieux] = useState(null)
    let [espacement_essieux,setEspacement_essieux] = useState(null)
    let [inputsData,setInputsData] = useState({
                                                type_operation : 'Export',
                                                point_sortie : 11,
                                                date_operation : '',
                                                largeur : '',
                                                heuteur : '',
                                                longueur : '',
                                                poide : '',
                                                essieux : '',
                                                espacement_essieux : '',
                                                matricule : ''


                                            })

    

    function OperationInputs() {
        return(
            <div className="OperationInputs">
                <div className="leftSide-operationInfo">
                    <h2>Operation Info</h2>
                    <br />
                    <p>
                        Welcome to Tanger Med Engineering, where we offer services for heavy-duty convoys. Before submitting your request, please ensure that you have filled out all of the required fields in the form. We look forward to assisting you with your needs.
                    </p>
                </div>
                <div className="rightSide-operationInfo">

                    <label htmlFor="type_operation">Type Operatio: </label>
                    <select name="type_operation" id="type_operation" onChange={inputsCollecter}  value={inputsData.type_operation}>
                        <option value="Export">Export</option>
                        <option value="Import">Import</option>


                    </select>
                    <label htmlFor="date_operation">Date operation:</label>
                    <input type="date" name="date_operation" id="date_operation" value={inputsData.date_operation} onChange={inputsCollecter}  required/>
                    <label htmlFor="point_sortie">Point Sortie:</label>
                    <select name="point_sortie" id="point_sortie" onChange={inputsCollecter} value={inputsData.point_sortie} required>
                        <option value="11">11</option>
                        <option value="10">10</option>
                        <option value="22">22</option>


                    </select>
                </div>
            </div>
        )
    }
    function inputsCollecter(event) {
        setInputsData(prev => {
            return(
                {
                    ...prev,[event.target.name] : event.target.value
                }
            )
        })
        console.log(inputsData)
        
    }
    function preventFunc(event) {
        event.preventDefault()
    }
    // !---------------------------------------------dataParaSubmit---------------------
    function dataParaSubmit() {
        if(inputsData.date_operation !== '' && inputsData.largeur !== '' && inputsData.heuteur !== '' && inputsData.longueur !== '' && inputsData.longueur !== '' && inputsData.poide !== '' && inputsData.essieux !== '' && inputsData.espacement_essieux !== '' && inputsData.matricule !==  '') {
            fetch('http://localhost:3001/createDemande',
                    {
                        method : 'POST',
                        body : JSON.stringify({...inputsData,id_user : params.id_user})
                    }
            )
            .then(respons => respons.json)
            .then(data => {
                console.log('create data',data)
            })
            .catch(err => console.log(err))
        }
    }
    // !---------------------------------------------dataParaSubmit---------------------

    return(
        <form action={`/${params.role}/${params.id_user}/${params.version}`} onSubmit={preventFunc}>
            <div className="createDemande-root">
                <Nav />

                <OperationInputs />
                <div className="vehicule-inputes">

                <Vehicule 
                    create={true}
                    
                    inputsCollecter={inputsCollecter}
                    inputsData={inputsData}
                    
                    
                    
                    />
                </div>
                <button type="submit" onClick={dataParaSubmit} className="submit-btn">submit</button>
            </div>
        </form>
    )
}