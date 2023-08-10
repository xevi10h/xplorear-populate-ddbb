import MediaService from "../MediaService";
import TranslateMediaDto from "./TranslateMediaDTO";
import MediaNotFoundError from "../../domain/exceptions/MediaNotFoundError";
import {
  PollyClient,
  StartSpeechSynthesisTaskCommand,
} from "@aws-sdk/client-polly"; // ES Modules import
import * as deepl from "deepl-node";
import { DescribeVoicesCommand } from "@aws-sdk/client-polly";
import Media from "../../domain/models/Media";

class TranslateMediaUseCase {
  constructor(private readonly mediaService: MediaService) {}
  async execute({ mediaId, outputLang }: TranslateMediaDto): Promise<void> {
    let outputLangDeepl: "fr" | "en-US" | "es";
    switch (outputLang) {
      case "fr-FR":
        outputLangDeepl = "fr";
        break;
      case "en-US":
        outputLangDeepl = "en-US";
        break;
      case "es-ES":
        outputLangDeepl = "es";
        break;
      default:
        outputLangDeepl = "en-US";
        break;
    }
    const media = await this.mediaService.getMediaById(mediaId);
    if (!media) {
      throw new MediaNotFoundError("Media not found");
    }
    try {
      const translator = new deepl.Translator(process.env.DEEPL_AUTH_KEY || "");
      const client = new PollyClient({
        region: "eu-west-1",
      });
      const { text: newTitle } = await translator.translateText(
        media.title,
        null,
        outputLangDeepl
      );
      const { text: newText } = await translator.translateText(
        media.text,
        null,
        outputLangDeepl
      );
      const commandListVoices = new DescribeVoicesCommand({
        LanguageCode: outputLang,
        Engine: "neural",
      });
      const responsesListVoices = await client.send(commandListVoices);
      const voiceId =
        (Array.isArray(responsesListVoices.Voices) &&
          responsesListVoices.Voices[0].Id) ||
        "";
      const command = new StartSpeechSynthesisTaskCommand({
        Engine: "neural",
        Text: newText || "",
        OutputFormat: "mp3",
        OutputS3BucketName: "xplorearpolly",
        OutputS3KeyPrefix: `${media.placeId}/${outputLang}/`,
        VoiceId: voiceId,
        LanguageCode: outputLang,
      });
      const response = await client.send(command);

      this.mediaService.createOne(
        new Media({
          rating: media.rating,
          placeId: media.placeId,
          audioUrl: response.SynthesisTask?.OutputUri || "",
          lang: outputLang,
          text: newText,
          title: newTitle,
          voiceId,
        })
      );
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }
}

export default TranslateMediaUseCase;
