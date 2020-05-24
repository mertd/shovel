import React, { useState, useEffect } from 'react';
import Fuse from "fuse.js";

const fuseOptions = {}

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({});
  const [manifests, setManifests] = useState([]);
  const [fuse, setFuse] = useState(new Fuse(manifests, fuseOptions));
  

  async function getManifests() {
    const response = await fetch("https://mertd.github.io/shovel-data/manifests.json");
    const json = await response.json();
    setManifests(json);
    setFuse(new Fuse(manifests, fuseOptions));
  }

  useEffect(() => {
    getManifests();   
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setResults(fuse.search(search));
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
          { results.map && results.map((result) => 
            <li>test</li>
          ) }
        </ul>
      </main>
    </div>
  );
}

export default App;
