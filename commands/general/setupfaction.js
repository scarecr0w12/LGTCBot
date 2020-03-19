exports.run = (client, message, args) => {

    // Delete message
    message.delete().catch(O_o => {});

    // Find Category
    category = message.guild.channels.find(c => c.name == "Get Started" && c.type == "category");

    // Set your faction
    let factionChannel = 'select-your-faction';
    message.guild.createChannel(factionChannel, {
            type: 'text'
        })
        .then((channel) => {
            let signupMessage = 'Please select your faction.';
            channel.setParent(category.id)
                .then((channel) => {
                    channel.lockPermissions()
                        .catch(console.error);
                });
                channel.send(signupMessage).then((botMsg) => {
                    reactFactions(botMsg);
                });
        });

    async function reactFactions(msg) {
        let emojis = [
            client.emojis.find(emoji => emoji.name === "GoodBotAlliance"),
            client.emojis.find(emoji => emoji.name === "GoodBotHorde"),
        ];
        for (key in emojis) {
            await msg.react(emojis[key]);
        }
    }



}