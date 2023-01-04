import RegulaFalsi from './components/RegulaFalsi'
import RegulaFalsiRefactored from './components/RegulaFalsiRefactored'
import Newton from './components/Newton'
import Manning from './components/Manning'
import './App.css';
import { Tabs, Tab } from 'react-bootstrap';

function App() {
  return (
    <div className="App container">
      <Tabs defaultActiveKey="regulaFalsi" id="uncontrolled-tab-example" className="mb-2 mt-3">
          <Tab eventKey="regulaFalsi" title="Zadatak 1 - Regula Falsi Algoritam">
              {/* ZADATAK 1 */}
              <br></br>
              <RegulaFalsi/>
              <div className="d-flex align-items-center flex-column container w-100 my-3">
                  <div id="regulaFalsiGraph"></div>
              </div>
          </Tab>
          <Tab eventKey="regulaFalsiRefactored" title="Zadatak 1 - Regula Falsi Algoritam Refactored">
              {/* ZADATAK 1 */}
              <br></br>
              <RegulaFalsiRefactored/>
          </Tab>
          <Tab eventKey="newton" title="Zadatak 2 - Newton Algoritam">
              {/* ZADATAK 2 */}
              <br></br>
              <Newton />
              <div className="d-flex align-items-center flex-column container w-100 my-3">
                  <div id="newtonGraph"></div>
              </div>
          </Tab>
          <Tab eventKey="manning" title="Zadatak 3 - Manningova Formula">
              {/* ZADATAK 3 */}
              <br></br>
              <Manning />
          </Tab>
      </Tabs>
    </div>
  );
}

export default App;
