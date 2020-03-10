const Jimp = require('jimp');
const {blue, magenta, red} = require('chalk');
const {resolve} = require('path');
const {mapSeries} = require("bluebird");
const {SingleBar, Presets} = require('cli-progress');

const config = [
    {
        source: '2020 - 6.png',
        zoom: 2,
        scale: 4,
    },
    {
        source: '2020 - 6.png',
        zoom: 1,
        scale: 2,
    },
    {
        source: '2020 - 6.png',
        zoom: 0,
        scale: 1,
    },
    {
        source: '2020 - 6.png',
        zoom: -1,
        scale: 0.5,
    },
    {
        source: '2020 - 6.png',
        zoom: -2,
        scale: 0.25,
    },
];

async function tiles(config) {
    console.log(magenta(' _____                   _             _         _   _ _                                        _             \n|_   _|__  ___ ___  __ _| | ___  _ __ (_) __ _  | |_(_) | ___    __ _  ___ _ __   ___ _ __ __ _| |_ ___  _ __ \n  | |/ _ \\/ __/ __|/ _` | |/ _ \\| \'_ \\| |/ _` | | __| | |/ _ \\  / _` |/ _ \\ \'_ \\ / _ \\ \'__/ _` | __/ _ \\| \'__|\n  | |  __/\\__ \\__ \\ (_| | | (_) | | | | | (_| | | |_| | |  __/ | (_| |  __/ | | |  __/ | | (_| | || (_) | |   \n  |_|\\___||___/___/\\__,_|_|\\___/|_| |_|_|\\__,_|  \\__|_|_|\\___|  \\__, |\\___|_| |_|\\___|_|  \\__,_|\\__\\___/|_|   \n                                                                |___/                                         \n'));
    return mapSeries(config, async (level) => {
        console.log(blue(`Loading image for level ${level.zoom} at scale ${level.scale}`));
        const progressBar = new SingleBar({
            format: '{bar} {percentage}% | {value}/{total}'
        }, Presets.shades_classic);
        const image = await Jimp.read(resolve(__dirname, level.source));

        const scaled = await image
            .clone()
            .scale(level.scale);

        const {width, height} = scaled.bitmap;
        const size = 256;
        console.log(blue(`Splicing image with size ${width}x${height} (${Math.floor(width / size)}x${Math.floor(height / size)} tiles):`));
        progressBar.start(Math.floor(width / size) * Math.floor(height / size), 0);
        if(!process.stdout.isTTY)
            console.log(red('Run this in terminal if you wish to see nice progress bar.'));

        for (let x = 0; x < width; x += size)
            for (let y = 0; y < height; y += size) {
                const cropped = scaled
                    .clone()
                    .crop(x, y, Math.min(size, width - x), Math.min(size, height - y));

                const tile = new Jimp(256, 256)
                    .composite(cropped, 0, 0);

                const filename = `${level.zoom}/${x / size}/${y / size}.png`;

                await tile.writeAsync(resolve(__dirname, '..', 'source', 'tiles', filename));
                progressBar.update(x / size * Math.floor(height / size) + y / size);
            }
        progressBar.update(Math.floor(width / size) * Math.floor(height / size));
        progressBar.stop();
    });
}

tiles(config)
    .catch(e => console.error(e));

module.exports = {
    tiles,
};
