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

  async getMediaByIds(mediaIds: string[]): Promise<Media[]> {
    return this.mediaRepository.get({ _id: { $in: mediaIds } });
  }

  async getAllMedia(): Promise<Media[]> {
    return this.mediaRepository.getAll();
  }
}

export default MediaService;
