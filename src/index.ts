import Fastify from "fastify";
import awsLambdaFastify from "@fastify/aws-lambda";
import { APIGatewayEvent, Context } from "aws-lambda";
import root from "./routes/root";

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const fastify = Fastify();
  await fastify.register(root);
  const lambdaHandler = awsLambdaFastify(fastify);

  return lambdaHandler(event, context);
};
