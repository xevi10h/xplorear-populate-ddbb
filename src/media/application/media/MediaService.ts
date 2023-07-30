import Media from "../../domain/models/Media";
import MediaRepository from "../../domain/repositories/MediaRepository";

class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async createOne(media: Media): Promise<void> {
    await this.mediaRepository.create(media);
  }
  async getMediaById(mediaId: string): Promise<Media | null | undefined> {
    return this.mediaRepository.getById(mediaId);
  }
}

export default MediaService;
