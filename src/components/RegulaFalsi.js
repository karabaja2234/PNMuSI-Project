import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import RegulaFalsiAlgorithm from "../classes/regulaFalsi";
import Toast from '../partials/notification'
import functionPlot from 'function-plot'

export default function RegulaFalsi() {
    const [functionDefinition, setFunctionDefinition] = useState("")
    const [startInterval, setStartInterval] = useState(0)
    const [endInterval, setEndInterval] = useState(0)
    const [precision, setPrecision] = useState(0)
    const [maxIterations, setMaxIterations] = useState(0)
    
    const [result, setResult] = useState([])
    const [allResults, setAllResults] = useState([])

    const calculateRegulaFalsi = () => {
        try {
            let zadatak1 = new RegulaFalsiAlgorithm(new Function("x", "return " + functionDefinition), startInterval, endInterval, precision, maxIterations, null);
            let response = JSON.parse(zadatak1.calculate());
            if (response.allResults || response.result) {
                setResult(response.result)
                setAllResults(response.allResults)

                functionPlot({
                    target: "#regulaFalsiGraph",
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
        <h2>Zadatak 1: Regula Falsi Algoritam</h2>
        <Form className="d-flex flex-column align-items-center">
            <Form.Group className="mt-5 mb-5 w-75" controlId="formBasicEmail">
                <Form.Label>Unesite funkciju u JavaScript formatu:</Form.Label>
                <Form.Control type="text" placeholder="Funkcija" value={functionDefinition}  onChange={e => setFunctionDefinition(e.target.value)}/>
                <Form.Text className="text-muted">
                    <b>Primjeri funkcija</b> (JavaScript format): <br></br>
                    <span role="button" onClick={() => setFunctionDefinition("x*x*x - x*x + 2")}>{"x*x*x - x*x + 2"}</span><br></br>
                    <span role="button" onClick={() => setFunctionDefinition("x*x - 2")}>{"x*x - 2"}</span>
                </Form.Text>
            </Form.Group>
            <div className="row">
                <div className="col">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Unesite donju granicu:</Form.Label>
                        <Form.Control type="number" placeholder="Funkcija" value={startInterval}  onChange={e => setStartInterval(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className="col">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Unesite gornju granicu:</Form.Label>
                        <Form.Control type="number" placeholder="Funkcija" value={endInterval}  onChange={e => setEndInterval(e.target.value)}/>
                    </Form.Group>
                </div>
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
            <Button variant="primary" onClick={calculateRegulaFalsi}>
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