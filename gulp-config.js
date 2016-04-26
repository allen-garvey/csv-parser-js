var config = {};

/*
* Config for js source
*/
config.source = {};
config.source.dir = __dirname + '/source/';
config.source.browser_template = 'browser-wrapper.js';
config.source.node_template = 'node-wrapper.js';
config.source.source_file = config.source.dir + 'csv-parser-core' + '.js';

/*
* Config for js compiled files
*/
config.dest = {};
config.dest.dir = __dirname + '/dist/';
config.dest.browser_name = 'csv-parser';
config.dest.node_name = 'csv-parser-node';




module.exports = config;