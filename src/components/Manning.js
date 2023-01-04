import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import NewtonAlgorithm from "../classes/newton";
import Toast from '../partials/notification'

export default function Manning() {
    const [functionDefinition, setFunctionDefinition] = useState("")
    const [functionDerivative, setFunctionDerivative] = useState("")
    const [precision, setPrecision] = useState(0)
    const [maxIterations, setMaxIterations] = useState(0)
    
    const [allResults, setAllResults] = useState([])

    const calculateNewton = () => {
        try {
            let zadatak3 = new NewtonAlgorithm(new Function("x", "return " + functionDefinition), new Function("x", "return " + functionDerivative), precision, maxIterations);
            let response = JSON.parse(zadatak3.calculateModified());
            if (response.allResults || response.result) {
                setAllResults(response.allResults)
            }
        } catch(e) {
            Toast.fire({
                icon: 'error',
                title: e
            });
        }
    }

    return (
      <div>
        <h1>Selman Patković - PNMuSI - Zadaća 1 (Grupa B)</h1>
        <h2>Zadatak 3: Manningova formula</h2>
        <Form className="d-flex flex-column align-items-center">
            <div className="row w-75">
                <Form.Group className="mt-5" controlId="formBasicEmail">
                    <Form.Label>Unesite funkciju u JavaScript formatu:</Form.Label>
                    <Form.Control type="text" placeholder="Funkcija" value={functionDefinition}  onChange={e => setFunctionDefinition(e.target.value)}/>
                    <Form.Text className="text-muted">
                        <b>Manningova formula</b> (JavaScript format): <br></br>
                        <span role="button" onClick={() => setFunctionDefinition("Math.pow((1350000 + 270000*x + 13500*x*x), 1/5) / (20 * Math.pow(8, 1/10))")}>{"Math.pow((1350000 + 270000*x + 13500*x*x), 1/5) / (20 * Math.pow(8, 1/10))"}</span>
                    </Form.Text>
                </Form.Group>
            </div>
            <div className="row w-75">
                <Form.Group className="mt-5 mb-5" controlId="formBasicEmail">
                    <Form.Label>Unesite prvi izvod u JavaScript formatu::</Form.Label>
                    <Form.Control type="text" placeholder="Funkcija" value={functionDerivative}  onChange={e => setFunctionDerivative(e.target.value)}/>
                    <Form.Text className="text-muted">
                        <b>Izvod Manningove formule</b> (JavaScript format): <br></br>
                        <span role="button" onClick={() => setFunctionDerivative("270 / (Math.pow(8, 1/10) * Math.pow(13500, 4/5) * Math.pow((10 + x), 3/5))")}>{"270 / (Math.pow(8, 1/10) * Math.pow(13500, 4/5) * Math.pow((10 + x), 3/5))"}</span>
                    </Form.Text>
                </Form.Group>
            </div>
            <div className="row">
                <div className="col">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Unesite preciznost:</Form.Label>
                        <Form.Control type="number" placeholder="Funkcija" value={precision}  onChange={e => setPrecision(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className="col">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Unesite broj iteracija:</Form.Label>
                        <Form.Control type="number" placeholder="Funkcija" value={maxIterations}  onChange={e => setMaxIterations(e.target.value)}/>
                    </Form.Group>
                </div>
            </div>
            <Button variant="primary" onClick={calculateNewton}>
                Izračunaj
            </Button>
        </Form>
        {allResults.length > 0 ?
            <Table responsive hover bordered className="mt-4" style={{width: "100%"}}>
                <thead>
                    <tr className="bg-secondary text-white">
                        <td><strong>Broj iteracije</strong></td>
                        <td><strong>Aproksimacija (x)</strong></td>
                        <td><strong>Vrijednost funkcije f(x)</strong></td>
                        <td><strong>Apsolutna greška |x<sub>i+1</sub> - x<sub>i</sub>|</strong></td>
                    </tr>
                </thead>
                <tbody>
                    {allResults.length > 0 ? allResults.map((singleResult, index) => {
                        return (
                                <tr key={index}>
                                    <td>
                                        {index + 1 + "."}
                                    </td>
                                    <td>{singleResult?.result}</td>
                                    <td>{singleResult?.currentValue}</td>
                                    <td>{Math.abs(singleResult?.mistake)}</td>
                                </tr>
                        )
                    }) : null} 
                </tbody>
            </Table> 
        : <p className="mt-4">Unesite podatke i pokrenite program za prikaz rezultata.</p>}
      </div>
    );
  }