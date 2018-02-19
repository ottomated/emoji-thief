# Emoji Thief
> Monitors the keyboard for Discord emoji URLs, and uses a bot to upload them to a private server.

Discord Nitro allows users to use custom emoji globally, across servers. But what do you do when you see someone else use their own emoji? Now you don't have to ask them for an invite! 
Simply right-click on the emoji, press "Copy Link", and Emoji Thief will do the rest!

![](https://i.imgur.com/8Y2O4sI.png)

## Prerequisites

#### Linux:

- [yad](https://sourceforge.net/projects/yad-dialog/)
```sh
# Arch Linux
yaourt -S yad

# Ubuntu
sudo apt-add-repository ppa:webupd8team/y-ppa-manager
sudo apt-get update
sudo apt-get install yad
```

- [Node.js](https://nodejs.org) v9.5.0

```sh
# Arch Linux
pacman -S nodejs npm

# Ubuntu
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```



## Installation

#### Linux:

```sh
git clone https://github.com/ottomated/emoji-thief.git
cd emoji-thief
npm install
```

## Config Setup

To actually use this script, you need to make:

- A new Discord server for the emoji to be uploaded to
- Optional: An extra channel in that server for the bot to write its logs to
- A Discord Bot

Server creation and channel creation are relatively easy, so I'm not going to go over that. In the `config.json` file, enter the server and channel IDs in their respective fields.

To create the bot:
1. go to <https://discordapp.com/developers/applications/me>
2. "New App"
3. Fill out the name as "Emoji Thief" (or whatever you'd like)
4. Upload an image for the icon: I suggest [this](https://i.imgur.com/JMJGUhV.png)
5. "Create App"
6. Scroll down, "Create a Bot User"
7. Click to reveal the token and copy it to the "token" field in `config.json`
8. Scroll up, find your client ID
9. Visit this URL, replacing the zeros with your real client ID: 
[https://discordapp.com/api/oauth2/authorize?client_id=**000000000000000000**&permissions=8&scope=bot](https://discordapp.com/api/oauth2/authorize?client_id=000000000000000000&permissions=8&scope=bot)
10. Add the bot to the server you created earlier.

## Running the Script

Once you've filled out the `config.json`, navigate to the folder in your terminal and run `npm start`. Feel free to set this up as a startup script.

## Meta

Website: [ottomated.pw](https://ottomated.pw)

Distributed under the ISC license. See ``LICENSE`` for more information.

[https://github.com/ottomated/](https://github.com/ottomated/)

## Contributing

1. Fork it (<https://github.com/ottomated/emoji-thief/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## ToDo

- Multi-Platform support
- Better error handling
- Scaling of multiple image types

