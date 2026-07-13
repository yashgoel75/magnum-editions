export interface Plate {
  id: string;
  src: string;
  alt: string;
  plateNo: string;
  year: string;
  location: string;
  edition: number;
}

export interface Photographer {
  slug: string;
  name: string;
  note: string;
  plates: Plate[];
}

// Placeholder archival frames — swap `src` for real CDN URLs
// (e.g. store.magnumphotos.com/cdn/shop/files/…) when wiring up live data.
// The seed keeps each plate stable across reloads; grayscale mimics the
// silver-gelatin look of the source catalogue.
const frame = (seed: string, w = 900, h = 1100) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;

export const photographers: Photographer[] = [
  {
    slug: "r-ashford",
    name: "R. Ashford",
    note: "Post-war reportage, London & the docks",
    plates: [
      { id: "ra-01", src: frame("ashford-01"), alt: "Dockworkers at dawn", plateNo: "PL. 014", year: "1958", location: "Rotherhithe", edition: 100 },
      { id: "ra-02", src: frame("ashford-02"), alt: "Terraced street, rain", plateNo: "PL. 015", year: "1959", location: "Bethnal Green", edition: 100 },
      { id: "ra-03", src: frame("ashford-03"), alt: "Market stall, morning", plateNo: "PL. 016", year: "1958", location: "Spitalfields", edition: 100 },
      { id: "ra-04", src: frame("ashford-04"), alt: "Children on a bombsite", plateNo: "PL. 017", year: "1957", location: "Poplar", edition: 100 },
      { id: "ra-05", src: frame("ashford-05"), alt: "Tugboat crew, low tide", plateNo: "PL. 018", year: "1960", location: "Wapping", edition: 100 },
    ],
  },
  {
    slug: "m-quayle",
    name: "M. Quayle",
    note: "Portraiture and the theatre world",
    plates: [
      { id: "mq-01", src: frame("quayle-01"), alt: "Actor backstage", plateNo: "PL. 021", year: "1971", location: "Soho", edition: 100 },
      { id: "mq-02", src: frame("quayle-02"), alt: "Rehearsal, half-light", plateNo: "PL. 022", year: "1972", location: "Covent Garden", edition: 100 },
      { id: "mq-03", src: frame("quayle-03"), alt: "Portrait, studio window", plateNo: "PL. 023", year: "1970", location: "Fitzrovia", edition: 100 },
      { id: "mq-04", src: frame("quayle-04"), alt: "Costume fitting", plateNo: "PL. 024", year: "1973", location: "Shaftesbury Ave", edition: 100 },
      { id: "mq-05", src: frame("quayle-05"), alt: "Curtain call", plateNo: "PL. 025", year: "1971", location: "West End", edition: 100 },
    ],
  },
  {
    slug: "j-bellwood",
    name: "J. Bellwood",
    note: "Coastal life & industry in decline",
    plates: [
      { id: "jb-01", src: frame("bellwood-01"), alt: "Shipyard gantry", plateNo: "PL. 031", year: "1984", location: "Sunderland", edition: 100 },
      { id: "jb-02", src: frame("bellwood-02"), alt: "Miners, end of shift", plateNo: "PL. 032", year: "1983", location: "Durham", edition: 100 },
      { id: "jb-03", src: frame("bellwood-03"), alt: "Fishing boats, harbour", plateNo: "PL. 033", year: "1985", location: "Whitby", edition: 100 },
      { id: "jb-04", src: frame("bellwood-04"), alt: "Terrace row, winter", plateNo: "PL. 034", year: "1984", location: "Gateshead", edition: 100 },
      { id: "jb-05", src: frame("bellwood-05"), alt: "Chapel congregation", plateNo: "PL. 035", year: "1986", location: "Tyneside", edition: 100 },
    ],
  },
  {
    slug: "s-okafor",
    name: "S. Okafor",
    note: "Notting Hill Carnival & street culture",
    plates: [
      { id: "so-01", src: frame("okafor-01"), alt: "Sound system, afternoon", plateNo: "PL. 041", year: "1989", location: "Notting Hill", edition: 100 },
      { id: "so-02", src: frame("okafor-02"), alt: "Costume detail", plateNo: "PL. 042", year: "1990", location: "Ladbroke Grove", edition: 100 },
      { id: "so-03", src: frame("okafor-03"), alt: "Crowd, steel drums", plateNo: "PL. 043", year: "1988", location: "Notting Hill", edition: 100 },
      { id: "so-04", src: frame("okafor-04"), alt: "Portrait, mas band", plateNo: "PL. 044", year: "1991", location: "Notting Hill", edition: 100 },
      { id: "so-05", src: frame("okafor-05"), alt: "Evening, sound check", plateNo: "PL. 045", year: "1989", location: "Notting Hill", edition: 100 },
    ],
  },
  {
    slug: "e-marchmont",
    name: "E. Marchmont",
    note: "Rural England, quiet interiors",
    plates: [
      { id: "em-01", src: frame("marchmont-01"), alt: "Farmhouse kitchen", plateNo: "PL. 051", year: "1966", location: "Cotswolds", edition: 100 },
      { id: "em-02", src: frame("marchmont-02"), alt: "Sheep fold, mist", plateNo: "PL. 052", year: "1967", location: "Yorkshire Dales", edition: 100 },
      { id: "em-03", src: frame("marchmont-03"), alt: "Village fete", plateNo: "PL. 053", year: "1965", location: "Suffolk", edition: 100 },
      { id: "em-04", src: frame("marchmont-04"), alt: "Hedgerow, late light", plateNo: "PL. 054", year: "1968", location: "Devon", edition: 100 },
      { id: "em-05", src: frame("marchmont-05"), alt: "Church porch", plateNo: "PL. 055", year: "1966", location: "Norfolk", edition: 100 },
    ],
  },
];

export const allPlates: (Plate & { photographer: string; slug: string })[] =
  photographers.flatMap((p) =>
    p.plates.map((plate) => ({ ...plate, photographer: p.name, slug: p.slug }))
  );

// Deterministic placeholder pricing, keyed off the plate id, so every plate
// has a stable price without hand-authoring one per entry. Swap for real
// pricing from the product feed when wiring this up to live data.
export function priceForPlate(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return 140 + (hash % 29) * 10; // £140 – £420, in steps of £10
}

export function formatPrice(id: string): string {
  return `£${priceForPlate(id)}`;
}
