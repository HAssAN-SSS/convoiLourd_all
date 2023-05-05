
import Logging from "./component/loggin/logging";
import Layout from "./component/layout/layout";
import { Route ,Routes , BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import DemandeRoot from "./component/demande/demandeRoot";
import { useState } from "react";
import CreateDeamande from "./component/createDemande/createDemande";
function App() {
  // let [storedata,setStoreData] = useState()
  return (
    <Provider store={store}>

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/logging" element={<Logging />} />
          <Route path="/:role/:id_user/:version" element={<Layout />} />
          {/* <Route path="/:role/:id_user/:version/:sideOpt" element={<Layout />} /> */}

          <Route path="/:role/:id_user/:version/:id_demande/demande" element={ <DemandeRoot />} />
          <Route path="/:role/:id_user/:version/create" element={<CreateDeamande /> } />
        </Routes>
      </BrowserRouter>
    </div>

    </Provider>
  );
}

export default App;
