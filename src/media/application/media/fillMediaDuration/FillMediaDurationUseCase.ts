import MediaService from "../MediaService";
import FillMediaDurationDto from "./FillMediaDurationDTO";
import MediaNotFoundError from "../../../domain/exceptions/MediaNotFoundError";
import {
  S3Client,
  GetObjectAttributesCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3"; // ES Modules import
import * as deepl from "deepl-node";
import { DescribeVoicesCommand } from "@aws-sdk/client-polly";

class FillMediaDurationUseCase {
  constructor(private readonly mediaService: MediaService) {}
  async execute({ mediaIds }: FillMediaDurationDto): Promise<void> {
    // const medias = mediaIds
    //   ? await this.mediaService.getMediaByIds(mediaIds)
    //   : await this.mediaService.getAllMedia();
    try {
      const client = new S3Client({
        region: "eu-west-1",
      });

      const go = new GetObjectAttributesCommand({
        Bucket: "xplorearpolly",
        Key: "64cf6f314eb71bfefe83126d/en-US/.a5b8cde3-24e9-4f5c-9c03-7f37b16c0f23.mp3",
        ObjectAttributes: [
          "Checksum",
          "ETag",
          "ObjectParts",
          "ObjectSize",
          "StorageClass",
        ],
      });

      console.log(go);
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }
}

export default FillMediaDurationUseCase;
