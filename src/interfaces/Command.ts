import type { CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js'

export interface Command {
  data: | Omit<SlashCommandBuilder, 'addSubCommandGroup' | 'addSubCommand'> | SlashCommandSubcommandBuilder
  run: (interaction: CommandInteraction) => Promise<void>
}