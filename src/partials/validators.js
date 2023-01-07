//Method which validates that a string isn't empty
export const validateString = (str) => {
    return str.length < 1 ? false : true
};

//Method which validates that the number which exists is greater than 0
export const validatePositiveNumber = (nr) => {
    return nr <= 0 && nr ? false : true
};

//Method which validates that a number exists
export const validateNumberExists = (nr) => {
    return nr || nr == 0 ? true : false
};

//Method which validates that two numbers aren't identical when both of them exist
export const validateIdenticalNumbers = (nr1, nr2) => {
    return nr1 == nr2 && nr1 && nr2 ? false : true
};

//Method which validates all input fields of the RegulaFalsi component at the same time
export const validateRegulaFalsiForm = (functionDefinition, startInterval, endInterval, precision, maxIterations) => {
    if(!validateString(functionDefinition)) return false
    if(!validateNumberExists(startInterval)) return false
    if(!validateNumberExists(endInterval)) return false
    if(!validateIdenticalNumbers(startInterval, endInterval)) return false
    if(!validateNumberExists(precision)) return false
    if(!validatePositiveNumber(precision)) return false
    if(!validateNumberExists(maxIterations)) return false
    if(!validatePositiveNumber(maxIterations)) return false
    return true
}

//Method which validates all input fields of the Newton component at the same time
export const validateNewtonForm = (functionDefinition, precision, maxIterations) => {
    if(!validateString(functionDefinition)) return false
    if(!validateNumberExists(precision)) return false
    if(!validatePositiveNumber(precision)) return false
    if(!validateNumberExists(maxIterations)) return false
    if(!validatePositiveNumber(maxIterations)) return false
    return true
}

//Method which validates all input fields of the Bisection component at the same time
export const validateBisectionForm = (functionDefinition, startInterval, endInterval, precision, maxIterations) => {
    if(!validateString(functionDefinition)) return false
    if(!validateNumberExists(startInterval)) return false
    if(!validateNumberExists(endInterval)) return false
    if(!validateIdenticalNumbers(startInterval, endInterval)) return false
    if(!validateNumberExists(precision)) return false
    if(!validatePositiveNumber(precision)) return false
    if(!validateNumberExists(maxIterations)) return false
    if(!validatePositiveNumber(maxIterations)) return false
    return true
}