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
    const res = await this.app.mysql.select('user', {
      where: {username, password}
    });
    return res && res.length > 0 
  }

}

module.exports = UserService;