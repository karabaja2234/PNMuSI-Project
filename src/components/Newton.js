import React, { useState, useRef } from 'react'
import NewtonAlgorithm from "../classes/newton";
import { Button, Form, Table } from 'react-bootstrap';
import Toast from '../partials/notification'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { 
    validateString, 
    validatePositiveNumber, 
    validateNumberExists, 
    validateIdenticalNumbers, 
    validateNewtonForm 
} from '../partials/validators'

export default function Newton(props) {
    //States used to handle the input and output of the Newton Algorithm
    const [functionDefinition, setFunctionDefinition] = useState("")
    const [precision, setPrecision] = useState()
    const [maxIterations, setMaxIterations] = useState()
    const [results, setResults] = useState([])

    //States used for handling the graph of the Newton Algorithm's results
    const ref = useRef();
    const [data, setData] = useState({})

    //Method that uses the Newton Algorithm and handles it's result
    const calculateNewton = () => {
        try {
            const newtonAlgorithm = new NewtonAlgorithm(functionDefinition, precision, maxIterations);
            const response = newtonAlgorithm.calculateNewton();
            
            if(response) {
                setResults(response)

                //Parsing the function, so it can be used for drawing the graph
                const funcParsed = props.mathjs.parse(functionDefinition);
                const func = x => funcParsed.evaluate({ x });

                //Setting the graph's data
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

                //Updating the graph's main points, fetched from the results
                response.forEach(singleResult => {
                    console.log(singleResult)
                    newData.labels.push(singleResult.approximation);
                    newData.datasets[0].data.push(func(singleResult.approximation));
                    newData.datasets[0].pointBackgroundColor.push('#00ff00');
                    newData.datasets[0].pointBorderColor.push('#00ff00');
                    newData.datasets[0].pointRadius.push(5);
                })
                newData.datasets[0].label = functionDefinition
              
                //Updating the graph's data
                setData(newData)
            }
        } catch(e) {
            Toast.fire({
                icon: 'error',
                title: e
            });
        }
    }

    //Method that applies one of the pre-written functions (test data)
    const applyExistingData = (func, prec, maxIter) => {
        setFunctionDefinition(func)
        setPrecision(prec)
        setMaxIterations(maxIter)
    }

    return (
      <div>
        <h1>PNMuSI - Projekat</h1>
        <h2>Newton Algoritam</h2>
        <p>Automatski primijeni jednu od ponuđenih funkcija?</p>
        <div className='d-flex align-items-center justify-content-center'>
            <Button className='m-2' variant="success" onClick={() => applyExistingData("x^2 - 2", 10e-4, 100)}>
                x^2 - 2
            </Button>
            <Button className='m-2' variant="success" onClick={() => applyExistingData("x^3 - x - 1", 10e-4, 100)}>
                x^3 - x - 1
            </Button>
            <Button className='m-2' variant="success" onClick={() => applyExistingData("x^3 + 3x - 5", 10e-6, 20)}>
                x^3 + 3x - 5
            </Button>
        </div>
        
        <Form className="d-flex flex-column align-items-center">
            <Form.Group className="mt-5 mb-2 w-75" controlId="formFunctionDefinitionInput">
                <Form.Label>Unesite funkciju:</Form.Label>
                <Form.Control type="text" placeholder="Funkcija" value={functionDefinition}  onChange={e => setFunctionDefinition(e.target.value)}/>
            </Form.Group>
            {!validateString(functionDefinition) ? (
                <p className="mt-2" style={{color: 'red'}}>
                    Unos Funkcije je obavezan.
                </p>
            ) : null}
            <div className="row mt-5">
                <div className="col">
                    <Form.Group className="mb-3" controlId="formPrecisionInput">
                        <Form.Label>Unesite preciznost:</Form.Label>
                        <Form.Control type="number" placeholder="Preciznost" value={precision}  onChange={e => setPrecision(e.target.value)}/>
                    </Form.Group>
                    {!validateNumberExists(precision) ? (
                        <p className="mt-2" style={{color: 'red'}}>
                            Unos preciznosti je obavezan.
                        </p>
                    ) : null}
                    {!validatePositiveNumber(precision) ? (
                        <p className="mt-2" style={{color: 'red'}}>
                            Unesena preciznosti mora biti pozitivan broj.
                        </p>
                    ) : null}
                </div>
                <div className="col">
                    <Form.Group className="mb-3" controlId="formMaxIterationsInput">
                        <Form.Label>Unesite broj iteracija:</Form.Label>
                        <Form.Control type="number" placeholder="Broj iteracija" value={maxIterations}  onChange={e => setMaxIterations(e.target.value)}/>
                    </Form.Group>
                    {!validateNumberExists(maxIterations) ? (
                        <p className="mt-2" style={{color: 'red'}}>
                            Unos broja iteracija je obavezan.
                        </p>
                    ) : null}
                    {!validatePositiveNumber(maxIterations) ? (
                        <p className="mt-2" style={{color: 'red'}}>
                            Uneseni broj iteracija mora biti pozitivan broj.
                        </p>
                    ) : null}
                </div>
            </div>
            {!validateNewtonForm(functionDefinition, precision, maxIterations)  ? (
                <p className="mt-4" style={{color: 'red'}}>
                    Informacije moraju biti ispravno unesene da bi algoritam bio pokrenut.
                </p>
            ) : <Button variant="primary" onClick={calculateNewton}>
                    Izračunaj
                </Button>
            }
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
        : null}
      </div>
    );
  }