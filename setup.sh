#!/bin/bash
# This is a setup script that will download the latest version of the
# mental engine by downloading the Sonic game from the official website.
# It will then extract it and rename it to `./mental`.
wget https://mentalgames.org/files/games/1/game/Linux.zip
unzip Linux.zip
mv Linux mental
rm Linux.zip
