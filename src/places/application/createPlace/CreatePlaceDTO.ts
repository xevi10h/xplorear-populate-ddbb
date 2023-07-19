import Address from "../../domain/models/valueObjects/Address";
import Name from "../../domain/models/valueObjects/Name";

export default interface CreatePlaceDto {
  id: string;
  name: string;
  value: number;
  address: Address;
  types: string[];
}
