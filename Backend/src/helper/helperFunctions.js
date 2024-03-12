
export const notAuthorized = (res, message) => {
    return res.status(401).json({ message: message });
}
export const sendBadRequest = (res, message) => {
    return res.status(400).json({ message: message });
}

export const sendNotFound = (res, message) => {
    return res.status(404).json({ message: message });
}

export const sendCreated = (res, message) => {
    return res.status(201).json({ message: message });
}
export const sendDeleteSuccess = (res, message) => {
    return res.status(200).json({ message: message });
    
}
// Send success
export const sendSuccess = (res, message) => {
    return res.status(200).json({ message: message });
  };
  
export const sendServerError = (res, message) => {
    return res.status(500).json({ message: message });
}
export const checkIfValuesIsEmptyNullUndefined = (req, res, obj) => {
    for (let key in obj) {
      if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
        return false;
      }
    }
    return true;
  };