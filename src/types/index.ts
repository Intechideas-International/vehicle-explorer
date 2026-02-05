// NHTSA API response wrapper
export interface NHTSAResponse<T> {
  Count: number
  Message: string
  SearchCriteria: string | null
  Results: T[]
}

// From GetMakesForVehicleType/truck
export interface TruckMake {
  MakeId: number
  MakeName: string
  VehicleTypeId: number
  VehicleTypeName: string
}

// From GetModelsForMake/{make} and GetModelsForMakeYear/...
export interface VehicleModel {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
  VehicleTypeId?: number
  VehicleTypeName?: string
}

// From GetVehicleTypesForMakeId/{makeId}
export interface VehicleType {
  VehicleTypeId: number
  VehicleTypeName: string
}

// App-specific types
export interface FavoriteMake {
  makeId: number
  makeName: string
  addedAt: string
}
