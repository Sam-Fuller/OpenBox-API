const { getAPI, connectionHandler } = require(`./dist/app`);
const awsServerlessExpress = require(`aws-serverless-express`);

const server = awsServerlessExpress.createServer(getAPI());

module.exports.universal = (event, context) =>
    awsServerlessExpress.proxy(server, event, context);

module.exports.websocketConnection = connectionHandler;

module.exports.websocketAction = (event, context, callback) => {
    console.log(`event`, event);
    console.log(`context`, context);
    callback(null, { statusCode: 200, body: `helloworld` });
};
