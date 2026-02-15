export interface SearchModelResponse {
  locations: Location[];
  projects: Project[];
  unitTypes: UnitType[];
  areaRanges: number[];
  unitModels: string[];
  bedrooms: string[];
  bathrooms: string[];
  floors: string[];
  deliveries: string[];
}

export interface Location {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  code: string;
}

export interface UnitType {
  id: number;
  name: string;
}
export interface SearchModelFilters {
  locationId?: number;
  projectIds?: number[];
  unitTypeIds?: any;
  areaFrom?: any;
  areaTo?: any;
}
