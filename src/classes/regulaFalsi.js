import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

export default class RegulaFalsiAlgorithm {
    constructor(functionDefinition, startInterval, endInterval, precision, maxIterations, func) {
        this.functionDefinition = functionDefinition;
        this.startInterval = startInterval;
        this.endInterval = endInterval;
        this.precision = precision;
        this.maxIterations = maxIterations;
        this.squareRoot = null
        this.results = []

        if(func !== null) {
            this.funcParsed = math.parse(func);
            this.func = x => this.funcParsed.evaluate({ x });
        }
    }

    //Regula Falsi Original Algorithm
    tryToFindSquareRoot() {
        if (this.precision <= 0)
        throw "Došlo je do greške: Preciznost mora biti veća od nule.";

        if (this.endInterval < this.startInterval) {
            let temp = this.endInterval;
            this.endInterval = this.startInterval;
            this.startInterval = temp;
        }

        let fMin = this.functionDefinition(this.startInterval);
        if (fMin === 0) {
            this.squareRoot = this.startInterval;
            return true;
        }

        let fMax = this.functionDefinition(this.endInterval);
        if (fMax === 0) {
            this.squareRoot = this.endInterval;
            return true;
        }

        this.squareRoot = this.endInterval - ((this.endInterval - this.startInterval) / (fMax - fMin)) * fMax;
        if (Math.sign(fMin) === Math.sign(fMax)) return false;

        for (let i = 0; i <= this.maxIterations; i++) {
            let fKorijen = this.functionDefinition(this.squareRoot);
            if (this.endInterval - this.startInterval <= 2 * this.precision && Math.abs(fKorijen) <= this.precision) return true;

            if (this.functionDefinition(this.startInterval) * fKorijen < 0) this.endInterval = this.squareRoot;
            else if (this.functionDefinition(this.endInterval) * fKorijen < 0) this.startInterval = this.squareRoot;
            else return true;

            this.squareRoot = this.endInterval - ((this.endInterval - this.startInterval) / (fMax - fMin)) * fMax;
            
            this.results = [...this.results, {
                result: this.squareRoot,
                currentValue: this.functionDefinition(this.squareRoot),
                mistake: Math.abs(this.functionDefinition(this.squareRoot) - this.precision) 
            }]
        }
        return false;
    }

    //Invoking the Regula Falsi Original Algorithm
    calculate() {
        if (this.tryToFindSquareRoot()) {
            return JSON.stringify({
                result: this.squareRoot,
                allResults: [...this.results]
            })
        }
        throw "Došlo je do greške: Premašen je broj dozvoljenih iteracija ili nema korijena unutar definisanih granica.";
    }

    calculateRegulaFalsi() {
        let i = 0;
        let currentApproximation = 0;
        let previousApproximation = 0;
        let currentMistake = this.precision;
      
        while (i < this.maxIterations) {
            previousApproximation = currentApproximation;
            currentApproximation = (this.endInterval * this.func(this.startInterval) - this.startInterval * this.func(this.endInterval)) / (this.func(this.startInterval) - this.func(this.endInterval));
        
            if (currentApproximation) {
                currentMistake = Math.abs(currentApproximation - previousApproximation);
            }

            this.results = [...this.results, {
                approximation: currentApproximation,
                mistake: currentMistake 
            }]
        
            if (this.func(this.startInterval) * this.func(currentApproximation) < 0) {
                this.endInterval = currentApproximation;
            } else {
                this.startInterval = currentApproximation;
            }
        
            if (currentMistake <= this.precision) {
                break;
            }
      
            i++;
        }
      
        return this.results;
    }
}