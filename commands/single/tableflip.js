const Command = require('../../structures/Command');
const { delay } = require('../../util/Util');
const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
	'(╯°□°)╯           ┬─┬'
];

module.exports = class TableflipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tableflip',
			aliases: ['a-tableflip', 'animated-tableflip', 'tableflip-animated', 'tableflip-a'],
			group: 'single',
			memberName: 'tableflip',
			description: 'Flips a table... With animation!'
		});
	}

	async run(msg) {
		const message = await msg.say('(\\\\°□°)\\\\  ┬─┬');
		for (const frame of frames) {
			await delay(200);
			await message.edit(frame);
		}
		return message;
	}
};
