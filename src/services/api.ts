import axios from 'axios'
import {
  NHTSAResponse,
  TruckMake,
  VehicleModel,
  VehicleType,
} from '@/types'

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles'

/**
 * Fetch all truck makes from the NHTSA API.
 * Returns ~200 makes that manufacture trucks.
 */
export async function getTruckMakes(): Promise<TruckMake[]> {
  const response = await axios.get<NHTSAResponse<TruckMake>>(
    `${BASE_URL}/GetMakesForVehicleType/truck?format=json`
  )
  return response.data.Results
}

/**
 * Fetch all models for a given make name.
 * Returns models across all years and vehicle types.
 */
export async function getModelsForMake(
  makeName: string
): Promise<VehicleModel[]> {
  const response = await axios.get<NHTSAResponse<VehicleModel>>(
    `${BASE_URL}/GetModelsForMake/${encodeURIComponent(makeName)}?format=json`
  )
  return response.data.Results
}

/**
 * Fetch models for a make filtered by year.
 * Optionally filter by vehicle type as well.
 */
export async function getModelsForMakeYear(
  makeName: string,
  year: string,
  vehicleType?: string
): Promise<VehicleModel[]> {
  let url = `${BASE_URL}/GetModelsForMakeYear/make/${encodeURIComponent(makeName)}/modelyear/${year}`
  if (vehicleType) {
    url += `/vehicletype/${encodeURIComponent(vehicleType)}`
  }
  url += '?format=json'

  const response = await axios.get<NHTSAResponse<VehicleModel>>(url)
  return response.data.Results
}

/**
 * Fetch vehicle types available for a specific make.
 * e.g., Truck, Passenger Car, Multipurpose Passenger Vehicle (MPV)
 */
export async function getVehicleTypesForMake(
  makeId: number
): Promise<VehicleType[]> {
  const response = await axios.get<NHTSAResponse<VehicleType>>(
    `${BASE_URL}/GetVehicleTypesForMakeId/${makeId}?format=json`
  )
  return response.data.Results
}
