import { SlashCommandBuilder } from '@discordjs/builders'
import { EmbedBuilder } from 'discord.js'
import type { Command } from '../interfaces/Command'

export const edit: Command = {
  // @ts-expect-error - weird typing issue
  data: new SlashCommandBuilder()
    .setName('edit')
    .setDescription('Edit a previous 100 days of code post.')
    .addStringOption(option =>
      option
        .setName('embed-id')
        .setDescription('The ID of the embed to edit.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('The message to go in your 100 Days of Code update.')
        .setRequired(true)
    ),
  run: async interaction => {
    await interaction.deferReply()
    const { channel, user } = interaction
    const targetId = interaction.options.get('embed-id', true)
    const text = interaction.options.get('message', true)

    if (channel == null) {
      await interaction.editReply({
        content: 'Missing channel parameter.'
      })
      // eslint-disable-next-line no-useless-return
      return
    }

    const targetMessage = await channel.messages.fetch(targetId.value as string)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!targetMessage) {
      await interaction.editReply({
        content: 'That does not appear to be a valid message ID. Be sure that you are using this command in the same channel as the message.'
      })
      // eslint-disable-next-line no-useless-return
      return
    }

    const targetEmbed = targetMessage.embeds[0]
    if (targetEmbed.author?.name !== user.tag) {
      await interaction.editReply({
        content: 'This does not appear to be your 100 Days of Code post. You cannot edit it.'
      })
    }
    const newDescriptionEmbed = targetEmbed.toJSON()
    newDescriptionEmbed.description = text.value as string
    await targetMessage.edit({ embeds: [new EmbedBuilder(newDescriptionEmbed)] });
    await interaction.editReply({ content: 'Updated!' });
  }
}