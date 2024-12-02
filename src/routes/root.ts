import { FastifyPluginAsync } from "fastify";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoConfig } from "../utils";
import { Product } from "../models/productInterfaces";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient(dynamoConfig());
const dynamodb = DynamoDBDocumentClient.from(client);

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  fastify.get("/products", async function (_, reply) {
    try {
      const command = new ScanCommand({
        TableName: process.env.TABLE_NAME,
      });

      const response = await dynamodb.send(command);
      const products: Product[] = response.Items?.map((item) =>
        unmarshall(item)
      ) as Product[];

      reply
        .status(200)
        .headers({
          "Access-Control-Allow-Origin": "http://localhost:5173",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        })
        .send({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      reply.status(500).send({ error: "Failed to fetch products" });
    }
  });
};

export default root;
