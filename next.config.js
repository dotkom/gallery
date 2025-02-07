require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withOffline = require('next-offline');

nextConfig = {
  webpack: (config, options) => {
    config.plugins = config.plugins || [];
    config.resolve.plugins = config.resolve.plugins || [];

    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    config.resolve.plugins = [...config.resolve.plugins, new TsconfigPathsPlugin()];

    return config;
  },
  experimental: {
    reactMode: 'concurrent',
  },
};

module.exports = withOffline(nextConfig);
