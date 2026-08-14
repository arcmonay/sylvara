import { createWriteStream, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "assets", "photo-library");
mkdirSync(outDir, { recursive: true });

const UA =
  "HarvestHomeCatalog/1.0 (https://github.com/arcmonay/sylvara; garden storefront)";

const media = {
  "hero.jpg": "1772187633909-d5f59071cbf2",
  "hydroponics.jpg": "1530836369250-ef72a3f5cda8",
  "indoor.jpg": "1518531933037-91b2f5f229cc",
  "greenhouse.jpg": "1574943320219-553eb213f72d",
  "seeds.jpg": "1416879595882-3373a0480b5b",
  "irrigation.jpg": "1625246333195-78d9c38ad449",
  "sustainable.jpg": "1492496913980-501348b61469",
  "wildlife.jpg": "1444464666168-49d633b86797",
  "systems.jpg": "1464226184884-fa280b87c399",
  "learn.jpg": "1592841200221-a6898f307baa",
};

const extraIds = [
  "1758978912199-e0df57bde255",
  "1740346125849-a0367efd9590",
  "1673208769691-e74104d853fd",
  "1762291359770-ef217959c205",
  "1773414582372-43ed2b1db2e2",
  "1642046058848-e8809074fb02",
  "1772187633909-d5f59071cbf2",
  "1683009118690-a5851ccb1112",
  "1632409786341-b3086fab3cea",
  "1703589535874-4fbb03d93479",
  "1761235239687-98b2d595fbdf",
  "1743742566136-d5e99d252e9e",
  "1768984418592-5b54e4fe7af5",
  "1571214309501-f9a2e6bec9fe",
  "1762276388192-47d6f36896d7",
  "1638294834907-d11608bc11d2",
  "1587733761376-3f26fc81d17f",
  "1716903282677-3a1b5c936b41",
  "1584747420644-5c767eebcbe6",
  "1545333212-ffebc7933c12",
  "1541779123709-488a159406aa",
  "1557296691-edb10ad8da28",
  "1592484773536-263bf52e81fc",
  "1537541412475-47335a7c1f9d",
  "1683009118720-8424c9dd58e8",
  "1540420773420-3366772f4999",
  "1558618666-fcd25c85cd64",
  "1591857177580-dc82b9ac4e1e",
  "1601004890684-d8cbf643f5f2",
  "1507427100689-2bf8574e32d4",
];

async function download(id, dest) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=82`;
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
  const ids = new Set([
    ...catalog.products.map((p) => p.photoId).filter(Boolean),
    ...extraIds,
  ]);

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
