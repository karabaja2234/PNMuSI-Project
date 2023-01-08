import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

export default class FixedPointIterationAlgorithm {
    constructor(functionDefinition, precision, maxIterations, xRoot, xDenominator) {
        //Setters
        this.xRoot = xRoot
        this.xDenominator = xDenominator
        this.precision = precision;
        this.maxIterations = maxIterations;
        this.results = []

        //Parse the function and it's derivative with mathjs, based on the functionDefinition input
        if(functionDefinition !== null) {
            const funcParsed = math.parse(functionDefinition);
            if(xRoot && !xDenominator) this.func = x => math.nthRoot(funcParsed.evaluate({ x }), xRoot);
            else if(!xRoot && xDenominator) this.func = x => funcParsed.evaluate({ x }) / xDenominator;
            else if(xRoot && xDenominator) this.func = x => math.nthRoot((funcParsed.evaluate({ x }) / xDenominator), xRoot);
            else this.func = x => funcParsed.evaluate({ x });
        }
    }

    calculateFixedPointIteration() {
        //Initial iteration
        let i = 0;
        //Initial value
        let initialValue = 0;
        //Initial approximation
        let initialApproximation = this.func(initialValue)

        // Iterate until the maxIterations value is reached
        while (i < this.maxIterations) {
            // Calculate next approximation and mistake
            let nextValue = initialApproximation
            let currentApproximation =  this.func(nextValue)
            let currentMistake = Math.abs(nextValue - initialValue) 

            //Break the loop if the desired precision has been reached
            if (currentMistake <= this.precision) {
                break;
            }

            //Add the current approximation and mistake to the array of results
            this.results = [...this.results, {
                approximation: initialValue,
                mistake: currentMistake
            }]

            // Update variables
            initialValue = nextValue;
            initialApproximation = currentApproximation;

            //Increment the number of iterations
            i++;
        }

        //Return the list of all calculated results
        return this.results;
    }
}