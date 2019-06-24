const BaseController = require('./BaseController');
const svgCaptcha = require('svg-captcha');
const { sign } = require('jsonwebtoken');

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

  async signup() {
    const { ctx, service } = this;
    const user = ctx.request.body;
    const result = await service.user.signup(user);
    result ? this.success({
      message: '注册成功',
      userId: result.userId
    }) : this.error({
      message: '注册失败'
    })
  }

  async login() {
    const { ctx, service, config } = this;
    const { username, password } = ctx.request.body;
    const result = await service.user.login(username, password);
    result && result.length > 0 ? this.success({
      token: sign(JSON.parse(JSON.stringify(result[0])), config.jwtSecret)
    }) : this.error({message: '登陆失败'})
  }

}

module.exports = UserController;