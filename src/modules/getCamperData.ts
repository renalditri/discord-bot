import CamperModel from '../database/models/CamperModel'
import type { CamperInt } from '../interfaces/CamperInt'

export const getCamperData = async (id: string): Promise<CamperInt> => {
  const camperData = (await CamperModel.findOne({ discordId: id })) ??
  (await CamperModel.create({
    discordId: id,
    round: 1,
    day: 0,
    date: Date.now()
  }))
  return camperData
}