import type { Interaction } from 'discord.js'
import { CommandList } from '../commands/_CommandList'

export const onInteraction = async (interaction: Interaction): Promise<void> => {
  if (interaction.isCommand()) {
    for (const Command of CommandList) {
      if (interaction.commandName === Command.data.name) {
        await Command.run(interaction)
        break
      }
    }
  }
}