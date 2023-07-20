import Media from "../models/Media";

export default interface MediaRepository {
  create(media: Media): Promise<void>;
  getById(id: string): Promise<Media | null | undefined>;
  getAll(): Promise<Media[]>;
  save(media: Media): Promise<void>;
  delete(id: string): Promise<void>;
}
