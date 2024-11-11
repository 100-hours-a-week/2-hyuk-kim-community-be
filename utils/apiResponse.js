function apiResponse(res, code, message, data = {}) {
    res.status(code).json({
        code,
        message,
        data
    });

    res.json(myError);
}

module.exports = apiResponse;