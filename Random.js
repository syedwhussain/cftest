// 
// Samples.Random :: 
//     Generates random numbers 
//

// Define the namespace of the class
Type.registerNamespace('Samples');

// Constructor
Samples.Random = function Samples$Random() 
{
    Samples.Random.initializeBase(this);
}

// Method to generate a random number
function Samples$Random$getNumber(minNumber, maxNumber) {
    var num = minNumber + Math.floor(Math.random() * maxNumber);
    return num;
}

// Class prototype
Samples.Random.prototype = 
{
    getNumber:  Samples$Random$getNumber
}

// Register the new class
Samples.Random.registerClass('Samples.Random');

// Get a static instance of the class
Samples.Random._staticInstance = new Samples.Random();


// Define static global members
Samples.Random.getNumber = function(minNumber, maxNumber) 
{ 
   return Samples.Random._staticInstance.getNumber(minNumber, maxNumber);
}



