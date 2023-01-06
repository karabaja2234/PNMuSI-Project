import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

export default class NewtonAlgorithm {
    constructor(functionDefinition, precision, maxIterations) {
        //Setters
        this.precision = precision;
        this.maxIterations = maxIterations;
        this.results = []

        //Parse the function and it's derivative with mathjs, based on the functionDefinition input
        if(functionDefinition !== null) {
            const funcParsed = math.parse(functionDefinition);
            const derivativeParsed = math.derivative(funcParsed, 'x');
            this.func = x => funcParsed.evaluate({ x });
            this.derivative = x => derivativeParsed.evaluate({ x });
        }
    }

    calculateNewton() {
        //Initial iteration
        let i = 0;
        //Initial value
        let initialValue = 1;
        //Initial approximation
        let initialApproximation = this.func(initialValue);

        // Iterate until the maxIterations value is reached
        while (i < this.maxIterations) {
            // Calculate next approximation and mistake
            let nextValue = initialValue - initialApproximation / this.derivative(initialValue);
            let currentApproximation = this.func(nextValue);
            let currentMistake = Math.abs(nextValue - initialValue) 

            //Add the current approximation and mistake to the array of results
            this.results = [...this.results, {
                approximation: initialValue,
                mistake: currentMistake
            }]

            // Update variables
            initialValue = nextValue;
            initialApproximation = currentApproximation;
            
            //Break the loop if the desired precision has been reached
            if (currentMistake <= this.precision) {
                break;
            }

            //Increment the number of iterations
            i++;
        }

        //Return the list of all calculated results
        return this.results;
    }
}