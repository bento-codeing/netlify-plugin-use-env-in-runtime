# Use Environment variables In Runtime *from the netlify.toml file*

Make some environment variables available only at build time, in the **runtime of your application**.

By default, the variables you enter in your *netlify.toml* file are only accessible at build time.

&nbsp;
## What this plugin does

This plugin allows you to transfer environment variables in the runtime of your application from those declared in your *netlify.toml* file and which are only executed at build time.

You can even **override variables** defined in the Netlify UI!

&nbsp;
## Use case

You are a developer who does not have access to your company's Netlify deployment settings console. But your company allows any branch to be deployed on Netlify.

Let's say you have three environment variables that you want to use on a specific branch for a demo, and one of these variables overrides the one set in the Netlify deployment settings console.

But let's say that for preventive reasons, you are not allowed to push an environment file (*.env*).

Let's remind it again, the environment variables defined in the Netlify.toml file are only executed at build time. But they are not made accessible at runtime. Therefore, you are stuck.

This is where the ***netlify-plugin-use-env-in-runtime*** comes in!

&nbsp;
## Usage

&nbsp;
#### File-based installation
To install with file-based installation, add the following lines to your `netlify.toml` file:
```toml
[[plugins]]  
package = "netlify-plugin-use-env-in-runtime"  
 [plugins.inputs]  
  prefix = ""  
  def = []
```
Note: The `[[plugins]]` line is required for each plugin installed via file-based installation, even if you have other plugins in your `netlify.toml` file already.
&nbsp;
To complete file-based installation, from your project's base directory, use *npm*, *yarn*, or any other *Node.js package manager* to add the plugin to `devDependencies` in `package.json`.
```
npm i -D netlify-plugin-use-env-in-runtime
```

&nbsp;
#### Configuration
The plugin requires two inputs to work.
| name | type | description | default |
|------|------|-------------|---------|
| `prefix` | string | The prefix we want to add to our environment variables. For example, `REACT_APP` if we use CRA or `GATSBY` if we use Gatsby. | - |
| `def` | string[] \| string | The names of the variables you want to use. Accept two naming schemes:  **1.** use a string array: `["VAR_1", "VAR_2"]` **2.** use a string with a comma or semicolon to separate the names: `"VAR_1; VAR_2; VAR_3"` or `"VAR_1, VAR_2, VAR_3"`  | - |

##### *Example:*
```toml
[[plugins]]  
package = "netlify-plugin-use-env-in-runtime"  
 [plugins.inputs]  
  prefix = "REACT_APP"  
  def = ["VAR_1", "VAR_2"]

# In our React app:
# console.log(process.env); // { ..., REACT_APP_VAR_1 = "something", REACT_APP_VAR_2 = "something else" }
```

&nbsp;
#### Execution in Netlify
Once installed and configured, the plugin will automatically run in the Netlify CI during its specified Netlify Build lifecycle event.
