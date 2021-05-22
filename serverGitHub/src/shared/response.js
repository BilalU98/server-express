const response = (res, statusCode, data, options = "") => {
  if (options) {
    res.status(statusCode).json({
      status: "success",
      options,
      data,
    });
  } else {
    res.status(statusCode).json({
      status: "success",
      data,
    });
  }
};

export default response;
