const { addonBuilder } = require("stremio-addon-sdk")

// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md
const manifest = {
	"id": "community.CNN",
	"version": "0.0.2",
	"catalogs": [],
	"resources": [
        "stream"
	],
	"types": ["tv"],
	"name": "CNN",
	"description": ""
}

const dataset = {
	"ustv-de1092e3-23c9-40b8-9cd1-c1c11bfb262a": [
		{ name: "fred's version", type: "tv", url: "https://fl3.moveonjoy.com/CNN/index.m3u8" }]
}


const builder = new addonBuilder(manifest)

builder.defineStreamHandler(function(args) {
    if (dataset[args.id]) {
        return Promise.resolve({ streams: dataset[args.id] });
    } else {
        return Promise.resolve({ streams: [] });
    }
})

module.exports = builder.getInterface()