import IAddress from "../../domain/interfaces/IAddress";
import { MongoPlaceModel } from "../mongoModel/MongoPlaceModel";
import IPlace from "../../domain/interfaces/IPlace";
import PopulatePlacesByZoneUseCase from "../../application/PopulatePlacesByZoneUseCase";
import PopulatePlacesByNameUseCase from "../../application/PopulatePlaceByNameUseCase";

interface PopulatePlaceByNameInput {
  populatePlaceByNameInput: {
    name: string;
    addMedia?: boolean;
  };
}

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
    imagesUrl: (parent: IPlace) => parent.photos?.map((photo) => photo.url),
  },
  Mutation: {
    populatePlaceByZone: async (
      parent: any,
      args: { zone: string; number?: number }
    ) =>
      PopulatePlacesByZoneUseCase({
        zone: args.zone,
        number: args.number,
      }),

    populatePlaceByName: async (
      parent: any,
      args: { name: string; addMedia?: boolean }
    ) =>
      PopulatePlacesByNameUseCase({
        name: args.name,
        addMedia: args.addMedia,
      }),

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
      args: { id: string; data: Partial<IPlace> }
    ) => {
      return MongoPlaceModel.findOneAndUpdate({ _id: args.id }, args.data);
    },
    deletePlace: async (parent: any, args: { id: string }) => {
      return MongoPlaceModel.deleteOne({ _id: args.id });
    },
  },
};

export default resolvers;
