const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};
//
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
//module.exports = (async () => {
//  const {
//    resolver: { assetExts, sourceExts },
//  } = await getDefaultConfig();
//
//  return {
//    transformer: {
//      // Enable svg-transformer for handling SVGs
//      babelTransformerPath: require.resolve('react-native-svg-transformer'),
//    },
//    resolver: {
//      // Add support for SVG in source files
//      assetExts: assetExts.filter(ext => ext !== 'svg'), // Remove SVG from assetExts
//      sourceExts: [...sourceExts, 'svg'], // Add SVG to sourceExts
//    },
//  };
//})();