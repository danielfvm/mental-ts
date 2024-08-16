# This is a setup script that will download the latest version of the
# mental engine by downloading the Sonic game from the official website.
# It will then extract it and rename it to `./mental`.
$url = "https://mentalgames.org/files/games/1/game/Windows.zip"
$file = "$pwd\Windows.zip"
(New-Object Net.WebClient).DownloadFile($url,$file)
Expand-Archive $file -DestinationPath "$pwd\mental"
Remove-Item $file
Write-Host "Done!"
