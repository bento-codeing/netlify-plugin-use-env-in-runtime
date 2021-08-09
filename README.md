
![promotional-banner img](https://github.com/ARKHN3B/netlify-plugin-use-env-in-runtime/blob/main/assets/img/promotional-banner.png)

&nbsp;  
&nbsp;

![](https://img.shields.io/badge/build-success-success) &nbsp;  
![](https://img.shields.io/badge/tests-100%25-success) &nbsp;  
![](https://img.shields.io/npm/dw/netlify-plugin-use-env-in-runtime) &nbsp;  
![](https://img.shields.io/github/issues/arkhn3b/netlify-plugin-use-env-in-runtime) &nbsp;  
![](https://img.shields.io/github/license/arkhn3b/netlify-plugin-use-env-in-runtime) &nbsp;  
![](https://img.shields.io/github/stars/arkhn3b/netlify-plugin-use-env-in-runtime?style=social)

&nbsp;
# Use environment variables in the application runtime

Make some environment variables available only at build time, in the **runtime of your application**.  
By default, the variables you enter in your *netlify.toml* file are only accessible at build time.

[![](https://www.netlify.com/img/deploy/button.svg)](  
https://app.netlify.com/start/deploy?repository=https://github.com/ARKHN3B/netlify-plugin-use-env-in-runtime  
)

&nbsp;
## Demo
Try the demo: [https://use-env-in-runtime-plugin-demo.netlify.app/](https://use-env-in-runtime-plugin-demo.netlify.app/)

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
#### UI Installation
If your project was already deployed to Netlify, use the Netlify UI to [install the Use Env In Runtime Plugin](https://app.netlify.com/plugins/{use-env-in-runtime}/install) in a few clicks.

You're able to [remove the plugin](https://docs.netlify.com/configure-builds/build-plugins/#remove-a-plugin) at any time by visiting the [Plugins tab](https://app.netlify.com/plugins) for your site in the Netlify UI.

&nbsp;
#### File-based Installation
To install with file-based installation, add the following lines to your `netlify.toml` file:
```toml  
[[plugins]] package = "netlify-plugin-use-env-in-runtime"    
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
| `prefix` | string | The prefix we want to add to our environment variables. For example, `REACT_APP` if we use CRA or `GATSBY` if we use Gatsby.| - |  
| `def` | string[] \| string | The names of the variables you want to use. Accept two naming schemes:  **1.** use an array of strings: `["VAR_1", "VAR_2"]` **2.** use a string with a comma or semicolon to separate the names: `"VAR_1; VAR_2; VAR_3"` or `"VAR_1, VAR_2, VAR_3"` | - |

&nbsp;
**Important!** You can **only** configure these inputs in two ways.
&nbsp;

1. You're using the plugin through ***Netlify UI***

   If you are using the plugin through the Netlify UI, the only way to configure these two inputs is by [declaring environment variables through the UI](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables).

   ```env
   # For prefix input
   NETLIFY_PLUGIN_USE_ENV_IN_RUNTIME_PREFIX
   # For def input
   NETLIFY_PLUGIN_USE_ENV_IN_RUNTIME_DEF
   ```

   ##### Example:
   ![screenshot-set-env-through-ui img](https://github.com/ARKHN3B/netlify-plugin-use-env-in-runtime/blob/main/assets/img/screenshot-set-env-through-ui.png)

   &nbsp;
2. You're using the plugin through your ***netlify.toml*** file

   If you are using the plugin through your netlify.toml file, you have two choices. You can use the environment variables through the UI (as mentioned in the first case) or you can define these inputs through your Toml file.

   ##### Example:
   ```toml  
   [[plugins]] 
   package = "netlify-plugin-use-env-in-runtime"    
    [plugins.inputs]    
     prefix = "REACT_APP"    
     def = ["VAR_1", "VAR_2"]  
     
   # In our React app:  
   # console.log(process.env); // { ..., REACT_APP_VAR_1 = "something", REACT_APP_VAR_2 = "something else" }  
   ```  

   > Important!  
   > 1. The input prefix if defined in the UI is overridden by the one defined in the netlify.toml file if it exists.
   > 2. The input def if defined in the UI is merged with the one defined in the netlify.toml file if it exists with a notion of winning overload for the one defined in the toml file.


&nbsp;
#### Execution in Netlify
Once installed and configured, the plugin will automatically run in the Netlify CI during its specified Netlify Build lifecycle event.

&nbsp;
## Changelog
###### A detailed changelog, intended for programmers
- **1.2.0** - Add default inputs and add the possibility to configure the plugin through the ui
- **1.1.0** - Add logs
- **1.0.0** - First deploy

## License
[GNU General Public License v3.0](https://github.com/ARKHN3B/netlify-plugin-use-env-in-runtime/blob/main/LICENSE)

## Credits
[@ARKHN3B](https://github.com/ARKHN3B) (Ben Lmsc)

## Known bugs
No bugs found for the moment. Please do not hesitate to report the issue here : [issues](https://github.com/ARKHN3B/netlify-plugin-use-env-in-runtime/issues)

## Contributing
Become the first contributor !
