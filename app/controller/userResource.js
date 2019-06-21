const BaseController = require('./BaseController');

class UserResourceController extends BaseController {
  constructor(...arg){
    super(...arg);
    this.entity = 'userResource';
  }
}

module.exports = UserResourceController;