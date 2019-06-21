const BaseController = require('./BaseController');

class ResourceController extends BaseController {
  constructor(...arg){
    super(...arg);
    this.entity = 'resource';
  }
}

module.exports = ResourceController;