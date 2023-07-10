import { SlashCommandBuilder } from '@discordjs/builders'
import { EmbedBuilder } from 'discord.js'
import type { Command } from '../interfaces/Command'
import { getCamperData } from '../modules/getCamperData'

export const view: Command = {
  data: new SlashCommandBuilder()
    .setName('view')
    .setDescription('Shows your latest 100 days of code check in.'),
  run: async interaction => {
    await interaction.deferReply()
    const { user } = interaction

    const targetCamper = await getCamperData(user.id)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!targetCamper.day) {
      await interaction.editReply({ content: 'You have not started the 100 Days of Code challenge.' })
    }

    const oneHundredEmbed = new EmbedBuilder({
      title: 'My 100DoC Progress',
      description: `Here is my 100 Days of Code progress. I last reported an update on ${new Date(
        targetCamper.timestamp
      ).toLocaleDateString()}.`,
      author: {
        name: user.username,
        iconURL: user.displayAvatarURL()
      },
      fields: [
        {
          name: 'Round',
          value: targetCamper.round.toString(),
          inline: true
        },
        {
          name: 'Day',
          value: targetCamper.day.toString(),
          inline: true
        }
      ],
      footer: { text: 'Day Completed: ' + new Date(targetCamper.timestamp).toLocaleDateString() }
    })

    await interaction.editReply({ embeds: [oneHundredEmbed] })
  }
}