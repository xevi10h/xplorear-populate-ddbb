import Place from "../models/Place";

export default interface PlaceRepository {
  getById(id: string): Promise<Place | null | undefined>;
  getAll(): Promise<Place[]>;
}
