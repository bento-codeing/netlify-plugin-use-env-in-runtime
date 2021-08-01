module.exports = {
  onPreBuild: ({ inputs }) => {
    const {prefix, def} = inputs;

    if (!def || !def.length) {
      throw new Error("netlify-plugin-use-env-in-runtime: def input is missing or does not match the required format");
    }

    const definitions = Array.isArray(def) ? def : def.split(/\s*[;|,|\s]\s*/);

    for (const definition of definitions) {
      // Use old concat to provide a support to old Node versions
      const key = prefix ? (prefix + "_" + definition) : definition;
      const value = process.env[definition];
      process.env[key] = value;
    }
  }
}

/**
 * Display an error message on the console
 * @param {string} message
 */
function errorMessage(message) {
  console.error(message);
}
