const {onPreBuild} = require("./../index");

const netlifyConfig = {
  build: {
    environment: {},
  },
};

const utils         = {
  run   : {
    command() {},
  },
  build : {
    failBuild(message) {
      throw new Error(message);
    },
  },
  cache : {
    save() {},
    restore() {},
  },
  status: {
    show() {},
  },
};
const addProcessEnv = (...envVars) => { envVars.forEach(envVar => process.env[envVar] = `Test for ${envVar}`); };
const preCallback   = (prefix, def) => onPreBuild({inputs: {prefix, def}, utils, netlifyConfig});

beforeEach(() => {
  netlifyConfig.build.environment = {};
});

test("normal configuration", () => {
  // Prepares data
  const [prefix, def] = [
    "REACT_APP",
    ["VAR_1", "VAR_2"],
  ];

  // adds the raw data to process env
  addProcessEnv(...def);

  // Calls onPreBuild w/ correct data
  preCallback(prefix, def);

  // Multi checks
  def.forEach(varName => (
    expect(netlifyConfig.build.environment).toHaveProperty(`${prefix}_${varName}`, process.env[varName])
  ));
});

test("fails to use env with def no argument, should do nothing", () => {
  // Prepares data
  const [prefix, def] = [
    "REACT_APP",
    ["VAR_1", "VAR_2"],
  ];

  // adds the raw data to process env
  addProcessEnv(...def);

  // Prepares onPreBuild callback w/o def argument
  const t = () => preCallback(prefix);

  // Checks if no error
  expect(t).not.toThrow();
  // Checks if void function
  expect(t()).toBeUndefined();
});

test("fails to use env with bad def argument, should throw error", () => {
  // Prepares data
  const [prefix, def] = [
    "REACT_APP",
    ["VAR_1", "VAR_2"],
  ];

  // adds the raw data to process env
  addProcessEnv(...def);

  // Prepares onPreBuild callback w/o def argument
  const t = () => preCallback(prefix, 123);

  // Checks if the error is correct
  expect(t).toThrow();
});
