import {
  createWriteStream,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "assets", "equipment-photos");
const catalog = JSON.parse(readFileSync(join(root, "data", "catalog.json"), "utf8"));
mkdirSync(outDir, { recursive: true });

const UA = "HarvestHomeCatalog/1.0 (https://github.com/arcmonay/sylvara; garden storefront)";

const SUB_QUERIES = {
  dwc: ["Deep water culture.jpg", "hydroponic lettuce greenhouse"],
  rdwc: ["hydroponic recirculating buckets", "hydroponic greenhouse lettuce"],
  "dutch-bucket": ["Mature Tomato Plants and Young Cucumber Plants in Dutch Buckets.jpg", "dutch bucket tomato greenhouse"],
  "nft-systems": ["2009-03-30 NFT tube hose connection.jpg", "hydroponic NFT lettuce"],
  "ebb-flow": ["Systeme FLOOD&DRAIN", "hydroponic flood tray"],
  "drip-hydro": ["drip irrigation greenhouse tomato", "greenhouse drip emitters"],
  aeroponics: ["aeroponic cloner", "hydroponic cuttings propagator"],
  reservoirs: ["hydroponic reservoir", "plastic water tank garden"],
  "stainless-tanks": ["Stainless steel fermenters and pad filtration machine.jpg", "stainless steel brewing tank"],
  pumps: ["irrigation water pump", "submersible pump"],
  "air-pumps": ["aquarium air pump", "aquarium aerator"],
  "air-stones": ["aquarium air stone", "aquarium bubbles airstone"],
  tubing: ["drip irrigation tubing", "polyethylene irrigation pipe"],
  "net-pots": ["hydroponic net pot", "net cup hydroponics"],
  trays: ["hydroponic flood tray", "greenhouse plant tray"],
  "growing-media": ["expanded clay pebbles hydroponic", "coco coir brick"],
  meters: ["pH meter laboratory", "water quality meter"],
  filtration: ["water filter cartridge", "garden irrigation filter"],
  "led-lights": ["White Full-Spectrum LED Aspect Grow Light.jpg", "LED grow light plants"],
  "propagation-lights": ["seedling grow light", "LED panel and plants.jpg"],
  "grow-tents": ["An HPS grow light in grow tent, with carbon filter and exhaust system.jpg", "indoor grow tent"],
  "cea-rooms": ["grow tent carbon filter", "indoor grow room plants"],
  shelving: ["vertical farm lettuce rack", "greenhouse staging shelves"],
  ventilation: ["Inline Centrifugal Fan.jpg", "grow tent carbon filter fan"],
  climate: ["humidifier indoor plants", "greenhouse dehumidifier"],
  controllers: ["irrigation timer hose", "greenhouse climate control"],
  "backyard-houses": ["hobby greenhouse garden", "backyard greenhouse"],
  "walk-in": ["walk-in greenhouse tomatoes", "polycarbonate greenhouse"],
  "commercial-gh": ["commercial greenhouse tomato production", "greenhouse vegetable rows"],
  "gh-benches": ["greenhouse bench plants", "greenhouse potting bench"],
  "gh-climate": ["greenhouse exhaust fan", "greenhouse heater"],
  "gh-irrigation": ["greenhouse irrigation boom", "greenhouse drip irrigation"],
  "vegetable-seeds": ["tomato seedlings tray", "vegetable seedlings"],
  "herb-seeds": ["basil plants garden", "herb seedlings"],
  "flower-seeds": ["sunflower garden", "zinnia flowers"],
  "fruit-seeds": ["strawberry plants", "watermelon garden"],
  "heirloom-seeds": ["heirloom tomatoes vine", "ripe tomatoes greenhouse"],
  "organic-seeds": ["cherry tomatoes plant", "organic vegetable garden"],
  "pollinator-seeds": ["pollinator garden flowers", "bees zinnia"],
  "native-seeds": ["echinacea purpurea", "milkweed flowers"],
  "seed-kits": ["seed packets", "Pepper and tomato seedling trays"],
  "bulk-seeds": ["lettuce harvest", "leafy greens greenhouse"],
  "drip-irrigation": ["drip irrigation vegetable garden", "drip line tomatoes"],
  soaker: ["soaker hose garden", "garden hose bed"],
  "micro-irrigation": ["micro sprinkler irrigation", "garden micro sprinkler"],
  sprinklers: ["oscillating sprinkler", "lawn sprinkler"],
  timers: ["garden hose timer", "irrigation timer"],
  "rain-storage": ["Red rain barrel.jpg", "Rain Barrel", "IBC tote water"],
  "water-pumps": ["irrigation pump", "water pump farm"],
  "irrigation-parts": ["drip irrigation fittings", "irrigation connectors"],
  "irrigation-kits": ["raised bed drip irrigation", "garden drip kit"],
  "commercial-irrigation": ["farm drip irrigation field", "agricultural irrigation"],
  fertigation: ["fertigation injector irrigation", "drip fertilizer"],
  "septic-tanks": ["Septic Tank - geograph.org.uk", "concrete septic tank"],
  composting: ["Compost tumbler in Brighthelm Garden", "compost bin garden"],
  "industrial-compost": ["industrial compost windrow", "compost facility"],
  soil: ["bagged garden soil", "organic fertilizer"],
  pest: ["garden spray plants", "insecticidal soap"],
  "raised-beds": ["raised garden bed vegetables", "wooden raised bed"],
  tools: ["garden hand tools", "watering can garden"],
  "bird-feeders": ["bird feeder backyard", "hummingbird feeder"],
  "bird-houses": ["bluebird house", "wooden birdhouse"],
  "pollinator-homes": ["mason bee house", "insect hotel"],
  "habitat-plants": ["native plant garden", "pollinator shrubs"],
  "bird-seed": ["bird seed feeder", "songbird feeder"],
  "starter-kits": ["vegetable garden beds", "home vegetable garden"],
  "food-gardens": ["backyard vegetable garden", "kitchen garden"],
};

