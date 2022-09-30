### Improvement Notes:

- [ ] Add appium to npm
- [ ] use yarn instead npm to follow rest of company
- [ ] Remove defaults and non-env specific items out of .env into a better place
- [ ] create a bash script and delete node_modules and install npm automatically
- [ ] create script to install latest TB app and find the file path automatically
- [ ] add CI to running these tests
- [ ] update env file
  - [ ] at the moment we're using tb app, how we fetch latest app and use that instead from s3 or build app
- [ ] add lint to framework
- [ ] rename click to tap for "iOS"
- [ ] create generic methods such as for switches, taping etc.
- [ ] add snapshot testing to work
- [ ] get amplysic test to pass again
- [ ] create file for identifiers to use for tests
- [ ] easier way to run test instead of "npm run floorplan, npm run apm, npm run test"
- [ ] create a script that will run all tests instead of individual tests

### Spike Work:

- [ ] create debug launch file to help with debug (spike)
- [ ] improve readability:
  - [ ] add cucumber or ther similar framework to webdriverio (spike)
  - [ ] report/output readability (spike)
- [ ] investigate if spec folder can have subfolder (spike)
- [ ] Investigate if can have folders withing folders for pageobjects or even the spec file tests...ie. web/manage/managexyx.ts (spike)
- [ ] find a webdriverio console tool to view and run tests like cypress (spike)

### Helpful Links:

- https://webdriver.io/docs/selectors/#ios-uiautomation
- https://webdriver.io/docs/selectors
- https://webdriver.io/docs/api/browser/debug/
- https://webdriver.io/docs/debugging/
  // paste other helpful links
