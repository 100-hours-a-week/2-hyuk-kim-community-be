class CustomSuccess {
  constructor(message, statusCode, data = {}) {
    this.message = message;
    this.statusCode = statusCode || 200;
    this.data = data;
  }
}

class OK extends CustomSuccess {
  constructor(message = "Success", data) {
    super(message, 200, data);
  }
}

class Created extends CustomSuccess {
  constructor(message = "Created", data) {
    super(message, 201, data);
  }
}

module.exports = {
  OK,
  Created,
};
