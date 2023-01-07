import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

export default class BisectionAlgorithm {
    constructor(functionDefinition, startInterval, endInterval, precision, maxIterations) {
        //Setters
        if(startInterval < endInterval) {
            this.startInterval = Number(startInterval);
            this.endInterval = Number(endInterval);
        } else {
            this.startInterval = Number(endInterval);
            this.endInterval = Number(startInterval);
        }
        this.precision = precision;
        this.maxIterations = maxIterations;
        this.results = []

        //Parse the function with mathjs, based on the functionDefinition input
        if(functionDefinition !== null) {
            this.funcParsed = math.parse(functionDefinition);
            this.func = x => this.funcParsed.evaluate({ x });
        }
    }

    calculateBisection() {
        //Initial iteration
        let i = 0;

        //Initial limits
        let a = this.startInterval
        let b = this.endInterval

        //Initial value
        let cPrevious = (a + b) / 2

        //Initial approximations
        let fa = this.func(a);
        let fb = this.func(b);
        let fcPrevious = this.func(cPrevious)
      
        while (i < this.maxIterations) {
            //Update the limits based on the current results of the functions
            if(fcPrevious * fa < 0) {
                b = cPrevious;
            } 

            if(fcPrevious * fb < 0) {
                a = cPrevious;
            } 

            //Update variables
            fa = this.func(a);
            fb = this.func(b);

            //Current value
            let cCurrent = (a + b) / 2

            //Calculate the current approximation and mistake
            let fcCurrent = this.func(cCurrent)
            let currentMistake = Math.abs(cCurrent - cPrevious);
            
            //Add the current approximation and mistake to the array of results
            this.results = [...this.results, {
                approximation: cCurrent,
                mistake: currentMistake 
            }]
        
            //Update variables
            cPrevious = cCurrent;
            fcPrevious = fcCurrent

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