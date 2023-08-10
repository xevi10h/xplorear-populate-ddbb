import { LanguageCode } from "@aws-sdk/client-polly";

export default interface TranslateMediaDto {
  mediaId: string;
  outputLang: LanguageCode;
}
