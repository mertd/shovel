import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { Spinner, Input, Stack, Box, Text, useToast } from "@chakra-ui/core";
import SearchResult from "./SearchResult";

const fuseOptions = {
  threshold: 0.2,
  keys: ["name", "description"],
};

function Search(props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [manifests, setManifests] = useState([]);
  const [fuse, setFuse] = useState(new Fuse(manifests, fuseOptions));
  const toast = useToast();

  const timer = useRef(null);
  const stopWatch = useRef([0, 0]);
  const input = useRef(null);

  async function getManifests() {
    try {
      const response = await fetch(
        "https://mertd.github.io/shovel-data/manifests.json"
      );
      const json = await response.json();
      setManifests(json);
    } catch (error) {
      toast({
        status: "error",
        title: "Error",
        description: "Couldn't fetch or parse manifests ⛔",
        duration: null, // don't hide as this error will render the app unusable
      });
    }
  }

  useEffect(() => {
    getManifests();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (manifests.length > 0) {
      setFuse(new Fuse(manifests, fuseOptions));
      input.current.focus();
    }
  }, [manifests]);

  useEffect(() => {
    if (!search) return setResults(null);
    // use timeout to avoid unnecessary intermediate searches
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      stopWatch.current[0] = performance.now();
      const results = fuse.search(search);
      stopWatch.current[1] = performance.now();
      setResults(results);
    }, 300);
    // eslint-disable-next-line
  }, [search]);

  if (!manifests.length) {
    return <Spinner />;
  }

  const stopWatchResult = (stopWatch.current[1] - stopWatch.current[0]).toFixed(
    0
  );

  return (
    <div {...props}>
      <Box>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search"
          boxSizing="border-box"
          ref={input}
        />
        {results && (
          <Text as="sub">
            Searched <b>{manifests.length}</b> manifests in{" "}
            <b>{stopWatchResult}</b>ms and found <b>{results.length}</b> result
            {results.length === 1 || "s"}.
          </Text>
        )}
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
