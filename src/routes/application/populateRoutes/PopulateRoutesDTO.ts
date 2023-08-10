export default interface PopulateRoutesDto {
  place: string; // Normally will be the city, zone or neighborhood
  topic?: string;
  stops?: number; // The number of new we want to add (1 if not specified)
  days?: number;
  number?: number;
}
