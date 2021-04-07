// @flow 
export type FormValidationResponse = {
  valid: boolean,
  errors: Array<string>
}
export const checkFormErrors = (data : { title?: string, hours?: string, description?: string }): FormValidationResponse => {
  const { title, hours, description } = data;
  const response: FormValidationResponse = {
    valid: true,
    errors: []
  };

  if (!title) {
    response.valid = false;
    response.errors.push("Title is required");
  }
  if (!hours) {
    response.valid = false;
    response.errors.push("Hours are required");
  } 
  if (!description) {
    response.valid = false;
    response.errors.push("Description is required");
  }

  return response;
}