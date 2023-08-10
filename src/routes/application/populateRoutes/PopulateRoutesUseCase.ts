import PopulateRoutesDTO from "./PopulateRoutesDTO";
import RouteService from "../RouteService";
import { Configuration, OpenAIApi } from "openai";
import IRoute from "../../domain/models/interfaces/IRoute";
import PlaceService from "../../../places/application/PlaceService";
import PopulatePlaceByNameUseCase from "../../../places/application/populatePlaceByName/PopulatePlaceByNameUseCase";
import MediaService from "../../../media/application/MediaService";
import PopulateMediaByTopicUseCase from "../../../media/application/populateMediaByTopic/PopulateMediaByTopicUseCase";
import Route from "../../domain/models/Route";
import { Types } from "mongoose";

interface RouteJson {
  title: string;
  description: string;
  rating: number;
  stops: Array<{
    name: string;
  }>;
}

class PopulateRoutesUseCase {
  constructor(
    private readonly routeService: RouteService,
    private readonly placeService: PlaceService,
    private readonly mediaService: MediaService
  ) {}

  async execute({
    place,
    topic,
    stops = 10,
    days = 1,
    number = 2,
  }: PopulateRoutesDTO): Promise<void> {
    try {
      const configuration = new Configuration({
        organization: process.env.OPENAI_ORGANIZATION_ID || "",
        apiKey: process.env.OPENAI_API_KEY || "",
      });
      const openai = new OpenAIApi(configuration);
      const routesString = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `I want to populate my MongoDB database. This database has to contain routes with the most important places of interest in a zone, neighborhood, city, region or country. For this reason, I ask you to return me a list of ${number} possible routes related with the following topic: ${topic}. So it must be an array! The routes must have ${stops} stops that are monuments or places of interest to visit of the region/zone ${place}.
            The structure of the objects that compose my database is the following:
            {
              "title": <string> (name of the route, should be a bit inspirational),
              "description": <string> (Summary description of the route of about 200 characters approximately),
              "rating": <number> (random float between 0-5 with 2 decimal places, for example: 3.67),
              "stops": Array<{"name": <string> (name of the place of interest)}> (it must be an array whit ${stops} elements and none of them can be repeated)
            }
            The answer you have to give me must be convertible into a JSON directly with the JSON.parse() function so that I can insert it directly into my database. Therefore, you only have to give me back what I ask you (without any introduction or additional text) only what I have asked you strictly.`,
          },
        ],
      });
      const routesJSON = JSON.parse(
        routesString.data.choices[0].message?.content || ""
      );
      Array.isArray(routesJSON) &&
        (await Promise.all(
          routesJSON.map(async (route: RouteJson) => {
            if (Array.isArray(route.stops)) {
              const mediaIds = await Promise.all(
                route.stops.map(async (stop) => {
                  let place = await this.placeService.getPlaceByName(stop.name);
                  if (!place) {
                    // Si no existe el Place lo creamos desde 0 y le añadimos 10 audios
                    const populatePlaceByNameUseCase =
                      new PopulatePlaceByNameUseCase(
                        this.placeService,
                        this.mediaService
                      );
                    place = await populatePlaceByNameUseCase.execute({
                      name: stop.name,
                    });
                  }
                  // En caso que exista miramos si tiene 3 o más audios y si no creamos 1 y lo devolvemos.
                  const media = await this.mediaService.getMediaByPlaceId(
                    place._id.toString()
                  );
                  if (media.length < 3) {
                    const populateMediaByTopicUseCase =
                      new PopulateMediaByTopicUseCase(
                        this.mediaService,
                        this.placeService
                      );
                    const newMedia = await populateMediaByTopicUseCase.execute({
                      placeId: place._id.toString(),
                      topic,
                    });
                    return newMedia._id;
                  }
                  const placeMedia = await this.mediaService.getMediaByPlaceId(
                    place._id.toString()
                  );
                  if (!topic) {
                    // Si no hay un topico específico quiero que me eliga el primer placeMedia
                    return placeMedia[0]._id;
                  }
                  const mediaSelectedString = await openai.createChatCompletion(
                    {
                      model: "gpt-3.5-turbo",
                      messages: [
                        {
                          role: "user",
                          content: `I want to populate my MongoDB database. What I want you to do is to send me back the object from this array that I am going to send you that best suits my needs.
                          My data is all this array: ${placeMedia.toString()}
                          I want you to choose the object whose title, description and text fit best with the theme or topic: ${topic}
                          The answer you have to give me must be convertible into a JSON directly with the JSON.parse() function so that I can insert it directly into my database. Therefore, you only have to give me back what I ask you (without any introduction or additional text) only what I have asked you strictly.`,
                        },
                      ],
                    }
                  );
                  const mediaSelectedJSON = JSON.parse(
                    mediaSelectedString.data.choices[0].message?.content || ""
                  );
                  if (mediaSelectedJSON && mediaSelectedJSON.title) {
                    const mediaSelected = placeMedia.find(
                      (pM) => pM.title === mediaSelectedJSON?.title
                    );
                    if (mediaSelected) return mediaSelected._id;
                    return undefined;
                  }
                  return undefined;
                })
              );
              await this.routeService.createOne(
                new Route({
                  title: route.title,
                  description: route.description,
                  mediaIds: mediaIds.filter(
                    (id): id is Types.ObjectId => id !== undefined
                  ),
                  rating: route.rating,
                })
              );
            }
          })
        ));
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }
}

export default PopulateRoutesUseCase;
