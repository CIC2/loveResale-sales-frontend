export interface ModelDetailsResponse {
  unitId: number
  modelId: number
  modelCode: string
  unitModelCode: string
  usageTypeId: number
  usageType: string
  locationId: number
  locationName: string
  locationNameAr: string
  projectId: number
  projectName: string
  projectNameAr: string
  projectVideoURL: string
  deliveryDate: string
  bedrooms: string
  bathrooms: string
  modelImageUrl?: string;
  floor: string
  unitSize: number
  garage: boolean
  club: boolean
  storage: boolean
  ac: boolean
  companyCode: string
  projectCode: string
  rentalUnit: string
  isAvailable: boolean
  statusDescription: string
  media: Media
}

export interface Media {
  singleImages: SingleImages
  multiImages: MultiImages
}

interface SingleImages {
  "360": string
  Floor: string
  PDF: string
  Basement: string
  UnitPlan: string
  Finishing: string
}

export interface MultiImages {
  Small: string[]
  Medium: string[]
  Main: string[]
}

export interface ModelDetailsComparison {
  id: number;
  modelId: number;
  modelName: any;
  modelNameAr: any;
  projectId: number;
  projectName: string;
  projectNameAr: string;
  deliveryDateFrom: string;
  deliveryDateTo: string;
  bedroomsFrom: string;
  bedroomsTo: string;
  bathroomsFrom: string;
  bathroomsTo: string;
  floor: string;
  areaFrom: number;
  areaTo: number;
  finishingEn: string;
  finishingAr: string;
  businessEntity: string[];
}
