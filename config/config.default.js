/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560953910779_6818';

  // add your middleware config here
  config.middleware = [
    'auth'
  ];

  config.auth = {
    authUrls: ['/api/role/getUser', '/api/role/serUser']
  }

  config.jwtSecret = 'awesome23';

  config.security = {
    csrf: false,
    // 域名白名单
    domainWhiteList: ['http://localhost:8000']
  }

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '1921622004qwer',
      database: 'cms'
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
