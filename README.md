# hangman-game
> Guess the word ! Improve vocabulary ! Have fun !

![](docs/images/hangmanGif.gif)

[![Join the chat at https://gitter.im/hangman-game/Lobby](https://badges.gitter.im/hangman-game/Lobby.svg)](https://gitter.im/hangman-game/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Issues](https://img.shields.io/github/issues/argonlaser/hangman-game.svg)](https://github.com/argonlaser/hangman-game/issues)

Motivation
------
* Do you want to improve your English vocabulary?
* Are you studying for GRE/TOEFL?
* Are you bored of memorizing words and meanings?
* Are you looking for a fun way to memorize?

Install
------

```bash
$ npm install -g hangman-game
```

Play
------
```
$ hangman
```

Help
----
```
$ hangman -h
  Usage: hangman [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -g, --gre      displays a word from gre words
    -f, --freq     displays a word from high frequency gre words
    -s, --score    displays your highScore

```

Test
------

```bash
$ npm test
```

Contributing
------
- __Bugs and requests__ - submit [here](https://github.com/argonlaser/hangman-game/issues)
- __PRs always welcome !__

Thanks
------
Thanks the awesome repos that had the gre words and meanings.
* [gre-classics] (https://github.com/avinassh/gre-classics)
* [Pervasive-GRE] (https://github.com/yiransheng/Pervasive-GRE)

Thanks to the awesome packages, that makes this project possible.
```json
"dependencies": {
  "cli-table": "^0.3.1",
  "colors": "^1.1.2",
  "commander": "^2.9.0",
  "fs": "0.0.1-security",
  "keypress": "^0.2.1"
}
```
```json
"devDependencies": {
  "chai": "^3.5.0",
  "mocha": "^2.3.3",
  "standard": "^8.1.0"
}
```

Contributors
--------
**hangman-game** © 2016, Venkata krishna Sundararajan. Released under the [MIT License].<br>
Authored and maintained by Venkata krishna Sundararajan with help from [contributors].

> GitHub [@argonlaser](https://github.com/argonlaser) &nbsp;&middot;&nbsp;
> Twitter [@argon_laser](https://twitter.com/argon_laser)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/argonlaser/hangman-game/contributors
