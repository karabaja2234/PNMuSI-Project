import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

export default class SecantAlgorithm {
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

    calculateSecant() {
        //Initial iteration
        let i = 0;

        //Initial values
        let x0 = 1;
        let x1 = 2;
 
        //Initial approximations
        let fx0 = this.func(x0);
        let fx1 = this.func(x1);

        // Iterate until the maxIterations value is reached
        while (i < this.maxIterations) {
            // Calculate next approximation and mistake
            let x2 = x1 - (fx1 * (x1 - x0)) / (fx1 - fx0);
            let fx2 = this.func(x2);
            let currentMistake = Math.abs(x2 - x1) 

            //Add the current approximation and mistake to the array of results
            this.results = [...this.results, {
                approximation: x1,
                mistake: currentMistake
            }]

            // Update variables
            // Update variables
            x0 = x1;
            x1 = x2;
            fx0 = fx1;
            fx1 = fx2;
            
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