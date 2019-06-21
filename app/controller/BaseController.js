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
    this.success(res);
  }

  async update() {
    const { ctx, service } = this;
    let id = ctx.params.id;
    let user = ctx.request.body;
    user.id = id;
    let res = await service[this.entity].update(user);
    this.success(res);
  }

  async destroy() {
    const { ctx, service } = this;
    let id = ctx.params.id;
    let res = await service[this.entity].destroy(id);
    this.success(res);
  }
}

module.exports = BaseController;