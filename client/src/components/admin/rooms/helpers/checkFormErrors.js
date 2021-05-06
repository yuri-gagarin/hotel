// @flow
import type { LocalFormState } from "../RoomForm";
export type FormValidationResponse = {
  valid: boolean,
  errors: Array<string>,
  warnings: Array<string>
}
export const checkFormErrors = (data : LocalFormState): FormValidationResponse => {
  const { roomType, area, sleeps, price, twinBeds, queenBeds, kingBeds, couches, description } = data;
  const response: FormValidationResponse = {
    valid: true,
    errors: [],
    warnings: []
  };

  if (!roomType) {
    response.errors.push("Room type is required");
  }
  if (!area) {
    response.errors.push("Room area is required");
  } 
  if (!sleeps) {
    response.errors.push("'Sleeps' number is required");
  }
  if (!price) {
    response.warnings.push("Price 'from' not specified");
  }
  if (!twinBeds) {
    response.errors.push("Number of 'Twin' beds not specified");
  }
  if (!queenBeds) {
    response.errors.push("Number of 'Queen' beds not specified");
  }
  if (!kingBeds) {
    response.errors.push("Number of 'King' beds not specified");
  }
  if (!couches) {
    response.errors.push("Number of couches is required");
  }
  if (!description) {
    response.errors.push("Short room description is required");
  }

  return response.errors.length > 0 ? { ...response, valid: false } : { ...response, valid: true };
};
