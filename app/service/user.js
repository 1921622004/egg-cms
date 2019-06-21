const BaseService = require('./baseService');

class UserService extends BaseService {
    constructor(...arg){
        super(...arg);
        this.entity = 'user';
    }
}

module.exports = UserService;