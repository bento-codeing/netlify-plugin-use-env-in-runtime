import logo        from "./logo.svg";
import "./App.css";
import {useEffect} from "react";

function App() {
  useEffect(() => {
    console.info("The env variables provided:");
    console.table({
      REACT_APP_UI_TEST         : process.env.REACT_APP_UI_TEST,
      REACT_APP_TOML_ALL_TEST   : process.env.REACT_APP_TOML_ALL_TEST,
      REACT_APP_TOML_PROD_TEST  : process.env.REACT_APP_TOML_PROD_TEST,
      REACT_APP_TOML_BRANCH_TEST: process.env.REACT_APP_TOML_BRANCH_TEST,
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1>
          Netlify plugin
        </h1>
        <p>
          Make some environment variables available only at build time, in the runtime of your application <br/>
          with use-env-in-runtime Netlify plugin.
        </p>
        <br/>
        <ol style={{textAlign: "justify", fontSize: "1rem"}}>
          <li>Environment variable (named <i>REACT_APP_UI_TEST</i>) set in Netlify
            UI: <b>{process.env.REACT_APP_UI_TEST}</b></li>
          <li>Environment variable (named <i>REACT_APP_TOML_ALL_TEST</i>) set in Netlify
            TOML: <b>{process.env.REACT_APP_TOML_ALL_TEST}</b></li>
          <li>Environment variable (named <i>REACT_APP_TOML_PROD_TEST</i>) set for production in Netlify
            TOML: <b>{process.env.REACT_APP_TOML_PROD_TEST}</b></li>
          <li>Environment variable (named <i>REACT_APP_TOML_BRANCH_TEST</i>) set for a branch (demo-check-deploy-branch)
            in Netlify TOML: <b>{process.env.REACT_APP_TOML_BRANCH_TEST}</b></li>
        </ol>
        <br/>
        <code>Check your web console for more information.</code>
        <br/>
        <code style={{fontSize: "1rem"}}>
          Check the production version: <a className="App-link"
                                                 href="https://use-env-in-runtime-plugin-demo.netlify.app"
                                                 target="_blank"
                                                 rel="noopener noreferrer">click on me!</a> 👺
        </code>
        <br/>
        <a
          className="App-link"
          href="https://github.com/ARKHN3B/netlify-plugin-use-env-in-runtime"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </header>
    </div>
  );
}

export default App;
