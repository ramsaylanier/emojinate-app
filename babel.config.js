module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "@babel/plugin-proposal-decorators",
        {
          version: "legacy",
        },
      ],
      ["@babel/plugin-transform-class-properties", { loose: true }],
    ],
  };
};