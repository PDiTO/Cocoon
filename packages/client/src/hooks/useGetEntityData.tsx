import {
  Entity,
  World,
  getComponentValue,
  getEntityComponents,
} from "@latticexyz/recs";

export const useGetEntityData = () => {
  const getEntityData = (
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
            name: componentName as string,
            value: componentValue,
          };
        }
      })
      .filter(
        (
          component
        ): component is {
          name: string;
          value:
            | string
            | number
            | bigint
            | true
            | Entity
            | string[]
            | number[]
            | bigint[]
            | Entity[];
        } => Boolean(component)
      );

    return componentData;
  };

  return { getEntityData };
};
