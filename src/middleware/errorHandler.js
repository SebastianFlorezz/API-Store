const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
            error: "Validation error",
            details: err.errors.map(e => ({ field: e.path, message: e.message }))
        });
    }

    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
            error: "Resource already exists",
            details: err.errors.map(e => ({ field: e.path, message: e.message }))
        });
    }

    const status = err.status || 500;
    const message = process.env.NODE_ENV === "production" 
        ? (status === 500 ? "Internal server error" : err.message)
        : err.message;

    res.status(status).json({ error: message });
};

module.exports = errorHandler;
