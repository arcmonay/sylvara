export type Guide = {
  slug: string;
  title: string;
  dek: string;
  minutes: number;
  category: string;
  products: string[];
  sections: { heading: string; body: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "start-vegetable-garden",
    title: "How to start a vegetable garden",
    dek: "Sun, a bed, seed you will actually eat, and a way to water that does not depend on memory.",
    minutes: 9,
    category: "Food",
    products: ["first-time-vegetable-garden", "raised-bed-4x8", "beginner-seed-crate", "raised-bed-irrigation-kit"],
    sections: [
      {
        heading: "Start with dinner, not a catalog",
        body: "A first garden fails when it tries to grow everything. Pick five crops your household already buys: lettuce, beans, a cherry tomato, basil, and one wild card. If you will not eat it, do not sow it. The First-Time Vegetable Garden bundle exists because the parts list is what stops people — bed, soil, seed, drip, tools — not a lack of enthusiasm.",
      },
      {
        heading: "Light is the real estate",
        body: "Vegetables want six hours of direct sun. South-facing yards in the Hudson Valley still have maple shade; walk the spot at 10, 1, and 4 before you build. If you only have a balcony, skip the 4×8 and use the Balcony Food Garden. Fighting light with fertilizer never works.",
      },
      {
        heading: "Soil is a volume problem",
        body: "A 4×8×11 bed needs roughly 24 cubic feet of mix. Buy amendment plus bulk topsoil; a few pretty bags will not fill it. Test pH if you are on fill dirt. Then mulch. Bare soil is a watering hobby.",
      },
      {
        heading: "Water on a schedule you will keep",
        body: "Hand watering is a courtship. Drip with a $32 timer is a marriage. Install the line before the plants go in, then cover it with mulch. You are not less of a gardener for automating the chore that kills more gardens than beetles do.",
      },
    ],
  },
  {
    slug: "hydroponics-for-beginners",
    title: "Hydroponics for beginners",
    dek: "It is not a laboratory. It is a reservoir, some air, and plants that like wet feet.",
    minutes: 8,
    category: "Hydroponics",
    products: ["backyard-hydroponics-starter", "grove-six-dwc-system", "pocket-ph-meter", "lettuce-cut-mix"],
    sections: [
      {
        heading: "Start in water with lettuce, not tomatoes",
        body: "Deep Water Culture is the honest beginner method: roots hang in oxygenated nutrient solution. Lettuce and basil forgive you. Fruiting tomatoes in a six-site tub will teach you bitterness. The Grove Six plus a pH pen is enough. NFT gutters can wait.",
      },
      {
        heading: "pH is the whole game",
        body: "If the water sits outside 5.5–6.5, nutrients are present and invisible to the plant. Buy the pen. Calibrate it. The Adjust Kit is a consumable, like salt. Skipping this step is how people decide hydroponics “doesn’t work.”",
      },
      {
        heading: "Light still matters",
        body: "A bright window in July may be enough for basil. A spare room in January is not. A 150W full-spectrum bar over a 2×4 of greens is the difference between spindly and supper. Hydroponics does not replace the sun; it replaces soil.",
      },
    ],
  },
  {
    slug: "build-drip-irrigation",
    title: "How to build a drip irrigation system",
    dek: "Measure the run, tame the pressure, filter the grit, then lay line where the roots are.",
    minutes: 10,
    category: "Water",
    products: ["automatic-watering-kit", "drip-starter-50", "pressure-regulator", "disc-filter", "irrigation-tube-100"],
    sections: [
      {
        heading: "The order of operations",
        body: "Spigot → timer → filter → pressure regulator → mainline → drip or emitters. Reverse any two and you get fountains or clogs. City water is often 60 PSI; drip wants about 25. The brass regulator is not an upsell.",
      },
      {
        heading: "Kits assume the garden is next to the house",
        body: "It rarely is. Measure from bib to the farthest bed. If it is more than 25 feet, add 100 feet of mainline and the connector tin. This is the step that makes people think drip is “complicated.” It is just distance.",
      },
      {
        heading: "Well water and rain barrels are different animals",
        body: "Wells carry grit — canister plus disc filter. Barrels do not have pressure — add a transfer pump. Then drip. Our irrigation builder asks these questions because the parts change even when the plants do not.",
      },
    ],
  },
  {
    slug: "how-much-water",
    title: "How much water does a garden actually need?",
    dek: "An inch a week is a proverb, not a measurement. Roots, mulch, and weather do the real math.",
    minutes: 7,
    category: "Water",
    products: ["drip-starter-50", "cedar-mulch", "rain-barrel-50", "smart-irrigation-controller"],
    sections: [
      {
        heading: "An inch is a starting rumor",
        body: "Newly sown seed wants the surface damp. Established tomatoes want a deep drink at the root and a dry neck. Lettuce is greedy and shallow. One oscillating sprinkler treats them as the same crop. They are not.",
      },
      {
        heading: "Mulch is irrigation equipment",
        body: "An inch of cedar over drip line cuts evaporation enough that you can skip a cycle after rain. Bare soil in July is a water feature. If you buy only one conservation product besides drip, buy mulch.",
      },
      {
        heading: "Harvest roof water for the beds, not the lawn",
        body: "A 50-gallon barrel will not run a lawn. It will run two 4×8s through a dry spell if you drip, not spray. Pair it with a pump if you want pressure. Gravity is charming and often insufficient.",
      },
    ],
  },
  {
    slug: "tomatoes-from-seed",
    title: "How to grow tomatoes from seed",
    dek: "Start early, keep them warm, give them light, and do not plant a beefsteak in a 6-inch pot.",
    minutes: 8,
    category: "Seeds",
    products: ["brandywine-tomato-seeds", "organic-cherry-tomato", "propagate-bar", "seedling-heat-mat", "tomato-cage-pair"],
    sections: [
      {
        heading: "Cherries forgive; Brandywines keep you honest",
        body: "If this is year one, sow the organic cherry. If you have a full season and a cage, sow Brandywine or Cherokee Purple and save seed from the fruit you liked. That is the vault’s entire thesis.",
      },
      {
        heading: "Heat and light in February",
        body: "Peppers and tomatoes sulk under 70°F. A heat mat under a 10×20 tray and a 40W bar close to the leaves prevent the leggy march toward a distant window. Start 6–8 weeks before last frost — not on New Year’s Day, and not the week you want fruit.",
      },
      {
        heading: "The cage is not optional",
        body: "Indeterminate heirlooms will find the ground and rot there. Set the cage at transplant. Drip at the root. Mulch. Prune if you like; water evenly if you want fruit that is not bitter.",
      },
    ],
  },
  {
    slug: "what-are-heirloom-seeds",
    title: "What are heirloom seeds?",
    dek: "Open-pollinated varieties with a story and a future you can hold in a tin.",
    minutes: 6,
    category: "Seeds",
    products: ["heirloom-vault-box", "brandywine-tomato-seeds", "cherokee-purple-seeds"],
    sections: [
      {
        heading: "Open-pollinated, not antique for its own sake",
        body: "An heirloom is a variety that breeds true from saved seed, usually with a history of being kept by people who ate it. Hybrid seed can be excellent; you just cannot save it and expect the same plant. We sell both honesty and romance — labeled as such.",
      },
      {
        heading: "Flavor is a genetic trait",
        body: "Brandywine exists because someone refused a firmer, paler shipping tomato. Growing it is not nostalgia; it is a vote for a flavor the grocery chain cannot stock. Diversity in the tin is diversity on the table.",
      },
      {
        heading: "The vault is a habit",
        body: "A cool, dark closet and dated envelopes beat a pretty rack above the stove. Our Seed Vault Box is a tin on purpose. Heat and light retire germination. Treat seed like a pantry staple with an expiration, not like décor.",
      },
    ],
  },
  {
    slug: "how-to-save-seeds",
    title: "How to save seeds",
    dek: "Ferment tomatoes, dry beans on the plant, and keep the wet crops from rotting in a drawer.",
    minutes: 9,
    category: "Seeds",
    products: ["heirloom-vault-box", "brandywine-tomato-seeds", "provider-bean-seeds"],
    sections: [
      {
        heading: "Only save what breeds true",
        body: "Open-pollinated tomatoes, beans, lettuce, and herbs are the homework-friendly crops. Squash cross with everything in the zip code. If you want to learn, start with a tomato you loved and a bean row.",
      },
      {
        heading: "Tomatoes want a jar, not a paper towel",
        body: "Scoop the gel, add a little water, ferment two or three days until it stinks, rinse, dry fully, label with year and variety. This knocks back some seed-borne disease and separates viable seed. It is kitchen work, not a lab.",
      },
      {
        heading: "Dry, dark, dated",
        body: "A mason jar with a silica pack in a closet will outlive a craft envelope on a sunny shelf. Write the year. Germination falls off; that is biology. Grow a few extra plants the following season from last year’s tin — that is how varieties survive.",
      },
    ],
  },
  {
    slug: "pollinator-garden",
    title: "How to build a pollinator garden",
    dek: "Forage, water, nesting, and a truce with mess. Hotels without flowers are furniture.",
    minutes: 8,
    category: "Habitat",
    products: ["pollinator-garden-kit", "mason-bee-hotel", "common-milkweed", "zinnia-pollinator-mix", "habitat-collection"],
    sections: [
      {
        heading: "Food first",
        body: "A mason bee hotel on a blank wall is a movie set. Plant zinnias for easy annual forage, milkweed for monarchs that actually live here, and coneflower for the long game. Native mixes beat a can labeled “wildflower” that is 40% annuals from another continent.",
      },
      {
        heading: "Leave the stems",
        body: "Many native bees nest in pithy stalks and leaf litter. If you cut the garden to the ground in October, you threw out the nursery. Spring cleanup, not fall annihilation.",
      },
      {
        heading: "Stop spraying the buffet",
        body: "Neem at dusk on a specific aphid outbreak is not the same as a weekly “preventative.” Broad insecticides and a pollinator kit cannot share a household. Choose.",
      },
    ],
  },
  {
    slug: "set-up-greenhouse",
    title: "How to set up a greenhouse",
    dek: "Pad, ventilation, water, then plants. The order people reverse is the order that cooks a crop.",
    minutes: 10,
    category: "Greenhouses",
    products: ["greenhouse-starter-package", "yardhouse-6x8", "roof-vent-kit", "gh-drip-kit", "exhaust-gh-fan"],
    sections: [
      {
        heading: "The pad is the building",
        body: "Out of level by an inch and doors will not latch, vents will bind, and you will hate the house. Timber base or compacted gravel. Do not assemble walls on a lawn and hope.",
      },
      {
        heading: "Heat is optional; air is not",
        body: "A sealed polycarbonate box in July is a death oven for pollen. Automatic wax vents plus an exhaust fan are the first accessories, not décor. Heaters matter in zone 5 winters; they do not replace roof vents in June.",
      },
      {
        heading: "Water as a zone",
        body: "Wand-watering a greenhouse is how people go on vacation and come home to sticks. A 16-stake drip kit and a timer are cheaper than a crop. Benches beat floors. Floors grow fungus gnats as a personality.",
      },
    ],
  },
  {
    slug: "indoor-growing-beginners",
    title: "Indoor growing for beginners",
    dek: "A shelf, a timer, and herbs you already buy in plastic clamshells.",
    minutes: 7,
    category: "Indoor",
    products: ["indoor-herb-garden", "four-tier-shelf", "lumen-bar-150", "smart-outlet-timer"],
    sections: [
      {
        heading: "Do not start with a 4×4 tent",
        body: "Tents are for people who already know they will grow through winter with intent. A four-tier shelf in the kitchen teaches the habit: light, water, harvest, repeat. If you still have basil in March, then talk about tents.",
      },
      {
        heading: "Timers are more important than fixtures",
        body: "Plants want a boring day length. Humans forget. A $29 outlet timer is the device that keeps indoor gardens alive during a long weekend. Put the light on 14 hours for herbs and greens.",
      },
      {
        heading: "Air and saucers",
        body: "A clip fan prevents mildew on a crowded shelf. A waterproof tray prevents the downstairs conversation. Indoor growing is 30% horticulture and 70% being a considerate roommate of your own house.",
      },
    ],
  },
  {
    slug: "grow-food-year-round",
    title: "How to grow food year-round",
    dek: "Match the crop to the season and the room. Do not ask a backyard tomato to be a January plant.",
    minutes: 9,
    category: "Food",
    products: ["year-round-food-system", "indoor-herb-garden", "grove-six-dwc-system", "yardhouse-6x8"],
    sections: [
      {
        heading: "The calendar is the system",
        body: "February: seed under lights. May: beds and tomatoes. July: drip and shade cloth. October: kale and a greenhouse. January: DWC lettuce and the herb shelf. Year-round food is crop rotation across rooms, not one heroic plant.",
      },
      {
        heading: "Greens in water, fruit in sun",
        body: "Hydroponic lettuce in a spare room is rational. Hydroponic Brandywines in a closet is a hobby. Put fruiting crops where the sun or a 300W bar can earn them. Put leaves where the DWC already wins.",
      },
      {
        heading: "A greenhouse stretches; it does not abolish winter",
        body: "An unheated 6×8 in the Hudson Valley will carry greens and herbs deep into the shoulder seasons. Tomatoes in January want heat you will pay for. Decide what “year-round” means in dollars before you buy a heater sized for pride.",
      },
    ],
  },
];

export function getGuides() {
  return GUIDES;
}

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
