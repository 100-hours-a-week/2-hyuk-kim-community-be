class User {
    constructor({ user_id, email, password, nickname, profile}) {
        this.user_id = user_id;
        this.email = user_id;
        this.password = user_id;
        this.nickname = nickname;
        this.profile = profile;
    }

    static fromDatabase(rows) {
        return rows.map(row => new User(row));
    }
}

// export const userModel = User;