const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

// gRPC services
const greetProtoPath = path.join(__dirname, '..', 'protos', 'greet.proto');
const greetProtoDefinition = protoLoader.loadSync(greetProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})

const greetPackageDefinition = grpc.loadPackageDefinition(greetProtoDefinition).greet

const client = new greetPackageDefinition.GreetService("localhost:50051", grpc.credentials.createInsecure())

function callGreeting() {
    const request = {
        greeting: {
            first_name: 'Zhao',
            last_name: 'yang',
        }
    }

    client.greet(request, (error, response) => {
        if (!error) {
            console.log(`Greeting Reponse: ${response.result}`);
        } else {
            console.log(error);
        }
    })
}

function main() {
    callGreeting()
}

main()