const BaseController = require('./BaseController');

class RoleResourceController extends BaseController {
  constructor(...arg){
    super(...arg);
    this.entity = 'roleResource';
  }
}

module.exports = RoleResourceController;