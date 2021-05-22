import AppError from "./AppError.js";

const handleCastError = (err) => {
  // handle mongoose error when get invalid id
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateKey = (err) => {
  // handle mongoose error when get duplicate uneque feilds

  const getKey = err.message.match(/(?<=\").*?(?=\")/g);

  const message = `this { ${getKey[0]} } is already exist, try another one`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  // handle mongoose error when get validation errors from schema
  const values = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");

  return new AppError(values, 400);
};

const handleJWTError = () =>
  new AppError(" invalid token, please login again. !", 401);

const TokenJWTExpiredError = () =>
  new AppError(" invalid expired token, please login again. !", 401);

// errors for node developer
const errorDev = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// errors for clients developers
const errorProd = (res, err) => {
  // errors is expected : invalid id ....
  // operational errors ;
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // errors not expected
  } else {
    // this will log in host platform like heruko
    console.error("ERROR 💥 : ", err);
    // this is genaric error "not excpected "
    res.status(500).json({
      status: "error",
      message: "somethig went wrong!",
    });
  }
};

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "dev") {
    errorDev(res, err);
  } else if (process.env.NODE_ENV === "prod") {
    let error = { ...err };
    console.log(err.message);
    if (err.name === "CastError") {
      error = handleCastError(error);
    }

    if (err.code === 11000) {
      error.message = err.message;
      error = handleDuplicateKey(error);
    }

    if (err.name === "ValidationError") {
      error = handleValidationError(error);
    }

    if (err.name === "JsonWebTokenError") {
      error = handleJWTError();
    }

    if (err.name === "TokenExpiredError") {
      error = TokenJWTExpiredError();
    }

    errorProd(res, error);
  }
};

export default globalError;
