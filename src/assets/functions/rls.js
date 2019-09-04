/**
* Pedro Paulo Miranda de Freitas
* date 23/08/2019
* rls algorithm for real valued data
* @param {Array} desired   Desired signal
* @param {number} input    Signal fed into adaptive filter
* @param {Object} S Object with -filterOrderNo : Order of the FIR filter
*                               -delta : The matrix delta*eye is the initial value of the
*                                         inverse of the detarministic autocorrelation matrix
*                               -lambda : Forgetting factor
*
* @return {Array} array containig...
*/

const math = require('mathjs')



export function RLS(desired, input, S) {


    //Initialization Procedure
    var nCoefficients = S.filterOrderNo + 1;
    var nIterations = math.size(desired)[0];
    //Pre Allocations
    var errorVector = math.zeros(nIterations);
    var outputVector = math.zeros(nIterations);
    var errorVectorPost = math.zeros(nIterations);
    var outputVectorPost = math.zeros(nIterations);
    var coefficientVector = math.zeros(nCoefficients, nIterations + 1);

    //Initial State
    var S_d = math.multiply(S.delta, math.identity(nCoefficients));
    var p_d = math.zeros(nCoefficients);


    //Improve source code regularity
    var prefixedInput = math.concat(math.zeros(nCoefficients -1), math.transpose(input));
    // console.log(prefixedInput._data);

    //Body

    coefficientVector.subset(math.index(math.range(0,nCoefficients), 0), math.multiply(S_d,p_d))
    var i;
    var regressor;
    var part_1;
    var part_2;
    var part_3;

    for (i = 0; i < nIterations; i++) {

        regressor = math.subset(prefixedInput._data, math.index(math.range((i+(nCoefficients -1)), i-1, -1)));

        //A priori estimated output
        outputVector[i] = math.multiply(math.transpose(coefficientVector.subset(math.index(math.range(0,nCoefficients), i))), regressor);

        //A priori error
        errorVector[i] = math.subtract(desired[i], outputVector[i]);

        //Atualizing S_d
        part_1 = math.multiply(S_d,regressor ,math.transpose(regressor), S_d);
        part_2 = S.lambda + math.multiply(math.transpose(regressor), S_d, regressor);
        part_3 = math.divide(part_1, part_2);
        S_d = math.multiply(math.inv(S.lambda), math.subtract(S_d, math.divide(part_1, part_2)));

        //Atualizing p_d
        p_d = math.multiply(S.lambda, math.add(p_d, math.multiply(math.conj(desired[i]), regressor)));

        //setting next coefficientVector
        coefficientVector.subset(math.index(math.range(0,nCoefficients), i+1), math.multiply(S_d,p_d));


        //A posteriori estimated outputVector
        outputVectorPost[i] =   math.multiply(math.transpose(coefficientVector.subset(math.index(math.range(0,nCoefficients), i+1))), regressor);

        //A posterioriori error
        errorVectorPost[i] = math.subtract(desired[i], outputVectorPost[i]);
    }

    return [outputVector, errorVector, coefficientVector, outputVectorPost, errorVectorPost];

}



// var obj = RLS(desired, input, S);

// it works!!!
