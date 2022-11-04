const options = {autoHeaders: false};

const swaggerAutogen = require('swagger-autogen')(options);

const outputFile = './swagger.json'
const endpointsFiles = ['./index.js']

const doc = {
    info: {
        title: "FitApp",
        description: "Serviço que visa ajudar todas as pessoas que querem adotar um estilo de vida mais saudável com a união de bons hábitos alimenta-res e a prática de exercícios físicos.",
        contact: {
            name: "Vanessa Dias",
            url: "https://github.com/VanessaPDias",
            email: "vanessapdias@outlook.com"
        },
        version: "1.0.0"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "authorization",  // name of the header, query parameter or cookie
            description: "any description..."
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    security: [ { "apiKeyAuth": [] } ]
}
swaggerAutogen(outputFile, endpointsFiles, doc);