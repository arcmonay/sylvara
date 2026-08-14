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
const productDir = join(root, "public", "products");
const mediaDir = join(root, "public", "media");
const catalogPath = join(root, "data", "catalog.json");

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

async function toWebp(input, output, width, height, position = "attention") {
  const tmp = `${output}.tmp.webp`;
  await sharp(input)
    .rotate()
    .resize(width, height, { fit: "cover", position })
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
    const src =
      library.find((f) => f.toLowerCase().startsWith(name)) ||
      library[mediaNames.indexOf(name) % library.length];
    const dest = join(mediaDir, `${name}.webp`);
    if (name === "hero") {
      await toWebp(join(libraryDir, src), dest, 2400, 1280, "attention");
    } else {
      await toWebp(join(libraryDir, src), dest, 1800, 1200, "attention");
    }
  }

  const usedPrimary = new Set();
  for (const [index, product] of catalog.products.entries()) {
    const file = pickLibrary(product.photoId, index, usedPrimary);
    usedPrimary.add(file);
    const out = join(productDir, `${product.handle}.webp`);
    await toWebp(
      join(libraryDir, file),
      out,
      1200,
      1400,
      positions[index % positions.length],
    );

    const gallery = [`/products/${product.handle}.webp`];
    const extras = [1, 2]
      .map((offset) => library[(index + offset * 7) % library.length])
      .filter((f) => f && f !== file);

    for (const [gIndex, extra] of extras.entries()) {
      const handleName = `${product.handle}-${gIndex + 2}.webp`;
      await toWebp(
        join(libraryDir, extra),
        join(productDir, handleName),
        1200,
        1400,
        positions[(index + gIndex + 3) % positions.length],
      );
      gallery.push(`/products/${handleName}`);
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
