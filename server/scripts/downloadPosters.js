import https from "https";
import fs from "fs";
import path from "path";

const dir = path.resolve("../latest/public/movies");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function fetchImage(wikiLang, title, fileName) {
  return new Promise((resolve) => {
    const url = `https://${wikiLang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      title
    )}&prop=pageimages&format=json&pithumbsize=600&redirects=1`;

    const headers = {
      "User-Agent": "AbuJakariaHasuDigitalSpace/2.0 (contact: jakariahasu@gmail.com)",
    };

    https.get(url, { headers }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          const thumb = pages[pageId]?.thumbnail?.source;
          if (thumb) {
            console.log(`Found poster for ${title}:`, thumb);
            const fileStream = fs.createWriteStream(path.join(dir, fileName));
            https.get(thumb, { headers }, (imgRes) => {
              imgRes.pipe(fileStream);
              fileStream.on("finish", () => {
                fileStream.close();
                console.log(`✅ Saved official poster: ${fileName}`);
                resolve(true);
              });
            });
          } else {
            console.log(`❌ No thumbnail for ${title}`);
            resolve(false);
          }
        } catch (e) {
          console.error(e.message);
          resolve(false);
        }
      });
    }).on("error", (err) => {
      console.log("Error:", err.message);
      resolve(false);
    });
  });
}

const list = [
  { lang: "bn", title: "মনপুরা (চলচ্চিত্র)", file: "monpura.jpg" },
  { lang: "bn", title: "দীপু নাম্বার টু (চলচ্চিত্র)", file: "dipu-number-two.jpg" },
  { lang: "en", title: "12th Fail", file: "12th-fail.jpg" },
  { lang: "en", title: "3 Idiots", file: "3-idiots.jpg" },
  { lang: "en", title: "Zindagi Na Milegi Dobara", file: "znmd.jpg" },
  { lang: "en", title: "96 (film)", file: "96.jpg" },
  { lang: "en", title: "Devdas (2002 Hindi film)", file: "devdas.jpg" },
  { lang: "en", title: "Aashiqui 2", file: "aashiqui-2.jpg" },
  { lang: "en", title: "Spider-Man (2002 film)", file: "spiderman-1.jpg" },
  { lang: "en", title: "Spider-Man 2", file: "spiderman-2.jpg" },
];

for (const item of list) {
  await fetchImage(item.lang, item.title, item.file);
  await new Promise((r) => setTimeout(r, 600));
}

console.log("All official posters fetched!");
process.exit(0);
