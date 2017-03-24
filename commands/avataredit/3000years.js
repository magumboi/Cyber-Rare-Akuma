const commando = require('discord.js-commando');
const Jimp = require("jimp");

module.exports = class YearsCommand extends commando.Command {
    constructor(Client) {
        super(Client, {
            name: '3000years',
            aliases: [
                'az'
            ],
            group: 'avataredit',
            memberName: '3000years',
            description: "It's been 3000 years... (;3000years @User)",
            examples: [';3000years @user'],
			args: [
				{
					key: 'user',
					prompt: 'Which user would you like to edit the avatar of?\n',
					type: 'user'
				}
			]
        });
    }

    async run(message, args) {
        if (message.channel.type !== 'dm') {
            if (!message.channel.permissionsFor(this.client.user).hasPermission(['SEND_MESSAGES', 'READ_MESSAGES', 'ATTACH_FILES'])) return;
        }
        console.log(`[Command] ${message.content}`);
        let user = args.user;
        if (!user.displayAvatarURL) return message.channel.send(":x: Error! This user has no avatar!");
        let userAvatar = user.displayAvatarURL;
        userAvatar = userAvatar.replace(".jpg", ".png");
        userAvatar = userAvatar.replace(".gif", ".png");
        let images = [];
        images.push(Jimp.read(userAvatar));
        images.push(Jimp.read("./images/3000years.png"));
        let [avatar, years] = await Promise.all(images);
        avatar.resize(200, 200);
        years.blit(avatar, 461, 127);
        years.getBuffer(Jimp.MIME_PNG, (err, buff) => {
            if (err) return message.channel.send(':x: Error! Something went wrong!');
            return message.channel.sendFile(buff);
        });
    }
};
