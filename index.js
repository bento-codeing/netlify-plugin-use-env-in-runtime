module.exports = {
  onPreBuild: ({ inputs }) => {
    const {prefix, def} = inputs;

    if (!def && !def.length) return;

    const definitions = Array.isArray(def) ? def : def.split(/\s*[;|,|\s]\s*/);

    for (const definition of definitions) {
      const key = prefix ? `${prefix}_${definition}` : definition;
      const value = process.env[definition];
      process.env[key] = value;
    }
  }
}
