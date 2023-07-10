import { REST, type Client, Routes } from 'discord.js'
import { CommandList } from '../commands/_CommandList'

export const onReady = async (bot: Client): Promise<void> => {
  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN as string)
  const commandData = CommandList.map(command => command.data.toJSON())

  await rest.put(
    Routes.applicationGuildCommands(
      bot.user?.id ?? 'missing id', process.env.GUILD_ID as string),
    {
      body: commandData
    }
  )

  console.log('Discord ready!')
}
