import IAddress from "../../domain/models/interfaces/IAddress";
import IPlace from "../../domain/models/interfaces/IPlace";
import MongoPlaceRepository from "../repositories/MongoPlaceRepository";
import Place from "../../domain/models/Place";
import { MongoPlaceModel } from "../mongoModel/MongoPlaceModel";
const mongoPlaceRepository = new MongoPlaceRepository(MongoPlaceModel);

const resolvers = {
  Query: {
    place: async (parent: any, args: { id: string }) => {
      return mongoPlaceRepository.getById(args.id);
    },
    places: async () => {
      return mongoPlaceRepository.getAll();
    },
  },
  Place: {
    // Resolver para el campo imagesUrl
    imagesUrl: (parent: Place) => parent.photos?.map((photo) => photo.url),
  },
  Mutation: {
    createPlace: async (
      parent: any,
      args: {
        name: string;
        address: IAddress;
        description: string;
        importance: number;
        rating?: number;
      }
    ) => {
      const place = new Place({
        name: args.name,
        address: args.address,
        description: args.description,
        importance: args.importance,
        rating: args.rating,
      });
      return mongoPlaceRepository.create(place);
    },
    updatePlace: async (
      parent: any,
      args: { id: string; data: Partial<Place> }
    ) => {
      return mongoPlaceRepository.updateById(args.id, args.data);
    },
    deletePlace: async (parent: any, args: { id: string }) => {
      return mongoPlaceRepository.delete(args.id);
    },
  },
};

export default resolvers;
