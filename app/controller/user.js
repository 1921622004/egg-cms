const BaseController = require('./BaseController');
const svgCaptcha = require('svg-captcha');

class UserController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.entity = 'user';
  }

  async captcha() {
    const { ctx } = this;
    const { text, data } = await svgCaptcha.create();
    ctx.session.captcha = text;
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.body = data;
  }

  async checkCaptcha() {
    const { ctx } = this;
    const text = ctx.body.captcha;
    if (ctx.session.captcha) {
      if (ctx.session.captcha.toLowerCase() === text.toLowerCase()) {
        this.success({ message: '验证通过' })
      } else {
        this.error({ message: '验证失败' })
      }
    } else {
      this.error({ message: '验证失败' });
    } 
  }
}

module.exports = UserController;