import RegulaFalsi from './components/RegulaFalsi'
import Newton from './components/Newton'
import Bisection from './components/Bisection'
import Secant from './components/Secant'
import FixedPointIteration from './components/FixedPointIteration'
import { Tabs, Tab } from 'react-bootstrap';
import './App.css';

//Configuration for the mathjs library
import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

function App() {
  return (
    <div className="App container">
      <Tabs defaultActiveKey="regulaFalsi" id="uncontrolled-tab-example" className="mb-2">
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
          <Tab eventKey="bisection" title="Bisekcija">
              {/* BISECTION */}
              <br></br>
              <Bisection mathjs={math}/>
          </Tab>
          <Tab eventKey="secant" title="Sekanta">
              {/* SECANT */}
              <br></br>
              <Secant mathjs={math}/>
          </Tab>
          <Tab eventKey="fixedPointIteration" title="Prosta iteracija">
              {/* FIXED POINT ITERATION */}
              <br></br>
              <FixedPointIteration mathjs={math}/>
          </Tab>
      </Tabs>
      <hr></hr>
      <div>
        <b><p>Developed by</p></b>
        <p>Lejla V. | Selman P. | Jana J.</p>
        <p>Polytechnic Faculty, University of Zenica</p>
      </div>
    </div>
  );
}

export default App;
