import React, { useContext } from "react";
import ManifestsContext from "../contexts/ManifestsContext";
import SearchResult from "./Search/SearchResult";

interface ManifestProps extends React.ComponentPropsWithRef<"div"> {
  bucket: string;
  name: string;
}

export default function Manifest(props: ManifestProps) {
  const manifests = useContext(ManifestsContext);
  const manifest = manifests.find(
    (manifest) =>
      manifest.name === props.name && manifest.bucket === props.bucket
  );

  if (manifest) return <SearchResult manifest={manifest} {...props} />;
  return null;
}
