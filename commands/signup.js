const fs = require("fs");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
	// Allow a user to sign up in the sign-up channel
	if (message.channel.name.indexOf('signup') == -1) {
		return false;
	}
	message.delete().catch(O_o=>{}); 

	const signup = args[0];
	const raid = message.channel.name;
	const user = args[1] ? args[1] : message.member.displayName;
	const userName = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();
	if (userName.indexOf('/') !== -1 || userName.indexOf("'") !== -1 || userName.indexOf(' ') !== -1) {
		message.channel.send("We're sorry, but " + userName + " is not a valid character name.  Please sign up with your actual character name, and refrain from using slashes, spaces or apostrophes in your sign-up name.");
		return false;
	}

	var signValue;
	if (signup === '+') {
		signValue = 'yes';
	} else if (signup === '-') {
		signValue = 'no';
	} else if (signup.toLowerCase() === 'm') {
		signValue = 'maybe';
	} else {
		message.channel.send('Invalid sign-up. Please sign up as "+", "-", or "m".');
		return false;
	}
	
	const fileName = './signups/' + message.guild.id + '-' + raid + '.json';
	let parsedLineup = {};
	if (fs.existsSync(fileName)) {
		currentLineup = fs.readFileSync(fileName, 'utf8');
		parsedLineup = JSON.parse(currentLineup);
	}
	
	parsedLineup[userName] = signValue;
	fs.writeFileSync(fileName, JSON.stringify(parsedLineup)); 

	let logMessage = message.member.displayName + '/' + raid + ': Sign Up - ' + user + ', ' + signValue + ' [#' + message.author.id + ', ' + guildId + ']';
	console.log('[' + client.timestamp() + '] ' + logMessage);
	let channel = message.guild ? message.guild.channels.find(c => c.name == "server-logs") : null;
	if (channel) {
		channel.send(logMessage);
	}

	
	client.embed.update(message, raid);
};