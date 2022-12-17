import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { EnvironmentPlugin } from 'webpack';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new EnvironmentPlugin({
    "REACT_APP_API_ORIGIN",
    "REACT_APP_AUTH_REGION",
    "REACT_APP_AUTH_USER_POOL_ID",
    "REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID",
    "REACT_APP_GROUP_ID",
  }),
];
