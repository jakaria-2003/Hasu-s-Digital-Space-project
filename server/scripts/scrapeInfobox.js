import https from "https";
import fs from "fs";
import path from "path";

const dir = path.resolve("../latest/public/movies");

async function scrapeInfobox(pageName, outName) {
  return new Promise((resolve) => {
    https.get(
      `https://en.wikipedia.org/wiki/${encodeURIComponent(pageName)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      },
      (res) => {
        let html = "";
        res.on("data", (c) => (html += c));
        res.on("end", () => {
          const match = html.match(/class="infobox-image"[\s\S]*?src="([^"]+)"/);
          if (match) {
            let src = match[1];
            if (src.startsWith("//")) src = "https:" + src;
            console.log("Found src for", pageName, ":", src);
            const s = fs.createWriteStream(path.join(dir, outName));
            https.get(
              src,
              {
                headers: {
                  "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                },
              },
              (r) => {
                r.pipe(s);
                s.on("finish", () => {
                  s.close();
                  console.log("✅ Downloaded:", outName);
                  resolve(true);
                });
              }
            );
          } else {
            console.log("No infobox image for", pageName);
            resolve(false);
          }
        });
      }
    );
  });
}

await scrapeInfobox("Spider-Man_2", "spiderman-2.jpg");
await scrapeInfobox("96_(film)", "96.jpg");
console.log("Infobox scraping finished!");
process.exit(0);
