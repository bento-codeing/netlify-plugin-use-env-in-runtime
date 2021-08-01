const {onPreBuild} = require("./../index");

const addProcessEnv = (...envVars) => { envVars.forEach(envVar => process.env[envVar] = `Test for ${envVar}`); };
const preCallback   = (prefix, def) => onPreBuild({inputs: {prefix, def}});

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
    expect(process.env).toHaveProperty(`${prefix}_${varName}`, process.env[varName])
  ));
});

test("fails to use env with no def argument, should throw error", () => {
  // Prepares data
  const [prefix, def] = [
    "REACT_APP",
    ["VAR_1", "VAR_2"],
  ];

  // adds the raw data to process env
  addProcessEnv(...def);

  // Prepares onPreBuild callback w/o def argument
  const t = () => preCallback(prefix);

  // Checks if the error is correct
  expect(t).toThrow();
});
