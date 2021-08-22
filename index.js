module.exports = {
  onPreBuild: ({inputs, utils}) => {
    console.group("Starting the \"uefn\" plugin process");
    const prefix = inputs.prefix || process.env.NETLIFY_PLUGIN_USE_ENV_IN_RUNTIME_PREFIX;

    // Stop the process if there is no prefix input without breaking the build
    if (!prefix) {
      return console.warn("No \"prefix\" input defined. Skip the process.");
    }

    console.info(`Defined prefix: "${prefix}"`);

    // Stop the process if there is no def input without breaking the build
    const hasDef = inputs.def || process.env.NETLIFY_PLUGIN_USE_ENV_IN_RUNTIME_DEF;
    if (!hasDef) {
      return console.warn("No \"def\" input defined. Skip the process.");
    }

    // Build definitions
    const definitions = buildGlobalDefinitions(inputs.def);
    console.info("Built-in definitions: ", definitions);

    console.group("Definition process");
    // Set the process env object
    for (const definition of definitions) {
      // Use old concat to provide a support to old Node versions
      const key        = `${prefix}_${definition}`;
      process.env[key] = process.env[definition];
      console.info(`- Set ${key} with the following value: "${definition}" in process.env`);
    }
    console.groupEnd();

    console.info("Use Env In Runtime plugin process completed");
    console.groupEnd();
    console.info("The environment variables have been added successfully!");
  }
};


/**
 * Builds an array of definitions from the definitions defined in Netlify UI and in the netlify.toml file.
 * @param tomlDef
 * @return {*[]}
 */
function buildGlobalDefinitions(tomlDef) {
  console.group("Set global definitions (merge UI definitions with TOML definitions if exists)");
  // Get definitions sets in the Netlify UI
  const uiDef         = parseUIDefinitions();
  console.info("- Parse TOML definitions if exists");
  const parsedTomlDef = Array.isArray(tomlDef) ? tomlDef : splitDefinitions(tomlDef);

  console.groupEnd();
  // Important! The definitions sets in the TOML file override those sets in the Netlify UI
  return [...uiDef, ...parsedTomlDef];
}


/**
 * Parse definitions sets in the Netlify user interface
 * @return {*[]}
 */
function parseUIDefinitions() {
  console.info("- Parse UI definitions if exists");
  const {NETLIFY_PLUGIN_USE_ENV_IN_RUNTIME_DEF: uiDef} = process.env;

  if (!uiDef) {
    console.info("No def has been defined through the Netlify UI");
    return [];
  }

  // If the string is an array
  const isArrayLike = /\[/.test(uiDef);

  return isArrayLike ? JSON.parse(uiDef) : splitDefinitions(uiDef);
}


/**
 * Convert a string of definitions into an array of definitions
 * @param {string} rawDef - Definitions in string format
 * @example
 * // returns ["VAR_1", "VAR_2", "VAR_3"]
 * splitDefinitions("VAR_1, VAR_2, VAR_3")
 * @return {string[]}
 */
function splitDefinitions(rawDef) {
  return rawDef.split(/\s*[;|,|\s]\s*/);
}
