module.exports = {
    resolve: {
        fallback: {
            "http": require.resolve("stream-http"),
            "crypto": require.resolve("crypto-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            crypto: require.resolve("crypto-browserify"),
            process:false

        }
    },
    node: {
        fs: "empty"
      }
}