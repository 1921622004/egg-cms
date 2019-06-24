const BaseService = require('./baseService');

class UserService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.entity = 'user';
  }

  async signup(user) {
    const result = await this.app.mysql.insert('user', user);
    if (result.affectedRows > 0) {
      return {
        userId: result.insertId
      }
    } else {
      return false
    }
  }

  async login(username, password) {
    return await this.app.mysql.select('user', {
      where: {username, password},
      limit: 1
    });
  }

}

module.exports = UserService;