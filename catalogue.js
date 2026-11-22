// ============================================================
// Kayan Enterprises - IPM catalogue data (language-neutral).
// Names, pests and crops are translated in i18n.js:
//   lure:  pest.<key>, crops.<key>      trap: trap.<key>.n / .d / .s
//   kit:   p.<key>.n / .d
// Photos: drop media/products/<id>.jpg to replace the placeholder <id>.svg
// ============================================================
const SERIES = {"fly": "OrchardGuard", "palm": "PalmShield", "moth": "FieldGuard", "cane": "FieldGuard", "soil": "FieldGuard"};
const CATALOG = [
  {
    "id": "lure-oriental-fly",
    "key": "oriental-fly",
    "type": "lure",
    "group": "fly",
    "latin": "Bactrocera dorsalis",
    "traps": [
      "glass",
      "mcphail",
      "dumbbell",
      "water"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-melon-fly",
    "key": "melon-fly",
    "type": "lure",
    "group": "fly",
    "latin": "Bactrocera cucurbitae",
    "traps": [
      "glass",
      "mcphail",
      "dumbbell",
      "water"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-red-palm-weevil",
    "key": "red-palm-weevil",
    "type": "lure",
    "group": "palm",
    "latin": "Rhynchophorus ferrugineus",
    "traps": [
      "bucket"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-rhino-beetle",
    "key": "rhino-beetle",
    "type": "lure",
    "group": "palm",
    "latin": "Oryctes rhinoceros",
    "traps": [
      "bucket"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-banana-weevil",
    "key": "banana-weevil",
    "type": "lure",
    "group": "palm",
    "latin": "Cosmopolites sordidus",
    "traps": [
      "bucket"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-cotton-bollworm",
    "key": "cotton-bollworm",
    "type": "lure",
    "group": "moth",
    "latin": "Helicoverpa armigera",
    "traps": [
      "funnel",
      "delta"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-spotted-bollworm",
    "key": "spotted-bollworm",
    "type": "lure",
    "group": "moth",
    "latin": "Earias vittella",
    "traps": [
      "funnel",
      "delta"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-pink-bollworm",
    "key": "pink-bollworm",
    "type": "lure",
    "group": "moth",
    "latin": "Pectinophora gossypiella",
    "traps": [
      "funnel",
      "delta"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-tobacco-cutworm",
    "key": "tobacco-cutworm",
    "type": "lure",
    "group": "moth",
    "latin": "Spodoptera litura",
    "traps": [
      "funnel",
      "delta"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-beet-armyworm",
    "key": "beet-armyworm",
    "type": "lure",
    "group": "moth",
    "latin": "Spodoptera exigua",
    "traps": [
      "funnel",
      "delta"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-fall-armyworm",
    "key": "fall-armyworm",
    "type": "lure",
    "group": "moth",
    "latin": "Spodoptera frugiperda",
    "traps": [
      "funnel",
      "delta"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-diamondback-moth",
    "key": "diamondback-moth",
    "type": "lure",
    "group": "moth",
    "latin": "Plutella xylostella",
    "traps": [
      "funnel",
      "delta",
      "water"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-tomato-leafminer",
    "key": "tomato-leafminer",
    "type": "lure",
    "group": "moth",
    "latin": "Tuta absoluta",
    "traps": [
      "delta",
      "water"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-brinjal-borer",
    "key": "brinjal-borer",
    "type": "lure",
    "group": "moth",
    "latin": "Leucinodes orbonalis",
    "traps": [
      "delta",
      "funnel"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-legume-pod-borer",
    "key": "legume-pod-borer",
    "type": "lure",
    "group": "moth",
    "latin": "Maruca vitrata",
    "traps": [
      "funnel",
      "delta"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-rice-stem-borer",
    "key": "rice-stem-borer",
    "type": "lure",
    "group": "cane",
    "latin": "Scirpophaga incertulas",
    "traps": [
      "funnel"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-cane-internode-borer",
    "key": "cane-internode-borer",
    "type": "lure",
    "group": "cane",
    "latin": "Chilo sacchariphagus indicus",
    "traps": [
      "funnel",
      "delta"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-cane-shoot-borer",
    "key": "cane-shoot-borer",
    "type": "lure",
    "group": "cane",
    "latin": "Chilo infuscatellus",
    "traps": [
      "funnel",
      "delta"
    ],
    "interest": "Lures"
  },
  {
    "id": "lure-white-grub",
    "key": "white-grub",
    "type": "lure",
    "group": "soil",
    "latin": "Holotrichia consanguinea",
    "traps": [],
    "interest": "Lures"
  },
  {
    "id": "trap-funnel",
    "key": "funnel",
    "type": "trap",
    "interest": "Traps"
  },
  {
    "id": "trap-delta",
    "key": "delta",
    "type": "trap",
    "interest": "Traps"
  },
  {
    "id": "trap-water",
    "key": "water",
    "type": "trap",
    "interest": "Traps"
  },
  {
    "id": "trap-bucket",
    "key": "bucket",
    "type": "trap",
    "interest": "Traps"
  },
  {
    "id": "trap-glass",
    "key": "glass",
    "type": "trap",
    "interest": "Traps"
  },
  {
    "id": "trap-dumbbell",
    "key": "dumbbell",
    "type": "trap",
    "interest": "Traps"
  },
  {
    "id": "trap-mcphail",
    "key": "mcphail",
    "type": "trap",
    "interest": "Traps"
  },
  {
    "id": "trap-sticky",
    "key": "sticky",
    "type": "trap",
    "interest": "Traps"
  },
  {
    "id": "trap-glue",
    "key": "glue",
    "type": "trap",
    "interest": "Traps"
  },
  {
    "id": "kit-fly",
    "key": "kit",
    "type": "kit",
    "interest": "Kits"
  },
  {
    "id": "kit-palm",
    "key": "kitRpw",
    "type": "kit",
    "interest": "Kits"
  },
  {
    "id": "kit-moth",
    "key": "kitMoth",
    "type": "kit",
    "interest": "Kits"
  }
];

function itemName(item, lang) {
    if (item.type === "lure") return SERIES[item.group] + " " + t("tag.lure", lang) + " \u00B7 " + t("pest." + item.key, lang);
    if (item.type === "trap") return t("trap." + item.key + ".n", lang);
    return t("p." + item.key + ".n", lang);
}

function itemDesc(item) {
    if (item.type === "lure") {
        const pair = item.traps.length
            ? t("works.with") + ": " + item.traps.map(k => t("trap." + k + ".s")).join(" \u00B7 ")
            : t("works.ask");
        return '<span class="latin-inline">' + item.latin + '</span><br>' + t("crops." + item.key) + '<br><span class="pair">' + pair + '</span>';
    }
    if (item.type === "trap") return t("trap." + item.key + ".d");
    return t("p." + item.key + ".d");
}
