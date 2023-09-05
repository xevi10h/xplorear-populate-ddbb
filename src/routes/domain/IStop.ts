import IMedia from "../../medias/domain/IMedia";

export default interface IStop {
  order: number;
  optimizedOrder: number;
  media: IMedia;
}
