import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { Spinner, Input, Stack, Box, Text } from "@chakra-ui/core";
import SearchResult from "./SearchResult";

const fuseOptions = {
  threshold: 0.2,
  keys: ["name", "description"],
};

function Search(props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [manifests, setManifests] = useState([]);
  const [fuse, setFuse] = useState(new Fuse(manifests, fuseOptions));

  const timer = useRef(null);

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
    // use timeout to avoid unnecessary intermediate searches
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const results = fuse.search(search);
      setResults(results);
    }, 300);
    // eslint-disable-next-line
  }, [search]);

  if (!manifests.length) {
    return <Spinner />;
  }

  return (
    <div {...props}>
      <Box>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search"
          boxSizing="border-box"
        />
        <Text as="sub" hidden={!results.length}>
          Searched <b>{manifests.length}</b> manifests and returned{" "}
          <b>{results.length}</b> results.
        </Text>
        <Stack spacing="1rem" pt="1rem" pb="1rem">
          {results &&
            results.map((result) => (
              <SearchResult key={result.refIndex} result={result} />
            ))}
        </Stack>
        {props.children}
      </Box>
    </div>
  );
}

export default Search;
