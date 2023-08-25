import Place from "../../domain/models/Place";
import IAddress from "../../domain/models/interfaces/IAddress";
import { MongoPlaceModel } from "../mongoModel/MongoPlaceModel";

const resolvers = {
  Query: {
    place: async (parent: any, args: { id: string }) => {
      return MongoPlaceModel.findById(args.id);
    },
    places: async () => {
      return MongoPlaceModel.find();
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
      const place = new MongoPlaceModel({
        name: args.name,
        address: args.address,
        description: args.description,
        importance: args.importance,
        rating: args.rating,
      });
      return place.save();
    },
    updatePlace: async (
      parent: any,
      args: { id: string; data: Partial<Place> }
    ) => {
      return MongoPlaceModel.findOneAndUpdate({ _id: args.id }, args.data);
    },
    deletePlace: async (parent: any, args: { id: string }) => {
      return MongoPlaceModel.deleteOne({ _id: args.id });
    },
  },
};

export default resolvers;
