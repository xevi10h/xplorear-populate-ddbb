import Media from "../../../domain/models/Media";
import MediaService from "../MediaService";
import PlaceService from "../../place/PlaceService";
import PopulateMediaDto from "../populateMedia/PopulateMediaDTO";
import { Configuration, OpenAIApi } from "openai";
import PlaceNotFoundError from "../../../domain/exceptions/PlaceNotFoundError";
import {
  PollyClient,
  StartSpeechSynthesisTaskCommand,
  GetSpeechSynthesisTaskCommand,
  DescribeVoicesCommand,
} from "@aws-sdk/client-polly"; // ES Modules import

class PopulateMediaUseCase {
  constructor(
    private readonly mediaService: MediaService,
    private readonly placeService: PlaceService
  ) {}

  async execute({
    placeId,
    number = 1,
    lang = "en-US",
  }: PopulateMediaDto): Promise<void> {
    const place = await this.placeService.getPlaceById(placeId);
    if (!place) {
      throw new PlaceNotFoundError("Place not found");
    }
    const configuration = new Configuration({
      organization: "org-G3bAC6e2uu42WwtJnFVz7v8Y",
      apiKey: process.env.OPENAI_API_KEY || "",
    });
    const openai = new OpenAIApi(configuration);
    const client = new PollyClient({
      region: "eu-west-1",
    });
    try {
      const commandListVoices = new DescribeVoicesCommand({
        LanguageCode: lang,
        Engine: "neural",
      });
      const responsesListVoices = await client.send(commandListVoices);
      const voiceId =
        (Array.isArray(responsesListVoices.Voices) &&
          responsesListVoices.Voices[0].Id) ||
        "";
      const mediaString = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `I want to populate my MongoDB database. This database must contain the most important themes or topics of a place of interest. This topic or theme must be developed in depth so that it can be read later and the audios will be between 5 and 10 minutes long. For this reason, I ask you to give me back a list of the ${number} most important topics or themes of the ${place.name} place of interest.
            The structure of the objects that make up my database is as follows:
            { 
              "title": <string> (title of the theme or topic),
              "text": <string> (text between 750 and 1500 words),
              "rating": <number> (random float between 0-5 with 2 decimal places, for example: 3.67),
            }
            The answer you have to give me must be convertible into a JSON directly with the JSON.parse() function so that I can insert it directly into my database. Therefore, you only have to give me back what I ask you (without any introduction or additional text) only what I have asked you strictly.`,
          },
        ],
      });
      const mediaJSON = JSON.parse(
        mediaString.data.choices[0].message?.content || ""
      );
      Array.isArray(mediaJSON) &&
        (await Promise.all(
          mediaJSON.map(async (media) => {
            try {
              const command = new StartSpeechSynthesisTaskCommand({
                Engine: "neural",
                Text: media?.text || "",
                OutputFormat: "mp3",
                OutputS3BucketName: "xplorearpolly",
                VoiceId: voiceId,
                LanguageCode: lang,
              });
              const response = await client.send(command);
              return this.mediaService.createOne({
                ...media,
                audioUrl: response.SynthesisTask?.OutputUri,
                lang,
                placeId,
                voiceId,
              });
            } catch (error) {
              console.log("Error", error);
              throw error;
            }
          })
        ));
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }
}

export default PopulateMediaUseCase;
