// @flow
import type { ClientServiceFormData } from "../../../../redux/reducers/service/flowTypes";

export type FormValidationResponse = {
  valid: boolean,
  errors: Array<string>
};

export const serviceFormValidator = (clientFormData: ClientServiceFormData): FormValidationResponse => {
  const { serviceType, price, hours, description } = clientFormData;
  const errors: Array<string> = [];

  if (!serviceType) {
    errors.push("Please enter a Service type.");
  }
  if (!price) {
    errors.push("Please enter a Service price.");
  }
  if (!hours) {
    errors.push("Please enter Service hours.");
  }
  if (!description) {
    errors.push("Please enter a Service description.");
  }

  return errors.length > 0 ? { valid: false,  errors: errors } : { valid: true, errors: errors };
};