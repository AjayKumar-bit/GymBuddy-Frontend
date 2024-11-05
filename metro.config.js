// Importing functions to get and merge Metro configurations
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config')

// Getting the default configuration for Metro bundler
const defaultConfig = getDefaultConfig(__dirname)

// Destructuring asset and source extensions from the default configuration
const { assetExts, sourceExts } = defaultConfig.resolver

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // Specify custom transformer for handling SVG files
  transformer: {
    // Use 'react-native-svg-transformer' to handle SVGs as React components
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // Modify asset extensions to exclude 'svg' files, so they are not treated as static assets
    assetExts: assetExts.filter(ext => ext !== 'svg'),

    // Add 'svg' to source extensions, allowing SVG files to be imported as modules
    sourceExts: [...sourceExts, 'svg'],
  },
}

// Exporting the final Metro configuration by merging the default and custom configurations
// module.exports = mergeConfig(getDefaultConfig(__dirname), config)
const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config)

module.exports = wrapWithReanimatedMetroConfig(mergedConfig)
