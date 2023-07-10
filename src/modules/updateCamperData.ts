import type { CamperInt } from '../interfaces/CamperInt'

export const updateCamperData = async (camper: CamperInt): Promise<CamperInt> => {
  camper.day++
  if (camper.day > 100) {
    camper.day = 1
    camper.round++
  }
  camper.timestamp = Date.now()
  await camper.save()
  return camper
}