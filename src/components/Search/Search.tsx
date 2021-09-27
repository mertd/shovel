import React, { useState, useEffect, useRef, useContext } from "react";
import Fuse from "fuse.js";
import { Spinner, Input, Stack, Box, Text } from "@chakra-ui/react";
import SearchResult from "./SearchResult";
import { useLocation, useHistory } from "react-router-dom";
import Manifest from "../../types/Manifest";
import ManifestsContext from "../../contexts/ManifestsContext";

const fuseOptions = {
  threshold: 0.2,
  keys: ["name", "description"],
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Renders a search input and responds to interaction with it by updating the url, executing the manifest search and displaying the results.
 */
function Search(props: React.ComponentPropsWithRef<"div">) {
  const query = useQuery();
  const history = useHistory();
  const manifests = useContext(ManifestsContext);
  const [search, setSearch] = useState(query.get("q") || "");
  const [results, setResults] = useState<Fuse.FuseResult<Manifest>[] | null>(
    null
  );
  const [fuse, setFuse] = useState(new Fuse(manifests, fuseOptions));

  const timer = useRef<NodeJS.Timeout | null>(null);
  const stopWatch = useRef([0, 0]);
  const input = useRef<HTMLInputElement | null>(null);

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
    // skip search if there is no change, reset if there is no input
    if (search === query.get("q")) return;
    if (!search) return setResults(null);
    // set query parameter
    history.replace("/search?q=" + search);
    // use timeout to avoid unnecessary intermediate searches
    timer.current && clearTimeout(timer.current);
    const timeout = Math.max(2000 / search.length, 500);
    timer.current = setTimeout(doSearch, timeout);
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
          background="white"
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
          {results?.map((result) => (
            <SearchResult key={result.refIndex} manifest={result.item} />
          ))}
        </Stack>
        {props.children}
      </Box>
    </div>
  );
}

export default Search;
