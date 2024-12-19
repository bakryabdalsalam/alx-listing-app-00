// utils/filterProperties.ts
import { PropertyProps } from "@/interfaces";

/**
 * Filters the given properties based on the provided activeFilters.
 * All active filters must be present in a property's category array
 * for it to be included in the result.
 */
export function filterProperties(properties: PropertyProps[], activeFilters: string[]): PropertyProps[] {
  if (activeFilters.length === 0) {
    return properties;
  }

  return properties.filter((property) =>
    activeFilters.every((f) =>
      property.category.map((cat) => cat.toLowerCase()).includes(f.toLowerCase())
    )
  );
}
