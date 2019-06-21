const { Service } = require('egg');

class UserService extends Service {
  async list(pageNum, pageSize, where) {
    console.log('=====',where);
    
    const list = await this.app.mysql.select(this.entity, {
      where,
      order: [['id', 'asc']],
      offset: (pageNum - 1) * pageNum,
      limit: pageSize
    });
    const total = await this.app.mysql.count(this.entity, where);
    return { list, total }
  }
  async create(user) {
    return await this.app.mysql.insert(this.entity, user);
  }
  async update(user) {
    return await this.app.mysql.update(this.entity, user);
  }
  async destroy(id) {
    return await this.app.mysql.delete(this.entity, { id });
  }
}

module.exports = UserService;