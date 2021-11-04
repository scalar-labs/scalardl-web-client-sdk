const path = require('path');

module.exports = {
    entry: './scalardl-web-client-sdk.js',
    output: {
        filename: 'scalardl-web-client-sdk.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Scalar',
    }
}
