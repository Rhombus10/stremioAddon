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
		{ name: "src1", type: "tv", url:''}]
}


const builder = new addonBuilder(manifest)

async function update() {
  await fetch("http://www.freeintertv.com/myAjax/get_item_m3u8/", {
    method: "POST",
    headers: {
      "accept": "text/plain, */*; q=0.01",
      "accept-language": "en-GB,en;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-gpc": "1",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "lang=english; lastnew=3324%26%26200; TVSESS=f3sbhipol0ec153sojm9dnis52"
    },
    body: "chname=Y25uX2xpdmU%3D&ch=http%3A%2F%2Fwww.freeintertv.com%2Fexternals%2Ftv-russia%2Fsmotret-tv3-online&html5=11"
  })
  .then(res => res.text())
  .then(text => {
    const match = text.match(/playlist\[0\]\['file'\]='(.*?)'/);
    dataset["ustv-de1092e3-23c9-40b8-9cd1-c1c11bfb262a"].find(a => a.name=="src1").url = match ? match[1] : null;
  });
}

builder.defineStreamHandler(function(args) {
    if (dataset[args.id]) {
      return update().then(() => ({ streams: dataset[args.id] }));

    } else {
        return Promise.resolve({ streams: [] });
    }
})

module.exports = builder.getInterface()