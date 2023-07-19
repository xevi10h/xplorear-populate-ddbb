import Address from "../valueObjects/Address";
import Name from "../valueObjects/Name";

export default interface IPlace {
  id: string;
  name: string;
  address: Address;
  value: number;
  types: string[];
}
