const grpc = require('grpc');

const greets = require('../server/protos/greet_pb');
const greetsServices = require('../server/protos/greet_grpc_pb');

const calc = require('../server/protos/calculator_pb');
const calcServices = require('../server/protos/calculator_grpc_pb');

function callGreeting() {
    const client = new greetsServices.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    const request = new greets.GreetRequest();

    const greeting = new greets.Greeting();
    greeting.setFirstName("Zhao");
    greeting.setLastName("Yang");

    // set the Greeting
    request.setGreeting(greeting);

    client.greet(request, (error, response) => {
        if (!error) {
            console.log(`Greeting Reponse: ${response.getResult()}`);
        } else {
            console.log(error);
        }
    })
}

function callSum() {
    const client = new calcServices.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    const sumRequest = new calc.SumRequest();
    sumRequest.setFirstNumber(10)
    sumRequest.setSecondNumber(15)

    client.sum(sumRequest, (error, response) => {
        if (!error) {
            console.log(`${sumRequest.getFirstNumber()} ${sumRequest.getLastNumber()} = ${response.getSumResult()}`);
        } else {
            console.error(error);
        }
    })

}

function main() {
    callGreeting()
}

main()