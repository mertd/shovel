import React from "react";
import { Box, Tag, Code } from "@chakra-ui/core";
import A from "../components/A";

function SearchResult(props) {
  const result = props.result;
  return (
    <Box
      key={result.refIndex}
      borderWidth="1px"
      bg="white"
      shadow="md"
      rounded="md"
      {...props}
    >
      <p>
        <b>
          <A href={result.item.homepage}>{result.item.name}</A>
        </b>{" "}
        <Tag>{result.item.version}</Tag> <Tag>{result.item.bucket}</Tag>
      </p>
      <p>{result.item.description}</p>
      <p>
        <Code>scoop install {result.item.name}</Code>
      </p>
      {props.children}
    </Box>
  );
}

export default SearchResult;
