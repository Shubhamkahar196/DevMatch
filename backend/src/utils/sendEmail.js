import { SendEmailCommand } from "@aws-sdk/client-ses";
import { getSesClient } from "./sesClient.js";

const createSendEmailCommand = (toAddress, fromAddress,subject,body) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${body}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the text email",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
  });
};

const run = async (subject,body) => {
// dynamic - so add emailId

  const sesClient = getSesClient();

  const sendEmailCommand = createSendEmailCommand(
    "ksk185246@gmail.com",
    // write above to emailID
    "ksk@devmatch.website",
    subject,
    body
  );

  return await sesClient.send(sendEmailCommand);
};

export default { run };