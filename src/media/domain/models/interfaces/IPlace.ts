import Address from "../valueObjects/Address";

export default interface IPlace {
  id?: string;
  name: string;
  address: Address;
  description: string;
  importance: number;
  rating?: number;
}
