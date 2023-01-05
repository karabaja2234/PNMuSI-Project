import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

export default class NewtonAlgorithm {
    constructor(functionDefinition, precision, maxIterations) {
        this.precision = precision;
        this.maxIterations = maxIterations;
        this.results = []

        if(functionDefinition !== null) {
            this.funcParsed = math.parse(functionDefinition);
            this.derivativeParsed = math.derivative(this.funcParsed, 'x');
            this.func = x => this.funcParsed.evaluate({ x });
            this.derivative = x => this.derivativeParsed.evaluate({ x });
        }
    }

    calculateNewton() {
        let initialValue = 1;
        let initialApproximation = this.func(initialValue);
        let i = 0;

        // Iterate until precision is reached or maxIterations is reached
        while (i < this.maxIterations) {
            // Calculate next approximation
            let nextValue = initialValue - initialApproximation / this.derivative(initialValue);
            let currentApproximation = this.func(nextValue);
            let currentMistake = Math.abs(nextValue - initialValue) 

            this.results = [...this.results, {
                approximation: initialValue,
                mistake: currentMistake
            }]

            // Update variables
            initialValue = nextValue;
            initialApproximation = currentApproximation;
            
            if (currentMistake <= this.precision) {
                break;
            }

            i++;
        }

        return this.results;
    }
}