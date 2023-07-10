import { Client } from 'discord.js'
import { IntentOptions } from './config/IntentOptions'
import { connectDatabase } from './database/connect'
import { validateEnv } from './utils/validateEnv'
import { onInteraction } from './events/onInteraction'
import { onReady } from './events/onReady'

(async () => {
  if (!validateEnv()) console.warn('Environment variables are not set')

  const Bot = new Client({ intents: IntentOptions })
  Bot.on('ready', async () => { await onReady(Bot) })
  Bot.on(
    'interactionCreate',
    async (interaction) => { await onInteraction(interaction) }
  )

  await connectDatabase()
  await Bot.login(process.env.TOKEN)
})().catch(console.error)
