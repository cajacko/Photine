const path = require('path');

module.exports = () => {
  const output = {
    // Out put with cache buster names in production
    filename: '[hash].[name].js',

    path: path.resolve(__dirname, '../src/public/scripts'),

    // Set public path for webpack hot reload
    publicPath: `${process.env.WEBPACK_DEV_SERVER_PROTOCOL}://${process.env
      .WEBPACK_DEV_SERVER_HOST}:${process.env.WEBPACK_DEV_SERVER_PORT}/`,
  };

  return output;
};
