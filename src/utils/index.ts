import { fromIni } from "@aws-sdk/credential-provider-ini";

export const dynamoConfig = (): object => {
  console.log(process.env.ENVIRONMENT);
  if (process.env.ENVIRONMENT === "local") {
    return {
      region: "us-east-1",
      credentials: fromIni({ profile: process.env.PROFILE }),
    };
  }

  return {};
};
