// Об'єкт помилок зі статусом 400
const messageErrorList = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
};
const HttpError = (status, message = messageErrorList[status]) => {
    // Function HttpError створює помилку в потрібним message
    const error = new Error(message);
    // Додає до помилки статус
    error.status = status;
    return error;
};

export default HttpError;
