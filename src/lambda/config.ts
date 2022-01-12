/** List of spots */
const Spot = [
  {
    id: 107,
    name: "Lyall Bay",
    coordinatex: 174.80395,
    coordinatey: -41.32942,
    picture: "lyall_bay.png",
  },
  {
    id: 7189,
    name: "Castlepoint Gap",
    coordinatex: 176.22495,
    coordinatey: -40.900973,
    picture: "castlepoint_gap.png",
  },
  {
    id: 105,
    name: "Stent Road",
    coordinatex: 173.778619,
    coordinatey: -39.219996,
    picture: "stend_road.png",
  },
];

export const Spots = new Map<
  number,
  {
    id: number;
    name: string;
    coordinatex: number;
    coordinatey: number;
    picture: string;
  }
>();
for (const layer of Spot) Spots.set(layer.id, layer);
