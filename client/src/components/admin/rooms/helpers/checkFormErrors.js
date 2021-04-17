// @flow
import type { LocalFormState } from "../RoomForm";
export type FormValidationResponse = {
  valid: boolean,
  errors: Array<string>
}
export const checkFormErrors = (data : LocalFormState): FormValidationResponse => {
  const { roomType, area, sleeps, price, beds, couches, description } = data;
  const response: FormValidationResponse = {
    valid: true,
    errors: []
  };

  if (!roomType) {
    response.valid = false;
    response.errors.push("Room type is required");
  }
  if (!area) {
    response.valid = false;
    response.errors.push("Room area is required");
  } 
  if (!sleeps) {
    response.valid = false;
    response.errors.push("'Sleeps' number is required");
  }
  if (!price) {
    response.valid = false;
    response.errors.push("Price 'from' is required");
  }
  if (!beds) {
    response.valid = false;
    response.errors.push("Number of beds is required");
  }
  if (!couches) {
    response.valid = false;
    response.errors.push("Number of couches is required");
  }
  if (!description) {
    response.valid = false;
    response.errors.push("Short room description is required");
  }

  return response;
};
