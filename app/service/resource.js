const BaseService = require('./baseService');

class ResourceService extends BaseService {
    constructor(...arg){
        super(...arg);
        this.entity = 'resource';
    }
}

module.exports = ResourceService;