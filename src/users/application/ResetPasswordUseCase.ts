import { MongoUserModel } from "../infrastructure/mongoModel/MongoUserModel.js";
import { ApolloError } from "apollo-server-errors";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

interface ResetPasswordDTO {
  emailOrUsername: string;
}

export default async function ResetPasswordUseCase({
  emailOrUsername, 
}: ResetPasswordDTO): Promise<Boolean | null> {
  // See if the user exists with the email
  const user = await MongoUserModel.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });
  if(!user){
    throw new ApolloError("User not found", "USER_NOT_FOUND");
  }
  
  // Send reset password email using SES
  const sesClient = new SESClient({ region: "eu-west-1" });
  const toAddress = "pau.vilella@chartboost.com" // SHOULD BE user.email;
  const fromAddress = "pau.vilella.st+sestest@gmail.com"
  try {
    await sesClient.send(new SendEmailCommand({
      Destination: {
        CcAddresses: [],
        ToAddresses: [toAddress],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: "<html><body><h1>RESET YOUR PASSWORD TEST</h1></body></html>",
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Reset your password email",
        },
      },
      Source: fromAddress,
      ReplyToAddresses: [],
    })
    );
  } catch (e) {
    console.error(e);
    throw new ApolloError(
      `Failed to send email with error: ${e}`,
      `FAILED_TO_SEND_EMAIL`
    );
  }
  return true;
}
