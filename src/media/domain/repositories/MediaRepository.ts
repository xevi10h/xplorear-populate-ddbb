import Media from "../models/Media";

export default interface MediaRepository {
  create(media: Media): Promise<void>;
}
