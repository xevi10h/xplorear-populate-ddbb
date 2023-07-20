import PopulatePlacesDTO from "./PopulatePlacesDTO";
import PlaceService from "../PlaceService";
import { Configuration, OpenAIApi } from "openai";

class PopulatePlacesUseCase {
  constructor(private readonly placeService: PlaceService) {}

  async execute({
    place,
    placeExtra,
    number = 1,
  }: PopulatePlacesDTO): Promise<void> {
    console.log(1111);
    const configuration = new Configuration({
      organization: "org-G3bAC6e2uu42WwtJnFVz7v8Y",
      apiKey:
        process.env.OPENAI_API_KEY ||
        "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",
    });
    const openai = new OpenAIApi(configuration);
    const city = "Barcelona";
    const country = "Spain";
    let places: any[] | undefined; // Declaración de la variable places en un alcance más amplio

    try {
      const placesString = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Give me the list of the ${number} most important places of interest in ${place} separated by the character ";".`,
          },
        ],
      });

      const placesNames = placesString.data.choices[0].message?.content
        ?.split(";")
        .filter((placeName) => placeName.match(/[a-zA-Z]/) !== null);
      try {
        places = await Promise.all(
          (placesNames || [])?.map(async (name) => {
            const cleanName = name.replace(/[^a-zA-Z\s]/g, "").trim();
            const coordinatesResponse = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: `Give me the exact coordinates of the place ${cleanName}. Located in: ${city}. The format of the response must be an array [latitude, longitude]`,
                },
              ],
            });
            const coordinatesMatch =
              coordinatesResponse.data.choices[0].message?.content?.match(
                /\[([^\]]+)\]/
              );
            const coordinatesArray = (coordinatesMatch || [])[1]
              .split(",")
              .map(function (item) {
                return parseFloat(item.trim());
              });
            const descriptionResponse = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: `Give me a short 200-character description of this place:${cleanName} Located in this city:${city}`,
                },
              ],
            });
            return {
              name: cleanName,
              address: {
                coordinates: {
                  lat: coordinatesArray[0],
                  lng: coordinatesArray[1],
                },
                city,
                country,
              },
              description: descriptionResponse.data.choices[0].message?.content,
            };
          })
        );
        console.log(places);
      } catch (err) {
        console.log(err);
      }

      console.log(places);
    } catch (error) {
      console.log("Error", error);
      throw error;
    }

    Array.isArray(places) &&
      (await Promise.all(
        places.map(async (place) => this.placeService.createPlace(place))
      ));
  }
}

export default PopulatePlacesUseCase;
