import { SESClient } from "@aws-sdk/client-ses";

export const getSesClient = () => {
  return new SESClient({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });
};