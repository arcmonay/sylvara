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

async function toWebp(input, output, width, height) {
  const tmp = `${output}.tmp.webp`;
  await sharp(input)
    .resize(width, height, { fit: "cover", position: "centre" })
    .sharpen({ sigma: 0.4 })
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

async function main() {
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
  for (const name of mediaNames) {
    const src =
      library.find((f) => f.startsWith(name)) ||
      library[mediaNames.indexOf(name) % library.length];
    await toWebp(join(libraryDir, src), join(mediaDir, `${name}.webp`), 1800, 1200);
  }

  for (const [index, product] of catalog.products.entries()) {
    const byId = library.find((f) => f.startsWith(`${product.photoId}`));
    const file = byId || library[index % library.length];
    const out = join(productDir, `${product.handle}.webp`);
    await toWebp(join(libraryDir, file), out, 1200, 1400);
    product.image = `/products/${product.handle}.webp`;
    product.images = [product.image];
  }

  catalog.generatedAt = new Date().toISOString();
  writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
  console.log(`Applied photos to ${catalog.products.length} products.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
