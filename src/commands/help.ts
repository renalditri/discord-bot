import { SlashCommandBuilder } from '@discordjs/builders'
import { EmbedBuilder } from 'discord.js'
import type { Command } from '../interfaces/Command'

export const help: Command = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Provides information on using this bot.'),
  run: async interaction => {
    await interaction.deferReply();
    const helpEmbed = new EmbedBuilder({
      title: '100 Days of Code Bot!',
      description: 'This discord bot is designed to help you track and share your 100 Days of Code progress.',
      fields: [
        {
          name: "Create today's update",
          value: 'Use the `/100` command to create your update for today. The `message` will be displayed in your embed.'
        },
        {
          name: "Edit today's update",
          value: 'Do you see a typo in your embed? Right click it and copy the ID (you may need developer mode on for this), and use the `/edit` command to update that embed with a new message.'
        },
        {
          name: 'Show your progress',
          value: 'To see your current progress in the challenge, and the day you last checked in, use `/view`.'
        }
      ],
      footer: {
        text: `Version ${process.env.npm_package_version as string}`
      }
    })
    await interaction.editReply({ embeds: [helpEmbed] })
  }
}