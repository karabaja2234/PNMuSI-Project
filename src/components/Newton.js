import React, { useState, useRef } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import NewtonAlgorithm from "../classes/newton";
import Toast from '../partials/notification'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

export default function Newton() {
    const ref = useRef();

    const [functionDefinition, setFunctionDefinition] = useState("")
    const [precision, setPrecision] = useState(0)
    const [maxIterations, setMaxIterations] = useState(0)

    const [results, setResults] = useState([])

    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: "",
            data: [],
            borderColor: '#ff0000',
            fill: false,
            pointBackgroundColor: [],
            pointBorderColor: [],
            pointRadius: []
        }]
    })

    const calculateNewton = () => {
        try {
            let zadatak1 = new NewtonAlgorithm(functionDefinition, precision, maxIterations);
            let response = zadatak1.calculateNewton();
            
            if(response) {
                setResults(response)
                let funcParsed = math.parse(functionDefinition);
                let func = x => funcParsed.evaluate({ x });
                let newData = {
                    labels: [],
                    datasets: [{
                        label: "",
                        data: [],
                        borderColor: '#ff0000',
                        fill: false,
                        pointBackgroundColor: [],
                        pointBorderColor: [],
                        pointRadius: []
                    }]
                }

                response.forEach(singleResult => {
                    console.log(singleResult)
                    newData.labels.push(singleResult.approximation);
                    newData.datasets[0].data.push(func(singleResult.approximation));
                    newData.datasets[0].pointBackgroundColor.push('#00ff00');
                    newData.datasets[0].pointBorderColor.push('#00ff00');
                    newData.datasets[0].pointRadius.push(5);
                })
                newData.datasets[0].label = functionDefinition
              
                setData(newData)
            }
        } catch(e) {
            Toast.fire({
                icon: 'error',
                title: e
            });
        }
    }

    const applyExistingData = (func, prec, maxIter) => {
        setFunctionDefinition(func)
        setPrecision(prec)
        setMaxIterations(maxIter)
    }

    return (
      <div>
        <h1>PNMuSI - Projekat</h1>
        <h2>Zadatak 1: Regula Falsi Algoritam</h2>
        <p>Automatski primijeni jednu od ponuđenih funkcija?</p>
        <div className='d-flex align-items-center justify-content-center'>
            <Button className='m-2' variant="success" onClick={() => applyExistingData("x^2 - 2", 10e-4, 100)}>
                x^2 - 2
            </Button>
            <Button className='m-2' variant="success" onClick={() => applyExistingData("x^3 - x - 1", 10e-4, 100)}>
                x^3 - x - 1
            </Button>
        </div>
        
        <Form className="d-flex flex-column align-items-center">
            <Form.Group className="mt-5 mb-5 w-75" controlId="formFunctionDefinitionInput">
                <Form.Label>Unesite funkciju:</Form.Label>
                <Form.Control type="text" placeholder="Funkcija" value={functionDefinition}  onChange={e => setFunctionDefinition(e.target.value)}/>
            </Form.Group>
            <div className="row">
                <div className="col">
                    <Form.Group className="mb-3" controlId="formPrecisionInput">
                        <Form.Label>Unesite preciznost:</Form.Label>
                        <Form.Control type="number" placeholder="Preciznost" value={precision}  onChange={e => setPrecision(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className="col">
                    <Form.Group className="mb-3" controlId="formMaxIterationsInput">
                        <Form.Label>Unesite broj iteracija:</Form.Label>
                        <Form.Control type="number" placeholder="Broj iteracija" value={maxIterations}  onChange={e => setMaxIterations(e.target.value)}/>
                    </Form.Group>
                </div>
            </div>
            <Button variant="primary" onClick={calculateNewton}>
                Izračunaj
            </Button>
        </Form>
        {results.length > 0 ?
        <div>
            <Table responsive hover bordered className="mt-4" style={{width: "100%"}}>
                <thead>
                    <tr className="bg-secondary text-white">
                        <td><strong>Broj iteracije</strong></td>
                        <td><strong>Aproksimacija (x<sub>i</sub>)</strong></td>
                        <td><strong>Apsolutna greška |x<sub>i+1</sub> - x<sub>i</sub>|</strong></td>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? results.map((singleResult, index) => {
                        return (
                                <tr key={index}>
                                    <td>
                                        {index + 1 + "."}
                                    </td>
                                    <td>{singleResult?.approximation}</td>
                                    <td>{singleResult?.mistake}</td>
                                </tr>
                        )
                    }) : null} 
                </tbody>
            </Table> 
            <Line ref={ref} data={data} />
        </div>
        : <p className="mt-4">Unesite podatke i pokrenite program za prikaz rezultata.</p>}
      </div>
    );
  }