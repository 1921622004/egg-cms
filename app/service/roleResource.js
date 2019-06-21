const BaseService = require('./baseService');

class RoleResourceService extends BaseService {
    constructor(...arg){
        super(...arg);
        this.entity = 'role_resource';
    }
}

module.exports = RoleResourceService;