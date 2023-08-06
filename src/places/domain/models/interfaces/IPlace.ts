import Address from "../valueObjects/Address";
import IPhoto from "./IPhoto";

export default interface IPlace {
  id?: string;
  name: string;
  address: Address;
  description: string;
  importance: number;
  photos?: IPhoto[];
  rating?: number;
}
