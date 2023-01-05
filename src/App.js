import RegulaFalsi from './components/RegulaFalsi'
import Newton from './components/Newton'
import './App.css';
import { Tabs, Tab } from 'react-bootstrap';

function App() {
  return (
    <div className="App container">
      <Tabs defaultActiveKey="regulaFalsi" id="uncontrolled-tab-example" className="mb-2 mt-3">
          <Tab eventKey="regulaFalsi" title="Regula Falsi">
              {/* REGULA FALSI */}
              <br></br>
              <RegulaFalsi/>
          </Tab>
          <Tab eventKey="newton" title="Newton">
              {/* NEWTON */}
              <br></br>
              <Newton />
          </Tab>
      </Tabs>
    </div>
  );
}

export default App;
