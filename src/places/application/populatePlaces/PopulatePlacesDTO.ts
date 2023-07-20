export default interface PopulatePlacesDto {
  place: string; // Normally will be the city
  placeExtra?: string; // Normally will be a specific zone or neighborhood
  number?: number;
}
