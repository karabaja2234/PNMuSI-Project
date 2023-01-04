export default class NewtonAlgorithm {
    constructor(functionDefinition, functionDerivative, precision, maxIterations) {
        this.functionDefinition = functionDefinition;
        this.functionDerivative = functionDerivative;
        this.startValue = 1
        this.precision = precision;
        this.maxIterations = maxIterations;
        this.squareRoot = null
        this.results = []
    }

    //Newton's Original Algorithm
    tryToFindSquareRoot() {
        if (this.precision <= 0)
        throw new Error("Došlo je do greške: Preciznost mora biti veća od nule.");

        this.squareRoot = this.startValue;
        for (let i = 0; i < this.maxIterations; i++)
        {
            let functionValue = 0.0;
            functionValue = this.functionDefinition(this.squareRoot);
            if (functionValue === 0.0) return true;

            let functionDerivativeValue = this.functionDerivative(this.squareRoot);
            let step = functionValue / functionDerivativeValue;

            this.squareRoot = this.squareRoot - step;

            this.results = [...this.results, {
                result: this.squareRoot,
                currentValue: this.functionDefinition(this.squareRoot),
                mistake: Math.abs(this.functionDefinition(this.squareRoot) - this.precision) 
            }]

            if (Math.abs(functionValue) < this.precision && Math.abs(step) < this.precision) return true;
        }

        return false;
    }

    //Newton's Modified Algorithm
    tryToFindSquareRootModified() {
        if (this.precision <= 0)
        throw new Error("Došlo je do greške: Preciznost mora biti veća od nule.");

        this.precision = Math.abs(this.precision);

        this.squareRoot = this.startValue;

        let functionDerivativeValue = this.functionDerivative(this.startValue);
        for (let i = 0; i < this.maxIterations; i++) {
            let functionValue = this.functionDefinition(this.squareRoot);
            if (functionValue === 0.0) return true;

            let step = Math.abs((functionValue - this.squareRoot) / functionValue);

            this.results = [...this.results, {
                currentValue: this.squareRoot,
                result: functionValue,
                fDerivative: functionDerivativeValue,
                mistake: this.squareRoot - functionValue
            }]

            this.squareRoot = functionValue;

            if (Math.abs(step) < this.precision) return true;
        }

        return false;
    }

    //Invoking the Newton's Original Algorithm
    calculate() {
        if (this.tryToFindSquareRoot()) {
            return JSON.stringify({
                result: this.squareRoot,
                allResults: [...this.results]
            })
        }
        throw new Error("Došlo je do greške: Premašen je broj dozvoljenih iteracija ili nema korijena unutar definisanih granica.");
    }

    //Invoking the Newton's Modified Algorithm
    calculateModified() {
        if (this.tryToFindSquareRootModified()) {
            return JSON.stringify({ allResults: [...this.results] })
        }
        throw new Error("Došlo je do greške: Premašen je broj dozvoljenih iteracija ili nema korijena unutar definisanih granica.");
    }
}