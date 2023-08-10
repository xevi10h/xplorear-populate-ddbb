import Place from "../models/Place";

export default interface PlaceRepository {
  create(place: Place): Promise<Place>;
  getById(id: string): Promise<Place | null | undefined>;
  getByName(name: string): Promise<Place | null | undefined>;
  getAll(): Promise<Place[]>;
  save(place: Place): Promise<void>;
  delete(id: string): Promise<void>;
  updateById(
    _id: string,
    update: Partial<Place>
  ): Promise<Place | null | undefined>;
}
