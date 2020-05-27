import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import A from "../components/A";

const fuseOptions = {
  threshold: 0.2,
  keys: ["name", "description"],
};

function Search(props) {
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
    <div {...props}>
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
      {props.children}
    </div>
  );
}

export default Search;
