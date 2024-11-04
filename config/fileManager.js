const fs = require('fs').promises;
const fileSystem = require('fs');
const ERROR = require("../util/myError");

module.exports.readFile = async (path) => {
    if (!fileSystem.existsSync('./data')) fileSystem.mkdirSync('./data');
    if (!fileSystem.existsSync(path)) fileSystem.writeFileSync(path, "{}");

    const data = await fs.readFile(path, 'utf8');
    console.log("read data : " + data);
    return JSON.parse(data);
}

module.exports.saveFile = async (path, fileData) => {
    console.log("save data : " + JSON.stringify(fileData));
    await fs.writeFile(path, JSON.stringify(fileData), 'utf8');
}