const { Message } = require("discord.js");

module.exports = async (client, interaction) => {
    if (interaction.isButton()) {
        let signUp = 'unknown';
        if (interaction.customId == '+') { signUp = 'yes'; }
        if (interaction.customId == '-') { signUp = 'no'; }
        if (interaction.customId == 'm') { signUp = 'maybe'; }
        if (signUp == 'unknown') {
            if (interaction.customId == 'alt') {
            }
        } else {
            await client.signups.set(interaction.customId, interaction.member.displayName, interaction.channel.name, interaction.message, client);
            client.signups.signupReply(client, interaction);
        }
    }

    if (interaction.isModalSubmit()) {
        if (interaction.customId == 'altModal') {
            console.log(interaction.components[1].components);
            await client.signups.createAlt(client, interaction);
        }
    }
    
    if (interaction.isSelectMenu()) {
        if (interaction.customId == 'altSelect') {
            if (interaction.values[0] == 'new') {
                client.signups.altModal(client, interaction);
            } else {
                client.signups.selectAlt(client, interaction);
            }
        }
    }

    if (interaction.isCommand()) {
        if (interaction.commandName == 'wav') {
            let wav = interaction.options.getString('wav');
            interaction.reply({content: 'Wav Command: ' + wav, ephemeral: true});
            const cmd = client.commands.get('wav');
            cmd.run(client, interaction, [wav]);
        }        
    }
};