const BLOCK =
  /cannabis|marijuana|hemp|\bweed\b|\bpot plant\b|pdf$|svg$|webm$|portrait|wedding|koi|cryptocurrency|bitcoin|lithops|ping.?pong|restaurant/i;

function queriesFor(product) {
  const sub = SUB_QUERIES[product.subCategory] || [];
  return [...sub, product.title.replace(/[—–]/g, " "), `${product.collection} garden equipment`];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function wikiSearch(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&format=json&srlimit=12&srsearch=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.query?.search || [])
    .map((row) => row.title)
    .filter((title) => /\.(jpe?g|png)$/i.test(title) && !BLOCK.test(title));
}

async function wikiFileUrl(title) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|mime&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const data = await res.json();
  const page = Object.values(data.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  if (!info?.url) return null;
  if (info.mime && !String(info.mime).startsWith("image/")) return null;
  if (info.size && info.size < 20000) return null;
  return { title, url: info.url, width: info.width, height: info.height };
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok || !res.body) throw new Error(`${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function main() {
  const used = new Set();
  const sources = {};
  let ok = 0;
  let miss = 0;

  for (const [index, product] of catalog.products.entries()) {
    const dest = join(outDir, `${product.handle}.jpg`);
    let chosen = null;
    for (const query of queriesFor(product)) {
      process.stdout.write(`[${index + 1}/${catalog.products.length}] ${product.handle} ← ${query}\n`);
      const titles = await wikiSearch(query);
      await sleep(120);
      for (const title of titles) {
        if (used.has(title)) continue;
        const file = await wikiFileUrl(title);
        await sleep(80);
        if (!file) continue;
        chosen = file;
        break;
      }
      if (chosen) break;
    }
    if (!chosen) {
      miss += 1;
      console.log("  miss");
      continue;
    }
    try {
      await download(chosen.url, dest);
      used.add(chosen.title);
      sources[product.handle] = chosen;
      ok += 1;
      console.log("  ok", chosen.title);
    } catch (err) {
      miss += 1;
      console.log("  fail", err.message || err);
    }
  }

  writeFileSync(join(outDir, "SOURCES.json"), JSON.stringify(sources, null, 2));
  console.log(`Saved ${ok} Wikimedia equipment photos, ${miss} missing.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
