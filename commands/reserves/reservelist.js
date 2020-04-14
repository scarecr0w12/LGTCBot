const moment = require('moment');

exports.run = async function(client, message, args) {
	let raid = await client.signups.getRaid(client, message.channel);
   
    let includes = [
        {model: client.models.signup, as: 'signup', foreignKey: 'signupID'},
        {model: client.models.reserveItem, as: 'item', foreignKey: 'reserveItemID'},
    ];
    
    client.models.raidReserve.findAll({where: {RaidID: raid.id}, include: includes}, {order: 'item.name'}).then((raidReserves) => {
        let returnMessage = '';
        raidReserves.sort((a, b) => {
            if (a.item.name == b.item.name) {
                return a.signup.player > b.signup.player ? true : false;
            }
            return (a.item.name > b.item.name) ? true : false;
        });
        raidReserves.forEach((reserve) => {
            if (!returnMessage.length) {
                returnMessage = '-\n```md\n';
                returnMessage += 'Player'.padEnd(20) + 'Item'.padEnd(40) +  'Reserved At\n';
                returnMessage += ''.padEnd(85, '-') + '\n';
            }
            returnMessage += reserve.signup.player.padEnd(20) + reserve.item.name.padEnd(40) + moment(reserve.updatedAt).utcOffset(-240).format('h:mm A, L') + '\n';
            if (returnMessage.length > 1800) {
                returnMessage += '```';
                message.channel.send(returnMessage);    
                returnMessage = '';
            }
        });
        if (returnMessage.length) {
            returnMessage += '```';
            message.author.send(returnMessage);    
        }
    });
};