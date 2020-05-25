import React, { useState, useEffect } from 'react';
import Fuse from "fuse.js";

const fuseOptions = {
  threshold: 0.2,
  keys: [
    "name",
    "description"
  ]
}

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [manifests, setManifests] = useState([]);
  const [fuse, setFuse] = useState(new Fuse(manifests, fuseOptions));  

  async function getManifests() {
    const response = await fetch("https://mertd.github.io/shovel-data/manifests.json");
    const json = await response.json();
    setManifests(json);
  }

  useEffect(() => {
    getManifests();   
  }, []);

  useEffect(() => {
    setFuse(new Fuse(manifests, fuseOptions));
  }, [manifests])

  useEffect(() => {
    const results = fuse.search(search);
    setResults(results);
    // eslint-disable-next-line
  }, [search])

  return (
    <div className="App">
      <header>
        <h1>Shovel</h1>
        <h4>Search apps installable via <a href="https://scoop.sh" target="_blank" rel="noopener noreferrer">scoop</a></h4>
      </header>
      <main>
        <input value={search} onChange={(event) => setSearch(event.target.value)}/>
        <ul>
          { results && results.map((result) => 
            <li key={result.refIndex}>
              <p><b><a href={result.item.homepage} target="_blank" rel="noopener noreferrer">{result.item.name}</a></b> {result.item.version} <i>{result.item.bucket}</i></p>
              <p>{result.item.description}</p>
              <p><code>scoop install {result.item.name}</code></p>
            </li>
          ) }
        </ul>
      </main>
    </div>
  );
}

export default App;
