import { SlashCommandBuilder } from '@discordjs/builders'
import { EmbedBuilder } from 'discord.js'
import type { Command } from '../interfaces/Command'
import { getCamperData } from '../modules/getCamperData'
import { updateCamperData } from '../modules/updateCamperData'

export const oneHundred: Command = {
  // @ts-expect-error - weird typing issue
  data: new SlashCommandBuilder()
    .setName('100')
    .setDescription('Check in for the 100 Days of Code challenge.')
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('The message to go in your 100 Days of Code update.')
        .setRequired(true)
    ),
  run: async (interaction) => {
    await interaction.deferReply()
    const { user } = interaction
    const text = interaction.options.get('message', true)

    const targetCamper = await getCamperData(user.id)
    const updatedCamper = await updateCamperData(targetCamper)

    const oneHundredEmbed = new EmbedBuilder()
    oneHundredEmbed.setTitle('100 Days of Code')
    oneHundredEmbed.setDescription(text.value as string)
    oneHundredEmbed.setAuthor({
      name: user.username,
      iconURL: user.displayAvatarURL()
    })
    oneHundredEmbed.addFields([
      {
        name: 'Round',
        value: updatedCamper.round.toString(),
        inline: true
      },
      {
        name: 'Day',
        value: updatedCamper.day.toString(),
        inline: true
      }
    ])
    oneHundredEmbed.setFooter({
      text: 'Day Compleyed: ' + new Date(updatedCamper.timestamp).toLocaleDateString()
    })

    await interaction.editReply({ embeds: [oneHundredEmbed] })
  }
}
