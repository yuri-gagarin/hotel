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

export const setAxiosError = (err) => {
  const { status, data, statusText } = err.response;
  const errorMessages = [];

  if (data.responseMsg && data.error) {
    const errorObj = data.error;
    for (const property in errorObj) {
      errorMessages.push(errorObj[property]);
    }
    return {
      status: status,
      responseMsg: data.responseMsg,
      errorMessages: errorMessages,
      error: err
    };
  } else {
    return {
      status: status,
      responseMsg: "General error",
      errorMessages: [],
      error: new Error("Something went wrong")
    };
  }
};