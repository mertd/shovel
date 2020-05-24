import React, { useState, useEffect } from 'react';
import Fuse from "fuse.js";

const fuseOptions = {
  keys: [
    "homepage",
    "description",
    "bin"
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
    console.log(results);
    // eslint-disable-next-line
  }, [search])

  return (
    <div className="App">
      <header>
        <h1>Shovel</h1>
      </header>
      <main>
        <input value={search} onChange={(event) => setSearch(event.target.value)}/>
        <ul>
          { results && results.map((result) => 
            <li key={result.refIndex}>{result.item.description}</li>
          ) }
        </ul>
      </main>
    </div>
  );
}

export default App;
