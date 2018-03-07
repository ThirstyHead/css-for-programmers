// This will break the main image up into tiles
// NOTE: This assumes that you have ImageMagick installed.
// https://www.imagemagick.org/script/index.php

const { exec } = require('child_process');
exec('convert -crop 256x256 land_ocean_ice_2048.jpg tile.jpg', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
