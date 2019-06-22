const BaseController = require('./BaseController');

class RoleController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.entity = 'role';
  }

  async getResource() {
    const { service } = this;
    const result = await service.role.getResource();
    this.success({ data: result })
  }

  async setResource() {
    const { ctx, service } = this;
    const { roleId, resourceIds } = ctx.request.body;
    const result = service.role.setResource(roleId, resourceIds);
    result ? this.success({ message: '设置成功' }) : this.error({ message: '设置失败' })
  }

  async getUser(){
    const { service } = this;
    const result = await service.role.getUser();
    this.success({ data: result });
  }

  async setUser(){
    const { ctx, service } = this;
    const { roleId, userIds } = ctx.request.body;
    const result = service.role.setUser(roleId, userIds);
    result ? this.success({ message: '设置成功' }) : this.error({ message: '设置失败' })
  }

}

module.exports = RoleController;