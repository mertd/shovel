import React, { createContext, useEffect, useState } from "react";
import Manifest from "../types/Manifest";
import Props from "../types/Props";
import { useToast } from "@chakra-ui/core";

const ManifestsContext = createContext<Manifest[]>([]);
export const ManifestsConsumer = ManifestsContext.Consumer;

export function ManifestsProvider(props: Props) {
  const [manifests, setManifests] = useState<Manifest[]>([]);
  const toast = useToast();

  async function getManifests() {
    try {
      const response = await fetch(
        "https://mertd.github.io/shovel-data/manifests.json"
      );
      const json = await response.json();
      setManifests(json as Manifest[]);
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

  return (
    <ManifestsContext.Provider value={manifests}>
      {props.children}
    </ManifestsContext.Provider>
  );
}

export default ManifestsContext;
