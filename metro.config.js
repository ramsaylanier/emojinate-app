const { getDefaultConfig } = require("expo/metro-config");
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname); // eslint-disable-line no-undef

// const { transformer, resolver } = config;

/*
TRANSFORMER CONFIG 
config.transformer = {
  ...transformer,
};
*/

/*
RESOLVER CONFIG
config.resolver = {
  ...resolver,
  assetExts: [],
  sourceExts: [],
};
*/

module.exports = config;
