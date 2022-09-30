import  config  from "./wdio.conf.shared"

config.specs = [
    './test/features/sample_test.feature'
];

exports.config = config;
