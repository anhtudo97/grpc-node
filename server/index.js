const greets = require('../server/protos/greet_pb');
const greetService = require('../server/protos/greet_grpc_pb');

const calc = require('../server/protos/calculator_pb');
const calcService = require('../server/protos/calculator_grpc_pb');

const grpc = require('grpc')

// Implements the greet RPC method
function greet(call, callback) {
    const greeting = new greets.GreetResponse();
    greeting.setResult(
        `hello ${call.request.getGreeting().getFirstName()} ${call.request.getGreeting().getLastName()}`
    )

    callback(null, greeting)
}

// Implement the calculator RPC method
function sum(call, callback) {
    const sumResponse = new calc.SumResponse()

    sumResponse.setSumResult(
        call.request.getFirstNumber() + call.request.getLastNumber()
    )

    callback(null, sumResponse);
}

function main() {
    const server = new grpc.Server()

    // server.addService(calcService.CalculatorServiceService, { sum: sum })

    server.addService(greetService.GreetServiceService, { greet: greet });

    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())
    server.start()

    console.log('Server is running on port 50051');
}

main()