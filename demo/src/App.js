import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Netlify plugin
        </h1>
        <p>
          Make some environment variables available only at build time, in the runtime of your application <br/>
          with use-env-in-runtime Netlify plugin.
        </p>
        <br/>
        <ol style={{textAlign: "justify", fontSize: "1rem"}}>
          <li>Environment variable (named <i>REACT_APP_UI_TEST</i>) set in Netlify UI: <b>{process.env.REACT_APP_UI_TEST}</b></li>
          <li>Environment variable (named <i>REACT_APP_TOML_ALL_TEST</i>) set in Netlify TOML: <b>{process.env.REACT_APP_TOML_ALL_TEST}</b></li>
          <li>Environment variable (named <i>REACT_APP_TOML_PROD_TEST</i>) set for production in Netlify TOML: <b>{process.env.REACT_APP_TOML_PROD_TEST}</b></li>
          <li>Environment variable (named <i>REACT_APP_TOML_BRANCH_TEST</i>) set for a branch (check-deploy-branch) in Netlify TOML: <b>{process.env.REACT_APP_TOML_BRANCH_TEST}</b></li>
        </ol>
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
