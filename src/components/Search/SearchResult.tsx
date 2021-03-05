import React from "react";
import {
  Box,
  Tag,
  Divider,
  Heading,
  Icon,
  Text,
  BoxProps,
} from "@chakra-ui/core";
import A from "../A";
import CopyCode from "../CopyCode";
import Manifest from "../../types/Manifest";
import { Link } from "react-router-dom";

interface SearchResultProps extends BoxProps {
  manifest: Manifest;
}

function SearchResult(props: SearchResultProps) {
  return (
    <Box
      borderWidth="1px"
      bg="white"
      shadow="md"
      rounded="md"
      p="1rem"
      {...props}
    >
      <Heading size="sm">
        <Link
          to={`/bucket/${props.manifest.bucket}/manifest/${props.manifest.name}`}
        >
          {props.manifest.name}
        </Link>{" "}
        <A href={props.manifest.homepage} title="Homepage">
          <Icon name="external-link" />
        </A>{" "}
        <A href={props.manifest.manifestURL} title="Manifest">
          <Icon name="info-outline" />
        </A>{" "}
        {props.manifest.checkver && props.manifest.checkver.github && (
          <A href={props.manifest.checkver.github} title="Source Code">
            <Icon name="edit" />
          </A>
        )}
      </Heading>
      <Divider />
      <Tag>{props.manifest.version}</Tag> <Tag>{props.manifest.bucket}</Tag>
      <Text>{props.manifest.description}</Text>
      <p hidden={props.manifest.bucket === "main"}>
        <CopyCode code={`scoop bucket add ${props.manifest.bucket}`} />
      </p>
      <p>
        <CopyCode code={`scoop install ${props.manifest.name}`} />
      </p>
      {props.children}
    </Box>
  );
}

export default SearchResult;
