const BaseService = require('./baseService');

class RoleService extends BaseService {
    constructor(...arg){
        super(...arg);
        this.entity = 'role';
    }
}

module.exports = RoleService;