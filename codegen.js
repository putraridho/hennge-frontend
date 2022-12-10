const { codegen } = require("swagger-axios-codegen");

require("dotenv").config({
	path: ".env.local",
});

codegen({
	methodNameMode: "operationId",
	remoteUrl: process.env.API_DOC,
	openApi: "3.0",
	outputDir: "services",
	strictNullChecks: true,
});
