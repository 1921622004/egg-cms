const { verify } = require('jsonwebtoken');

const verifyPromise = (token, secret) => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, data) => {
      if (err) reject(err);
      resolve(data)
    })
  })
}

module.exports = (options, app) => {
  return async (ctx, next) => {
    if (options.authUrls.includes(ctx.url)) {
      const token = ctx.get('authorization');
      if (token) {
        try {
          const user = await verify(token, app.config.jwtSecret);
          ctx.session.user = user;
          await next();
        } catch (err) {
          ctx.status = 401;
          ctx.body = '无权访问';
        }
      } else {
        ctx.status = 401;
        ctx.body = '无权访问';
      }
    } else {
      await next()
    }
  }
}