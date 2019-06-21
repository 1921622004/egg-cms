const BaseController = require('./BaseController');

class RoleController extends BaseController {
  constructor(...arg){
    super(...arg);
    this.entity = 'role';
  }
}

module.exports = RoleController;