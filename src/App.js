import RegulaFalsi from './components/RegulaFalsi'
import Newton from './components/Newton'
import { Tabs, Tab } from 'react-bootstrap';
import './App.css';

//Configuration for the mathjs library
import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

function App() {
  return (
    <div className="App container">
      <Tabs defaultActiveKey="regulaFalsi" id="uncontrolled-tab-example" className="mb-2 mt-3">
          <Tab eventKey="regulaFalsi" title="Regula Falsi">
              {/* REGULA FALSI */}
              <br></br>
              <RegulaFalsi mathjs={math}/>
          </Tab>
          <Tab eventKey="newton" title="Newton">
              {/* NEWTON */}
              <br></br>
              <Newton mathjs={math}/>
          </Tab>
      </Tabs>
    </div>
  );
}

export default App;
