import { createWriteStream, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import { readFileSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "assets", "photo-library");
mkdirSync(outDir, { recursive: true });

const UA =
  "HarvestHomeCatalog/1.0 (https://github.com/arcmonay/sylvara; garden storefront)";

const media = {
  "hero.jpg": "1523348837708-15d4a09cfac2",
  "hydroponics.jpg": "1530836369250-ef72a3f5cda8",
  "indoor.jpg": "1466781783362-2fda0ebe4d80",
  "greenhouse.jpg": "1471193945509-9ad0617afabf",
  "seeds.jpg": "1416879595882-3373a0480b5b",
  "irrigation.jpg": "1625246333195-78d9c38ad449",
  "sustainable.jpg": "1492496913980-501348b61469",
  "wildlife.jpg": "1444464666168-49d633b86797",
  "systems.jpg": "1464226184884-fa280b87c399",
  "learn.jpg": "1592841200221-a6898f307baa",
};

async function download(id, dest) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok || !res.body) {
    throw new Error(`Failed ${id}: ${res.status}`);
  }
  await pipeline(res.body, createWriteStream(dest));
}

async function main() {
  const catalog = JSON.parse(
    readFileSync(join(root, "data", "catalog.json"), "utf8"),
  );
  const ids = new Set(catalog.products.map((p) => p.photoId).filter(Boolean));

  for (const [name, id] of Object.entries(media)) {
    const dest = join(outDir, name);
    process.stdout.write(`media ${name}… `);
    try {
      await download(id, dest);
      console.log("ok");
    } catch (err) {
      console.log(String(err.message || err));
    }
  }

  let i = 0;
  for (const id of ids) {
    i += 1;
    const dest = join(outDir, `${id}.jpg`);
    process.stdout.write(`photo ${i}/${ids.size} ${id}… `);
    try {
      await download(id, dest);
      console.log("ok");
    } catch (err) {
      console.log(String(err.message || err));
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
