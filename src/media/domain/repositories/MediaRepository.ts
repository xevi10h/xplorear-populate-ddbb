import Media from "../models/Media";

export default interface MediaRepository {
  create(media: Media): Promise<Media>;
  getById(id: string): Promise<Media | null | undefined>;
  getByPlaceId(placeId: string, lang?: string): Promise<Media[]>;
  getAll(): Promise<Media[]>;
  save(media: Media): Promise<void>;
  delete(id: string): Promise<void>;
}
