const fileSystem = require('../config/fileManager');
const filePath = './data/user.json';

const User = {

    // 토큰, 세션이 없으니까 유저 이메일 전달
    // 이후 DB 연결 및 토큰 완성하면 userId or Token 전달로 변경하기!!
    async login(email, password) {
        console.log("login !! : " + email);
        const userList = await fileSystem.readFile(filePath);
        const result = !!(userList[email] && userList[email].password === password);
        console.log("result : " + result);
        return result;
    },

    logout(userId) {}, // 이후 토큰, 세션 인증인가시 구현!

    async signup(email, password, nickname) {
        const userList = await fileSystem.readFile(filePath);
        userList[email] = {password, nickname};
        await fileSystem.saveFile(filePath, userList);
        return email;
    },

    async signout(email) {
        const userList = await fileSystem.readFile(filePath);
        delete userList[email];
        await fileSystem.saveFile(filePath, userList);
        return 1;
    },

    async getNickname(email) {
        const userList = await fileSystem.readFile(filePath);
        return userList[email].nickname;
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

    async addUserInfo(board) {
        const userList = (await fileSystem.readFile(filePath, 'utf8'));

        const userEmail = board.email;
        const userNickname = userList[userEmail]?.nickname;

        if (userNickname) board.nickname = userNickname;

        for (const commentKey in board.comment) {
            const commentEmail = board.comment[commentKey].email;
            const commentNickname = userList[commentEmail]?.nickname;
            if (commentNickname) board.comment[commentKey].nickname = commentNickname;

            return board;
        }
    }
};


module.exports = User;
// export default User;