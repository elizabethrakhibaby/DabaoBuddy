module.exports = function (api) {
  api.cache(true);
  const presets = ['babel-preset-expo'];

  // Check if running Jest, if so, add additional presets and plugins
  const isTest = api.env('test');
  if (isTest) {
    presets.push('@babel/preset-env');
  }

  return {
    presets,
  };
};
