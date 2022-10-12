import { config as Dotenv} from "dotenv"
import * as fs from 'fs'
import Simctl from 'node-simctl'
import * as os from 'os'
import { register } from "ts-node"
import { Config, SevereServiceError } from "webdriverio";
import logger from '@wdio/logger'

const RerunService = require('wdio-rerun-service');

Dotenv()
register({transpileOnly: true})

interface Device {
  name: string
  udid: string
  state: string
  sdk: string
  platform: string
}

interface DeviceList {
  [version: string]: Device[]
}

const log = logger('e2e-test-automation')

const { join } = require('path');

const DEVICE_NAME = process.env.DEVICE_NAME || ''
const APP_PATH = process.env.APP_PATH || ''
const DEVICE_ANDROID_VERSION = process.env.DEVICE_ANDROID_VERSION
const WDIO_SERVICE = process.env.WDIO_SERVICE || 'selenium-standalone'
const isDebug = process.env.DEBUG ?? false


const getAppPath = async (): Promise<string> => {
  if(APP_PATH !== '') {
    return APP_PATH
  }

  const { username } = os.userInfo()
  const basePath = `/Users/${username}/dev/tb-pos-android`
  var apkFileName = fs.readdirSync(basePath).filter(fn => fn.endsWith('.apk'));

  return basePath + apkFileName
}

const config: Config = {
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or on a remote machine).
  runner: "local",
  specs: [],
  capabilities: {
    webDriver: {
      capabilities: {
        browserName: "chrome",
      },
    },
    mobileDriver: {
      port: 4723,
      path: "/wd/hub",
      capabilities: {
        platformName: "Android",
        deviceName: DEVICE_NAME,
        platformVersion: DEVICE_ANDROID_VERSION,
        newCommandTimeout: 5000,
        automationName: "UiAutomator2",
        // app: APP_PATH,
        // fullReset: true,
        noReset:true,
        // autoAcceptAlerts:true
        // autoDismissAlerts:true,
      },
    },
  },

  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: isDebug ? "debug" : "info",
  deprecationWarnings: true,
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  // Default timeout for all waitFor* commands
  waitforTimeout: isDebug ? 300000 : 15000,
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 90000,
   // Default request retries count
  connectionRetryCount: 3,
  framework: 'cucumber',
  cucumberOpts: {
    requireModule: ['@babel/register'],
    timeout: 1200000,
    require: ['./test/steps/**/*.ts'],
    compiler: ['ts:ts-node/register'],
 },
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // =====
  // Hooks
  // =====
  async onPrepare(config, capabilities) {
    const appPath = await getAppPath()
    capabilities.mobileDriver.capabilities.app = appPath
  },

  before: function (capabilities, specs) {
    // Set Args
    const args: string[] = process.argv.slice(4);
    mobileDriver.closeApp();
    mobileDriver.removeApp("com.touchbistro.TouchBistro");
    mobileDriver.installApp(capabilities.mobileDriver.capabilities.app);
    mobileDriver.launchApp();
  },

  // Temporary solution for debugging. will have a better implementation in the future
  afterTest: function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    // Commenting this out for now. We may need this on CI though.
    // webDriver.saveScreenshot("screenshots/" + test.title + "-Web.png");
    // mobileDriver.saveScreenshot("screenshots/" + test.title + "-Mobile.png");
  },
};

export default config;
