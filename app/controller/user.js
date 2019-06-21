const BaseController = require('./BaseController');

class UserController extends BaseController {
  constructor(...arg){
    super(...arg);
    this.entity = 'user';
  }
}

module.exports = UserController;