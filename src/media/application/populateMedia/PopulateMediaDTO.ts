import { LanguageCode } from "@aws-sdk/client-polly";

export default interface PopulateMediaDto {
  placeId: string; // Normally will be the city
  number?: number;
  lang?: LanguageCode;
}
