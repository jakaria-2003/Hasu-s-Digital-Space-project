import https from "https";
import fs from "fs";
import path from "path";

const dir = path.resolve("../latest/public/movies");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const files = [
  { lang: "bn", title: "File:দীপু_নাম্বার_টু_চলচ্চিত্রের_পোস্টার.jpg", name: "dipu-number-two.jpg" },
  { lang: "bn", title: "File:দীপু_নাম্বার_টু_পোস্টার.jpg", name: "dipu-number-two.jpg" },
  { lang: "en", title: "File:Zindaginamilegidobara.jpg", name: "znmd.jpg" },
  { lang: "en", title: "File:Zindagi_Na_Milegi_Dobara.jpg", name: "znmd.jpg" },
  { lang: "en", title: "File:96_film_poster.jpg", name: "96.jpg" },
  { lang: "en", title: "File:Devdas_2002_film_poster.jpg", name: "devdas.jpg" },
  { lang: "en", title: "File:Devdas_poster.jpg", name: "devdas.jpg" },
  { lang: "en", title: "File:Spider-Man2002Poster.jpg", name: "spiderman-1.jpg" },
  { lang: "en", title: "File:Spider-Man_2_Poster.jpg", name: "spiderman-2.jpg" },
];

async function download(item) {
  return new Promise((resolve) => {
    const url = `https://${item.lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      item.title
    )}&prop=imageinfo&iiprop=url&redirects=1&format=json`;

    https.get(
      url,
      {
        headers: {
          "User-Agent": "AbuJakariaHasuDigitalSpace/2.0 (mailto:jakariahasu@gmail.com)",
        },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          try {
            const json = JSON.parse(d);
            const page = Object.values(json.query.pages)[0];
            if (page && page.imageinfo && page.imageinfo[0]) {
              const imgUrl = page.imageinfo[0].url;
              console.log("Fetching", item.name, "from", imgUrl);
              const stream = fs.createWriteStream(path.join(dir, item.name));
              https.get(
                imgUrl,
                {
                  headers: {
                    "User-Agent": "AbuJakariaHasuDigitalSpace/2.0 (mailto:jakariahasu@gmail.com)",
                  },
                },
                (r) => {
                  r.pipe(stream);
                  stream.on("finish", () => {
                    stream.close();
                    console.log("✅ Downloaded:", item.name);
                    resolve(true);
                  });
                }
              );
            } else {
              console.log("❌ Not found:", item.title);
              resolve(false);
            }
          } catch (e) {
            console.error(e);
            resolve(false);
          }
        });
      }
    );
  });
}

for (const f of files) {
  await download(f);
  await new Promise((r) => setTimeout(r, 600));
}

console.log("Done downloading exact posters!");
process.exit(0);
