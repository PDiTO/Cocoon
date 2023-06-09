import {
  Entity,
  World,
  getComponentValue,
  getEntityComponents,
} from "@latticexyz/recs";

export const useGenerateNFTMetadata = () => {
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

  return { generateMetaData };
};
