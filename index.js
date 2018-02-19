#!/usr/bin/node

const clipMonit = require('clipboard-monitor');
const Discord = require("discord.js");
const tmp = require('tmp');
const http = require('https');
const fs = require('fs');
const cp = require('copy-paste');
const {spawn, execFile} = require('child_process');
const gifsicle = require('gifsicle');
const config = require('./config.json');
var monitor = clipMonit(500);

var lastClip = '';

discord_log = (text) => {
	console.log(text);
	logchan.send('`' + text + '`');
};


monitor.on('copy', function (data) {
	if(!server)
		return;
	let re = /^https:\/\/cdn\.discordapp\.com\/emojis\/[0-9]{18}\.(?:png|gif|jpg)/;
	if(!re.test(data)) {
		lastClip = data;
		return;
	} else {
		cp.copy(lastClip);
	}
	writeImageToTempFile(re.exec(data)[0], (file) => {
		discord_log('Write: ' + file);

		var child = spawn('yad', ['--center', '--on-top', '--image-on-top', '--image', file, '--title', 'Emoji Stolen', '--text', 'Enter Emoji Name:', '--entry']);
		var stdout = '',
			stderr = '';
		child.stdout.on('data', function(data) {
			stdout += data.toString();
		});

		child.stderr.on('data', function(data) {
			stderr += data.toString();
		});

		child.on('exit', function(code) {
			if(!(/^[A-z_]+$/).test(stdout.trim())) {
				fs.unlink(file, () => discord_log('Delete: ' + file));
				return;	
			}
			newEmoji(file, stdout.trim());
		});
	});
});


const client = new Discord.Client();

var server = null;
var logchan = null;
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	server = client.guilds.get(config.server);
	logchan = server.channels.get(config.log_channel);
});


client.login(config.token);

function newEmoji(path, name) {
	server.emojis.create(path, name)
		.then(emoji => {
			discord_log('Upload: ' + emoji.id);
			logchan.send(`<@194259969359478784> Stole emoji: <${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}> `);
			fs.unlink(path, () => discord_log('Delete: ' + path));
		})
		.catch(err => {
				if(err.message.indexOf('256') > -1) {
					
					var scaled = tmp.tmpNameSync();
					execFile(gifsicle, ['--scale', '0.5', '-o', scaled, path], err => {
						discord_log('Scale: ' + scaled);
						fs.unlink(path, () => discord_log('Delete: ' + path));
						newEmoji(scaled, name);
					});
				} else {
					console.error(err);
				}
		});
}

function writeImageToTempFile(url, cb) {
	var tmpobj = tmp.tmpNameSync() + url.substring(url.length - 4);
	var s = fs.createWriteStream(tmpobj);
	var request = http.get(url, function(response) {
		discord_log('Download: ' + url);
		response.pipe(s);
		cb(tmpobj);
	});
}
