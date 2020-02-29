export const normalizeErrorMessages = (data) => {
  // assumes an error object from the server //
  const errorMessages = [];
  if (data.error || (typeof data.error === "object")) {
    const errorObj = data.error;
    for (const property in errorObj) {
      errorMessages.push(errorObj[property]);
    }
  }
  console.log(errorMessages);
  return errorMessages;
};