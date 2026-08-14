import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const libraryDir = join(root, "assets", "photo-library");
const equipmentDir = join(root, "assets", "equipment-photos");
const productDir = join(root, "public", "products");
const mediaDir = join(root, "public", "media");
const catalogPath = join(root, "data", "catalog.json");
mkdirSync(equipmentDir, { recursive: true });

mkdirSync(productDir, { recursive: true });
mkdirSync(mediaDir, { recursive: true });

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const library = readdirSync(libraryDir).filter((f) =>
  /\.(png|jpe?g|webp)$/i.test(f),
);

if (!library.length) {
  throw new Error(`No photos found in ${libraryDir}`);
}

const mediaNames = [
  "hero",
  "hydroponics",
  "indoor",
  "greenhouse",
  "seeds",
  "irrigation",
  "sustainable",
  "wildlife",
  "systems",
  "learn",
];

const positions = [
  "attention",
  "entropy",
  "centre",
  "north",
  "south",
  "east",
  "west",
  "northeast",
];

async function toWebp(input, output, width, height, { position = "attention", fit = "cover" } = {}) {
  const tmp = `${output}.tmp.webp`;
  await sharp(input)
    .rotate()
    .resize(width, height, {
      fit,
      position,
      background: { r: 243, g: 246, b: 239, alpha: 1 },
    })
    .flatten({ background: { r: 243, g: 246, b: 239 } })
    .sharpen({ sigma: 0.45 })
    .webp({ quality: 84 })
    .toFile(tmp);
  try {
    renameSync(tmp, output);
  } catch {
    copyFileSync(tmp, output);
    try {
      unlinkSync(tmp);
    } catch {
      /* ignore */
    }
  }
}

function pickLibrary(preferredId, index, used) {
  const byId = library.find((f) => f.startsWith(`${preferredId}`));
  if (byId) return byId;
  const unused = library.find(
    (f) =>
      !used.has(f) && !mediaNames.some((name) => f.toLowerCase().startsWith(name)),
  );
  if (unused) return unused;
  return library[index % library.length];
}

async function main() {
  for (const name of mediaNames) {
    if (name === "hero") continue;
    const src =
      library.find((f) => f.toLowerCase().startsWith(name)) ||
      library[mediaNames.indexOf(name) % library.length];
    const dest = join(mediaDir, `${name}.webp`);
    try {
      await toWebp(join(libraryDir, src), dest, 1800, 1200, { position: "attention" });
    } catch (err) {
      console.warn(`skip media ${name}: ${err.message || err}`);
    }
  }

  const equipment = readdirSync(equipmentDir).filter((f) =>
    /\.(png|jpe?g|webp)$/i.test(f),
  );
  const usedPrimary = new Set();
  for (const [index, product] of catalog.products.entries()) {
    const shot = equipment.find((f) =>
      f.toLowerCase().startsWith(`${product.handle}.`),
    );
    const libFile = shot
      ? null
      : pickLibrary(product.photoId, index, usedPrimary);
    const file = shot
      ? join(equipmentDir, shot)
      : join(libraryDir, libFile);
    if (libFile) usedPrimary.add(libFile);
    const out = join(productDir, `${product.handle}.webp`);
    try {
      await toWebp(file, out, 1200, 1400, {
        position: shot ? "attention" : positions[index % positions.length],
        fit: "cover",
      });
    } catch (err) {
      console.warn(`skip ${product.handle}: ${err.message || err}`);
      continue;
    }

    const gallery = [`/products/${product.handle}.webp`];
    if (!shot) {
      const extras = [1, 2]
        .map((offset) => library[(index + offset * 7) % library.length])
        .filter(Boolean);
      for (const [gIndex, extra] of extras.entries()) {
        const handleName = `${product.handle}-${gIndex + 2}.webp`;
        await toWebp(
          join(libraryDir, extra),
          join(productDir, handleName),
          1200,
          1400,
          { position: positions[(index + gIndex + 3) % positions.length] },
        );
        gallery.push(`/products/${handleName}`);
      }
    }

    product.image = `/products/${product.handle}.webp`;
    product.images = gallery;
  }

  catalog.generatedAt = new Date().toISOString();
  writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
  console.log(`Applied photos to ${catalog.products.length} products.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
