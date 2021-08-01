module.exports = {
  onPreBuild: ({ inputs, utils }) => {
    try {
      const {prefix, def} = inputs;

      const definitions = Array.isArray(def) ? def : def.split(/\s*[;|,|\s]\s*/);

      for (const definition of definitions) {
        // Use old concat to provide a support to old Node versions
        const key        = prefix ? (prefix + "_" + definition) : definition;
        const value      = process.env[definition];
        process.env[key] = value;
      }

      utils.status.show({summary: "The environment variables have been added successfully!"});
    }
    catch (error) {
      utils.build.failPlugin("The plugin failed to add the environment variables present in the netlify.toml file. Please check your configuration. Stack trace:", {error});
    }
  }
};
