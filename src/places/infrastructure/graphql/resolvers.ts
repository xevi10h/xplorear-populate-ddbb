import IPlace from "../../domain/interfaces/IPlace";
import PopulatePlacesByZoneUseCase from "../../application/PopulatePlacesByZoneUseCase";
import PopulatePlacesByNameUseCase from "../../application/PopulatePlaceByNameUseCase";
import GetPlaceByIdUseCase from "../../application/GetPlaceByIdUseCase";
import GetAllPlacesUseCase from "../../application/GetAllPlacesUseCase";
import DeletePlaceAndAssociatedMediaUseCase from "../../application/DeletePlaceAndAssociatedMediaUseCase";
import UpdatePlaceUseCase from "../../application/UpdatePlaceUseCase";

const resolvers = {
  Place: {
    // Resolver para el campo imagesUrl
    imagesUrl: (parent: IPlace) => parent.photos?.map((photo) => photo.url),
  },
  Query: {
    getPlaceById: (_: any, { id }: { id: string }) => GetPlaceByIdUseCase(id),
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
      _: any,
      { id, placeUpdate }: { id: string; placeUpdate: Partial<IPlace> }
    ) => UpdatePlaceUseCase(id, placeUpdate),
    deletePlace: (_: any, { id }: { id: string }) =>
      DeletePlaceAndAssociatedMediaUseCase(id),
  },
};

export default resolvers;
