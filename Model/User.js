const fileSystem = require('../config/fileManager');
const filePath = './data/user.json';

const User = {

    async login(email, password) {
        const userList = await fileSystem.readFile(filePath);
        return userList[email].password === password;
    },

    logout(userId) {},

    async signup(email, password, nickname) {
        const userList = await fileSystem.readFile(filePath);
        userList[email] = {password, nickname};
        await fileSystem.saveFile(filePath, userList);
        return 1;
    },

    async signout(email) {
        const userList = await fileSystem.readFile(filePath);
        delete userList[email];
        await fileSystem.saveFile(filePath, userList);
    },

    async updateNickname(email, nickname) {
        const userList = await fileSystem.readFile(filePath);
        userList[email].nickname = nickname;
        await fileSystem.saveFile(filePath, userList);
        return 1;
    },
    async updatePassword(email, password) {
        const userList = await fileSystem.readFile(filePath);
        userList[email].nickname = password;
        await fileSystem.saveFile(filePath, userList);
        return 1;
    },

};


module.exports = User;
// export default User;