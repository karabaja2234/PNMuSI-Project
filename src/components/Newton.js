import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import NewtonAlgorithm from "../classes/newton";
import Toast from '../partials/notification'
import functionPlot from 'function-plot'

export default function Newton() {
    const [functionDefinition, setFunctionDefinition] = useState("")
    const [functionDerivative, setFunctionDerivative] = useState("")
    const [precision, setPrecision] = useState(0)
    const [maxIterations, setMaxIterations] = useState(0)
    
    const [result, setResult] = useState([])
    const [allResults, setAllResults] = useState([])

    const calculateNewton = () => {
        try {
            let zadatak2 = new NewtonAlgorithm(new Function("x", "return " + functionDefinition), new Function("x", "return " + functionDerivative), precision, maxIterations);
            let response = JSON.parse(zadatak2.calculate());
            if (response.allResults || response.result) {
                setResult(response.result)
                setAllResults(response.allResults)
               
                functionPlot({
                    target: "#newtonGraph",
                    yAxis: { domain: [-10, 10] },
                    grid: true,
                    data: [
                        {
                            fn: functionDefinition
                        }
                    ]
                })
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
        <h2>Zadatak 2: Newton Algoritam</h2>
        <Form className="d-flex flex-column align-items-center">
            <div className="row w-75">
                <Form.Group className="mt-5" controlId="formBasicEmail">
                    <Form.Label>Unesite funkciju u JavaScript formatu:</Form.Label>
                    <Form.Control type="text" placeholder="Funkcija" value={functionDefinition}  onChange={e => setFunctionDefinition(e.target.value)}/>
                    <Form.Text className="text-muted">
                        <b>Primjeri funkcija</b> (JavaScript format): <br></br>
                        <span role="button" onClick={() => setFunctionDefinition("x*x*x - x*x + 2")}>{"x*x*x - x*x + 2"}</span><br></br>
                        <span role="button" onClick={() => setFunctionDefinition("x*x - 2")}>{"x*x - 2"}</span>
                    </Form.Text>
                </Form.Group>
            </div>
            <div className="row w-75">
                <Form.Group className="mt-4 mb-4" controlId="formBasicEmail">
                    <Form.Label>Unesite prvi izvod u JavaScript formatu:</Form.Label>
                    <Form.Control type="text" placeholder="Funkcija" value={functionDerivative}  onChange={e => setFunctionDerivative(e.target.value)}/>
                    <Form.Text className="text-muted">
                        <b>Primjeri izvoda</b> (JavaScript format): <br></br>
                        <span role="button" onClick={() => setFunctionDerivative("3*x*x - 2*x")}>{"3*x*x - 2*x"}</span><br></br>
                        <span role="button" onClick={() => setFunctionDerivative("2*x")}>{"2*x"}</span>
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
                                    <td>{Math.abs(result - singleResult?.result)}</td>
                                </tr>
                        )
                    }) : null} 
                </tbody>
            </Table> 
        : <p className="mt-4">Unesite podatke i pokrenite program za prikaz rezultata.</p>}
      </div>
    );
  }