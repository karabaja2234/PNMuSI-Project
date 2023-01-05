import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

export default class RegulaFalsiAlgorithm {
    constructor(functionDefinition, startInterval, endInterval, precision, maxIterations) {
        this.startInterval = startInterval;
        this.endInterval = endInterval;
        this.precision = precision;
        this.maxIterations = maxIterations;
        this.results = []

        if(functionDefinition !== null) {
            this.funcParsed = math.parse(functionDefinition);
            this.func = x => this.funcParsed.evaluate({ x });
        }
    }

    calculateRegulaFalsi() {
        let i = 0;
        let previousApproximation = (this.endInterval * this.func(this.startInterval) - this.startInterval * this.func(this.endInterval)) / (this.func(this.startInterval) - this.func(this.endInterval));
      
        while (i < this.maxIterations) {
            if (this.func(this.startInterval) * this.func(previousApproximation) < 0) {
                this.endInterval = previousApproximation;
            } else {
                this.startInterval = previousApproximation;
            }

            let currentApproximation = (this.endInterval * this.func(this.startInterval) - this.startInterval * this.func(this.endInterval)) / (this.func(this.startInterval) - this.func(this.endInterval));
            let currentMistake = Math.abs(currentApproximation - previousApproximation);
            
            this.results = [...this.results, {
                approximation: previousApproximation,
                mistake: currentMistake 
            }]
        
            previousApproximation = currentApproximation;

            if (currentMistake <= this.precision) {
                break;
            }
      
            i++;
        }
      
        return this.results;
    }
}