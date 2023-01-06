import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

export default class RegulaFalsiAlgorithm {
    constructor(functionDefinition, startInterval, endInterval, precision, maxIterations) {
        //Setters
        this.startInterval = startInterval;
        this.endInterval = endInterval;
        this.precision = precision;
        this.maxIterations = maxIterations;
        this.results = []

        //Parse the function with mathjs, based on the functionDefinition input
        if(functionDefinition !== null) {
            this.funcParsed = math.parse(functionDefinition);
            this.func = x => this.funcParsed.evaluate({ x });
        }
    }

    calculateRegulaFalsi() {
        //Initial iteration
        let i = 0;

        //Initial approximation
        let previousApproximation = (this.endInterval * this.func(this.startInterval) - this.startInterval * this.func(this.endInterval)) / (this.func(this.startInterval) - this.func(this.endInterval));
      
        while (i < this.maxIterations) {
            //Update the intervals based on the current results of the functions
            if (this.func(this.startInterval) * this.func(previousApproximation) < 0) {
                this.endInterval = previousApproximation;
            } else {
                this.startInterval = previousApproximation;
            }

            //Calculate the current approximation and mistake
            let currentApproximation = (this.endInterval * this.func(this.startInterval) - this.startInterval * this.func(this.endInterval)) / (this.func(this.startInterval) - this.func(this.endInterval));
            let currentMistake = Math.abs(currentApproximation - previousApproximation);
            
            //Add the current approximation and mistake to the array of results
            this.results = [...this.results, {
                approximation: previousApproximation,
                mistake: currentMistake 
            }]
        
            //Update variables
            previousApproximation = currentApproximation;

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