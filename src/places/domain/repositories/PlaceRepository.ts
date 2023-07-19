import Place from "../models/Place";

export default interface PlaceRepository {
  create(place: Place): Promise<void>;
  getById(id: string): Promise<Place | null | undefined>;
  getAll(): Promise<Place[]>;
  save(place: Place): Promise<void>;
  delete(id: string): Promise<void>;
}
