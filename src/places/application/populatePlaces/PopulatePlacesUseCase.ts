import PopulatePlacesDTO from "./PopulatePlacesDTO";
import PlaceService from "../PlaceService";
import { Configuration, OpenAIApi } from "openai";

class PopulatePlacesUseCase {
  constructor(private readonly placeService: PlaceService) {}

  async execute({ place, number = 1 }: PopulatePlacesDTO): Promise<void> {
    const configuration = new Configuration({
      organization: "org-G3bAC6e2uu42WwtJnFVz7v8Y",
      apiKey:
        process.env.OPENAI_API_KEY ||
        "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",
    });
    const openai = new OpenAIApi(configuration);
    try {
      const placesString = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `I want to populate my MongoDB database. This database has to contain the most important places of interest in a zone, neighborhood, city, region or country. For this reason, I ask you to return me a list of the ${number} most important monuments or places of interest of the region/zone ${place}.
            The structure of the objects that compose my database is the following:
            {
              "name": <string> (name of the place of interest),
              "address": {
                "coordinates": {
                  "lat": <number>,
                  "lng": <number>
                },
                "street": <string>,
                "city": <string>,
                "postalCode": <string>,
                "province": <string>,
                "country": <string>,
              },
              "importance": <number> (integer between 0-10 specifing the importance of the monument in the city),
              "rating": <number> (random float between 0-5 with 2 decimal places, for example: 3.67),
              "description": <string> (Summary description of the monument of about 200 characters approximately)
            }
            The answer you have to give me must be convertible into a JSON directly with the JSON.parse() function so that I can insert it directly into my database. Therefore, you only have to give me back what I ask you (without any introduction or additional text) only what I have asked you strictly.`,
          },
        ],
      });
      const placesJSON = JSON.parse(
        placesString.data.choices[0].message?.content || ""
      );
      Array.isArray(placesJSON) &&
        (await Promise.all(
          placesJSON.map(async (place) => this.placeService.createPlace(place))
        ));
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }
}

export default PopulatePlacesUseCase;
