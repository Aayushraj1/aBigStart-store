// Product catalog. Prices are in rupees. `compare` is the old (struck-through) price.
// status: "available" | "sold-out" | "coming-soon"
// Photos and prices come from spaceshope.in (Shopify CDN) as placeholders for now.

const CDN = "https://cdn.shopify.com/s/files/1/0823/7459/0699/files/";

const PRODUCTS = [
  {
    id: "cone-lamp",
    name: "VLC Cone Lamp",
    blurb: "Traffic cone outside. Mood light inside.",
    fact: "IT'S A LAMP",
    accent: "cone",
    status: "available",
    badge: "SAY WHAT?!",
    price: 995,
    compare: null,
    description:
      "The road-side icon, reborn as a warm glow for your room. Bold, bright and built tough, it's lighting that people ask about before they say hello.",
    details: [
      ["Power", "Plug-in wire (not rechargeable)"],
      ["Material", "Unbreakable plastic"],
    ],
    images: [
      "9F3E39BE-4322-42FC-A3C7-301B6AF494F4.jpg?v=1778587261",
      "79F2010A-F6E5-4B84-BBDC-7F79C8DF13DA.png?v=1778740916",
      "390A51B1-6FA8-402E-85EA-CC5B1877CDA0.png?v=1778740916",
      "B8B8DC9E-E3C1-4E10-AF0D-C2C8AAFFD1EE.png?v=1778587233",
      "7F43A9F1-6E16-4505-86BD-795C08013894.jpg?v=1788683954",
    ],
    alt: "Glowing orange and white traffic cone lamp on a marble floor",
  },
  {
    id: "uno-mirror",
    name: "Uno Card Mirror",
    blurb: "Play the reverse card on your reflection.",
    fact: "1.5 FT TALL",
    accent: "mustard",
    status: "available",
    description:
      "A wall mirror shaped like the most powerful card in the game. Made from acrylic, so it's lighter and safer than glass, with a hole at the top for easy hanging.",
    details: [
      ["Size", "1.5 ft × 12 in"],
      ["Material", "Acrylic (lighter and safer than glass)"],
      ["Hanging", "Hole at the top for a nail or hook"],
    ],
    note: "Acrylic reflects a little less sharply than glass, so expect a slightly wobbly reflection.",
    option: {
      name: "Color",
      type: "swatch",
      values: [
        { label: "Red", swatch: "#E3262F", price: 895, compare: 995, image: "9C4BB2B1-9C1E-4C6A-823E-C953F5E31D80.png?v=1779005739" },
        { label: "Yellow", swatch: "#F5C518", price: 895, compare: 995, image: "C0E159FE-6FCD-42C5-954F-A311459D1C09.png?v=1779007883" },
        { label: "Blue", swatch: "#1F5FD1", price: 895, compare: 995, image: "C054ACCA-3093-473C-ADD9-869732C5AAE1.png?v=1779005739" },
        { label: "Set of 3", swatch: "conic-gradient(#E3262F 0 33%, #F5C518 0 66%, #1F5FD1 0)", price: 1695, compare: 2995, image: "IMG-4718.png?v=1787649305" },
      ],
    },
    images: ["2237CC79-3126-435C-A53F-950DC5ACAD84.png?v=1779005202"],
    alt: "Uno reverse card shaped mirror hanging on a wall",
  },
  {
    id: "convex-mirror",
    name: "Convex Mirror",
    blurb: "The road-corner mirror, now watching your room.",
    fact: "18 × 18 IN",
    accent: "cobalt",
    status: "coming-soon",
    description:
      "A glossy red convex mirror with a wide-angle view, straight from the street corner. Pick a design with a message, or keep it clean. Made for bedrooms, cafés and lounges.",
    details: [
      ["Size", "18 × 18 in"],
      ["Finish", "Glossy red frame, wide-angle convex glass"],
    ],
    option: {
      name: "Design",
      type: "pill",
      values: [
        { label: "Today we slay", price: 2495, compare: 2995, image: "31EC6C3A-F009-4FC2-9EE3-03CAE55446A8.jpg?v=1788774588" },
        { label: "Dekho Magar Pyaar se", price: 2495, compare: 2995, image: "IMG-5167.png?v=1788774856" },
        { label: "No text", price: 2495, compare: 2995, image: "IMG-5164.jpg?v=1788774878" },
        { label: "Warning!", price: 2495, compare: 2995, image: "5DABD0BF-4495-4C2E-A106-495B4C3292CA.png?v=1791192283" },
        { label: "Aaj ka look", price: 2495, compare: 2995, image: "IMG-5947.png?v=1791192323" },
      ],
    },
    images: ["IMG-5165.jpg?v=1788985943"],
    alt: "Round red convex mirror on a blue wall",
  },
  {
    id: "uno-table",
    name: "Uno Table",
    blurb: "The reverse card, big enough for chai.",
    fact: "3 × 2 FT TABLE",
    accent: "lime",
    status: "sold-out",
    price: 3500,
    compare: 5000,
    description:
      "A bright red Uno reverse card you can put your feet up next to. Wooden top, slim metal hairpin legs, and a story for every guest who sits down.",
    details: [
      ["Size", "3 × 2 ft, 1.5 ft high"],
      ["Top", "Wood"],
      ["Legs", "Metal"],
    ],
    images: [
      "IMG-5948.png?v=1791193775",
      "IMG-5949.png?v=1791193790",
      "435AB387-CFD2-459B-BC1E-9D4703E7C5CF.png?v=1788591920",
      "96DD521F-C410-4E3B-9E9F-B0C4C605423C.png?v=1788591920",
    ],
    alt: "Red Uno reverse card coffee table with black metal legs in a living room",
  },
];

function imageUrl(file, width) {
  return `${CDN}${file}&width=${width}`;
}
