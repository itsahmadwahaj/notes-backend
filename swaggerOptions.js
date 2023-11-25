import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Notes-WebApp API Documentation",
      version: "1.0.0",
      description:
        "API documentation for Notes-WebApp. Get all info here about database schemas, request, response, data validation, authentication and authorization.",
      contact: {
        name: "API Support",
        email: "wahaj.buggcy@gmail.com",
        url: "https://github.com/itsahmadwahaj"
      }
    },
    servers: [{ url: `http://localhost:${process.env.PORT || "4040"}/api/v1` }]
    // security: [{ bearerAuth: [] }]
  },
  apis: ["./routes/*.js", "./docs/*.yaml"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
