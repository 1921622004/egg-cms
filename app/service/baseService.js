const { Service } = require('egg');

class UserService extends Service {
  async list(pageNum, pageSize, where) {
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
    const res = await this.app.mysql.insert(this.entity, user);
    return res.affectedRows > 0
  }
  async update(user) {
    const res= await this.app.mysql.update(this.entity, user);
    return res.affectedRows > 0
  }
  async destroy(id) {
    const res = await this.app.mysql.delete(this.entity, { id });
    return res.affectedRows > 0
  }
}

module.exports = UserService;