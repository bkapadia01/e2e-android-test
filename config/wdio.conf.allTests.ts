import  config  from "./wdio.conf.shared"

config.maxInstances = 1;

config.suites = {
    all_tests: [
        './test/features/sample_test.feature',
    ]
};

exports.config = config;
