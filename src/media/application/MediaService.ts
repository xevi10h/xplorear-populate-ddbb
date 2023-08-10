import Media from "../domain/models/Media";
import MediaRepository from "../domain/repositories/MediaRepository";

class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async createOne(media: Media): Promise<Media> {
    return this.mediaRepository.create(media);
  }
  async getMediaById(mediaId: string): Promise<Media | null | undefined> {
    return this.mediaRepository.getById(mediaId);
  }

  async getMediaByPlaceId(placeId: string): Promise<Media[]> {
    return this.mediaRepository.getByPlaceId(placeId);
  }
}

export default MediaService;
