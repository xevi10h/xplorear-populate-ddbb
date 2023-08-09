import Media from "../models/Media";

export default interface MediaRepository {
  create(media: Media): Promise<void>;
  get(filter: any): Promise<Media[]>;
  getById(id: string): Promise<Media | null | undefined>;
  getAll(): Promise<Media[]>;
  getByPlaceId(placeId: string, lang?: string): Promise<Media[]>;
  save(media: Media): Promise<void>;
  delete(id: string): Promise<void>;
}
