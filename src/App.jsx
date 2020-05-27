import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { ThemeProvider } from "@chakra-ui/core";

const fuseOptions = {
  threshold: 0.2,
  keys: ["name", "description"],
};

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [manifests, setManifests] = useState([]);
  const [fuse, setFuse] = useState(new Fuse(manifests, fuseOptions));

  async function getManifests() {
    const response = await fetch(
      "https://mertd.github.io/shovel-data/manifests.json"
    );
    const json = await response.json();
    setManifests(json);
  }

  useEffect(() => {
    getManifests();
  }, []);

  useEffect(() => {
    setFuse(new Fuse(manifests, fuseOptions));
  }, [manifests]);

  useEffect(() => {
    const results = fuse.search(search);
    setResults(results);
    // eslint-disable-next-line
  }, [search]);

  return (
    <div className="App">
      <ThemeProvider>
        <header>
          <h1>Shovel</h1>
          <h4>
            Search apps installable via <A href="https://scoop.sh">scoop</A>
          </h4>
        </header>
        <main>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <ul>
            {results &&
              results.map((result) => (
                <li key={result.refIndex}>
                  <p>
                    <b>
                      <A href={result.item.homepage}>{result.item.name}</A>
                    </b>{" "}
                    {result.item.version} <i>{result.item.bucket}</i>
                  </p>
                  <p>{result.item.description}</p>
                  <p>
                    <code>scoop install {result.item.name}</code>
                  </p>
                </li>
              ))}
          </ul>
        </main>
        <footer>
          Shovel is <A href="https://github.com/mertd/shovel">open source</A>.
          Your use of this app is governed by the{" "}
          <A href="https://github.com/mertd/shovel/blob/master/LICENCE">
            MIT Licence
          </A>
          .
        </footer>
      </ThemeProvider>
    </div>
  );
}

function A(props) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {props.children}
    </a>
  );
}

export default App;
