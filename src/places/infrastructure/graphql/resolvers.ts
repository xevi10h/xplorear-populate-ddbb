import IPlace from "../../domain/interfaces/IPlace";
import PopulatePlacesByZoneUseCase from "../../application/PopulatePlacesByZoneUseCase";
import PopulatePlacesByNameUseCase from "../../application/PopulatePlaceByNameUseCase";
import GetPlaceByIdUseCase from "../../application/GetPlaceByIdUseCase";
import GetAllPlacesUseCase from "../../application/GetAllPlacesUseCase";
import DeletePlaceAndAssociatedMediaUseCase from "../../application/DeletePlaceAndAssociatedMediaUseCase";
import UpdatePlaceAndAssociatedMediaUseCase from "../../application/UpdatePlaceAndAssociatedMediaUseCase";

const resolvers = {
  Place: {
    // Resolver para el campo imagesUrl
    imagesUrl: (parent: IPlace) => parent.photos?.map((photo) => photo.url),
  },
  Query: {
    getPlaceById: (_: any, args: { id: string }) =>
      GetPlaceByIdUseCase(args.id),
    getAllPlaces: () => GetAllPlacesUseCase(),
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
    updatePlace: (
      parent: any,
      args: { id: string; placeUpdate: Partial<IPlace> }
    ) => UpdatePlaceAndAssociatedMediaUseCase(args.id, args.placeUpdate),
    deletePlace: (parent: any, args: { id: string }) =>
      DeletePlaceAndAssociatedMediaUseCase(args.id),
  },
};

export default resolvers;
