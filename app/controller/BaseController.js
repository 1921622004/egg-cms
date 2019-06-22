const { Controller } = require('egg');

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: '200',
      success: true,
      ...data
    }
  }

  error(data) {
    this.ctx.body = {
      success: false,
      ...data
    }
  }

  async index() {
    const { ctx, service } = this;
    let { pageNum, pageSize, ...where } = ctx.query;
    let users = await service[this.entity].list(
      isNaN(pageNum) ? 1 : parseInt(pageNum),
      isNaN(pageSize) ? 20 : parseInt(pageSize),
      where
    );
    this.success(users);
  }

  async create() {
    const { ctx, service } = this;
    let user = ctx.request.body;
    let res = await service[this.entity].create(user);
    res ? this.success(res): this.error({ message: '创建失败' });
  }

  async update() {
    const { ctx, service } = this;
    let id = ctx.params.id;
    let user = ctx.request.body;
    user.id = id;
    let res = await service[this.entity].update(user);
    res ? this.success(res) : this.error({ message: '更新失败' });
  }

  async destroy() {
    const { ctx, service } = this;
    let id = ctx.params.id;
    let res = await service[this.entity].destroy(id);
    res ? this.success(res) : this.error({ message: '删除失败' });
  }
}

module.exports = BaseController;