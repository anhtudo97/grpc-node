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

// Implements the greet RPC method
function greet(call, callback) {
    const firstName = call.request.greeting.first_name;
    const lastName = call.request.greeting.last_name;

    callback(null, { result: `hello ${firstName} ${lastName}` })
}

function main() {
    const server = new grpc.Server()

    // server.addService(calcService.CalculatorServiceService, { sum: sum })

    server.addService(greetPackageDefinition.GreetService.service, { greet: greet });

    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())
    server.start()

    console.log('Server is running on port 50051');
}

main()