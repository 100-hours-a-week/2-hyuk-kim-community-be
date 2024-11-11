const dateManager = require("./dateManager");

module.exports.success = (req, res, response) => {
    console.log(`info!! : [${dateManager.getCurrentFormattedDate()}] ${req.method} ${req.originalUrl} - Status: ${response.code}, Message: ${response.message}`);
    res.status(response.code).json({ message: response.message, data: response.data || {} });
};

module.exports.error = (req, res, response) => {
    console.log(`error!! : [${dateManager.getCurrentFormattedDate()}] ${req.method} ${req.originalUrl} - Status: ${response.code}, Message: ${response.message}`);
    res.status(response.code).json({ message: response.message });
};

