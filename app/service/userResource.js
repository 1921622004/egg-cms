const BaseService = require('./baseService');

class UserResourceService extends BaseService {
    constructor(...arg){
        super(...arg);
        this.entity = 'user_resource';
    }
}

module.exports = UserResourceService;