import {
  Entity,
  World,
  getComponentValue,
  getEntityComponents,
} from "@latticexyz/recs";

// Temporary image data for demo
import base0 from "../assets/sprites/base0.gif";
import base1 from "../assets/sprites/base1.gif";

const imageMap: { [key: number]: string } = {
  0: base0,
  1: base1,
};

export const useGenerateNFTMetadata = () => {
  const getImageUrl = (base: number) => {
    return imageMap[base];
  };

  const generateMetaData = (
    world: World,
    entity: Entity,
    exclude: string[] = []
  ) => {
    const componentsInScope = getEntityComponents(world, entity);
    const componentData = componentsInScope
      .map((component) => {
        const componentString = component.metadata?.tableId as string;
        const componentName =
          componentString?.split(":")[1]?.replace(">", "") || "";
        const componentValue = getComponentValue(component, entity)?.value;

        if (componentValue && !exclude.includes(componentName)) {
          return {
            trait_type: componentName as string,
            value: componentValue as number,
          };
        }
      })
      .filter((component): component is { trait_type: string; value: number } =>
        Boolean(component)
      );

    return componentData;
  };

  return { generateMetaData, getImageUrl };
};
