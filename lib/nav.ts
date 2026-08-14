export const GOALS = [
  { slug: "grow-food", title: "Grow More Food", description: "Beds, seed, lights, and complete systems aimed at dinner.", href: "/goals/grow-food" },
  { slug: "save-water", title: "Save Water", description: "Drip, rain harvest, mulch, and timers that water roots — not walkways.", href: "/goals/save-water" },
  { slug: "start-from-seed", title: "Start from Seed", description: "The vault, heat mats, and the lights February actually requires.", href: "/goals/start-from-seed" },
  { slug: "attract-pollinators", title: "Attract Pollinators", description: "Native seed, bee hotels, and a garden that feeds more than people.", href: "/goals/attract-pollinators" },
  { slug: "year-round", title: "Grow Year-Round", description: "Indoor shelves, hydroponic greens, and houses that stretch the season.", href: "/goals/year-round" },
];

export const STYLES = [
  { slug: "indoor", title: "Indoor", description: "Shelves, lights, and herbs that do not need a yard." },
  { slug: "backyard", title: "Backyard", description: "Beds, drip, compost, and the household plot." },
  { slug: "greenhouse", title: "Greenhouse", description: "Houses, benches, vents, heat, and irrigation." },
  { slug: "hydroponic", title: "Hydroponic", description: "Water culture for greens, herbs, and serious production." },
  { slug: "raised-beds", title: "Raised Beds", description: "The 4×8, the soil, and the drip that makes it easy." },
  { slug: "balcony", title: "Balcony", description: "Pots, cherries, and rental-friendly food." },
];

export const PATHS = [
  { slug: "new", title: "I'm New to Growing", href: "/paths/new", description: "Starter kits and the products that explain themselves." },
  { slug: "food-at-home", title: "I Want to Grow Food at Home", href: "/paths/food-at-home", description: "Complete solutions, not a parts list." },
  { slug: "greenhouse", title: "I Have a Greenhouse", href: "/paths/greenhouse", description: "Benches, climate, and irrigation for the house you already own." },
  { slug: "save-water", title: "I Want to Save Water", href: "/paths/save-water", description: "Build a drip system that matches your yard." },
  { slug: "indoors", title: "I Want to Grow Indoors", href: "/paths/indoors", description: "Lights, shelves, and hydroponic greens." },
  { slug: "heirloom", title: "I Want Heirloom Seeds", href: "/seeds/vault", description: "Open-pollinated food crops and the vault they live in." },
  { slug: "habitat", title: "I Want to Attract Birds & Pollinators", href: "/collections/backyard-wildlife", description: "Feeders, houses, and native plantings." },
  { slug: "serious", title: "I'm a Serious Grower", href: "/paths/serious", description: "Production rooms, acre irrigation, tanks, and industrial compost." },
];

export const MEGA = [
  {
    title: "Hydroponics",
    href: "/collections/hydroponics",
    links: [
      { label: "Complete systems", href: "/shop?sub=complete-systems" },
      { label: "Recirculating DWC", href: "/shop?sub=rdwc" },
      { label: "Dutch bucket", href: "/shop?sub=dutch-bucket" },
      { label: "Stainless tanks", href: "/shop?sub=stainless-tanks" },
      { label: "NFT", href: "/shop?sub=nft-systems" },
    ],
  },
  {
    title: "Indoor Growing",
    href: "/collections/indoor-growing",
    links: [
      { label: "Production rooms", href: "/shop?sub=cea-rooms" },
      { label: "LED grow lights", href: "/shop?sub=led-lights" },
      { label: "Grow tents", href: "/shop?sub=grow-tents" },
      { label: "Climate & fans", href: "/shop?sub=ventilation" },
      { label: "Controllers", href: "/shop?sub=controllers" },
    ],
  },
  {
    title: "Greenhouses",
    href: "/collections/greenhouses",
    links: [
      { label: "Backyard houses", href: "/shop?sub=backyard-houses" },
      { label: "Walk-in", href: "/shop?sub=walk-in" },
      { label: "Benches", href: "/shop?sub=gh-benches" },
      { label: "Heat, shade & vents", href: "/shop?sub=gh-climate" },
      { label: "Greenhouse irrigation", href: "/shop?sub=gh-irrigation" },
    ],
  },
  {
    title: "Heirloom Seed Vault",
    href: "/seeds",
    links: [
      { label: "Vegetables", href: "/seeds?type=vegetable" },
      { label: "Herbs", href: "/seeds?type=herb" },
      { label: "Flowers & natives", href: "/seeds?type=flower" },
      { label: "Beginner kits", href: "/seeds?type=collection" },
      { label: "Bulk / Pro", href: "/seeds?type=bulk" },
    ],
  },
  {
    title: "Irrigation & Water",
    href: "/collections/irrigation",
    links: [
      { label: "Commercial irrigation", href: "/shop?sub=commercial-irrigation" },
      { label: "Fertigation", href: "/shop?sub=fertigation" },
      { label: "Cisterns & tanks", href: "/shop?sub=rain-storage" },
      { label: "Septic tanks", href: "/shop?sub=septic-tanks" },
      { label: "Build your system", href: "/irrigation-builder" },
    ],
  },
  {
    title: "Garden & Habitat",
    href: "/collections/sustainable-gardening",
    links: [
      { label: "Raised beds", href: "/shop?sub=raised-beds" },
      { label: "Industrial composters", href: "/shop?sub=industrial-compost" },
      { label: "Soil & fertility", href: "/shop?sub=soil" },
      { label: "Birds & feeders", href: "/collections/backyard-wildlife" },
      { label: "Pollinator homes", href: "/shop?sub=pollinator-homes" },
    ],
  },
];
