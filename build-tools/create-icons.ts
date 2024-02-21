// This file is used to create icons for the manifest.json file.
// Place an image in the public/assets/images folder and run: `bun run icons` from the root directory.
// Make sure to change the filename variable to the name of your image.
// IMPORTANT: You need to have imagemagick installed on your system.
// On Ubuntu you can install it with: sudo apt-get install imagemagick
import imagemagick from "imagemagick";

const root = `../public/assets/`;
const filename = "icon.png";

for (let size of [16, 32, 48, 96, 128]) {
  imagemagick.resize(
    {
      srcPath: `${root}${filename}`,
      dstPath: `${root}icon${size}.png`,
      width: size,
      height: size,
    },
    (err, res) => {
      if (err) throw err;
    },
  );
  console.log(`resized ${filename} to ${size}x${size}`);
}
