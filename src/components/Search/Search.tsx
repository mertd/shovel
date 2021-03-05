import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { Spinner, Input, Stack, Box, Text, useToast } from "@chakra-ui/core";
import SearchResult from "./SearchResult";
import { useLocation, useHistory } from "react-router-dom";
import Manifest from "../../types/Manifest";

const fuseOptions = {
  threshold: 0.2,
  keys: ["name", "description"],
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search(props: React.HTMLProps<HTMLDivElement>) {
  const query = useQuery();
  const history = useHistory();
  const [search, setSearch] = useState(query.get("q") || "");
  const [results, setResults] = useState<Fuse.FuseResult<Manifest>[] | null>(
    null
  );
  const [manifests, setManifests] = useState([]);
  const [fuse, setFuse] = useState(new Fuse(manifests, fuseOptions));
  const toast = useToast();

  const timer = useRef<NodeJS.Timeout | null>(null);
  const stopWatch = useRef([0, 0]);
  const input = useRef<HTMLInputElement | null>(null);

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
      input?.current?.focus();
    }
    //eslint-disable-next-line
  }, [manifests]);

  useEffect(() => {
    // trigger search when fuse is initialized
    if (search) {
      doSearch();
    }
    // eslint-disable-next-line
  }, [fuse]);

  function doSearch() {
    stopWatch.current[0] = performance.now();
    const results = fuse.search<Manifest>(search);
    stopWatch.current[1] = performance.now();
    setResults(results);
  }

  useEffect(() => {
    if (!search) return setResults(null);
    // set query parameter
    history.replace("/search?q=" + search);
    // use timeout to avoid unnecessary intermediate searches
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      doSearch();
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
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setSearch(event.currentTarget.value)
          }
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
