const BaseService = require('./baseService');

class RoleService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.entity = 'role';
  }

  async getResource() {
    const res = await this.app.mysql.select('resource');
    const mapedRes = {};
    const value = [];
    res.forEach((resource) => {
      resource.children = [];
      const { id, parent_id: parentId } = resource;
      if (!mapedRes[id] && !mapedRes[parentId]) {
        mapedRes[id] = resource;
        value.push(resource);
      } else {
        if (mapedRes[parentId]) {
          mapedRes[parentId].children.push(resource);
        }
      }
    })
    return value
  }

  async setResource(roleId, resourceIds) {
    const conn = await this.app.mysql.beginTransaction();
    try {
      await conn.query('DELETE FROM role_resource Where role_id=?', [roleId]);
      for (let i = 0; i < resourceIds.length; i++) {
        const id = resourceIds[i];
        await conn.insert('role_resource', {
          role_id: roleId,
          resource_id: id
        })
      }
      conn.commit();
      return true
    } catch (err) {
      conn.rollback();
      return false
    }
  }

  async getUser() {
    const res = await this.app.mysql.select('user');
    return res
  }

  // SELECT * 
  // from resource
  // inner join role_resource
  // on resource.id = role_resource.resource_id
  // inner join role_user
  // on role_user.role_id = role_resource.role_id
  // where role_user.user_id = 1
  
  async setUser(roleId, userIds) {
    const conn = await this.app.mysql.beginTransaction();
    try {
      await conn.query('DELETE FROM role_user Where role_id=?', [roleId]);
      for (let i = 0; i < userIds.length; i++) {
        const id = userIds[i];
        await conn.insert('role_user', {
          role_id: roleId,
          user_id: id
        })
      }
      conn.commit();
      return true
    } catch (err) {
      conn.rollback();
      return false
    }
  }
}

module.exports = RoleService;