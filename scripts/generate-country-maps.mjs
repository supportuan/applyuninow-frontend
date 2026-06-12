import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../src/Images/rev/flags/map");

const countries = {
  "new-zealand_map.svg": { iso: "NZL" },
  "cyprus_map.svg": { iso: "CYP" },
  "denmark_map.svg": { iso: "DNK" },
  "france_map.svg": { name: "France", clipBBox: [-5.5, 41, 10, 51.5] },
  "italy_map.svg": { iso: "ITA" },
  "finland_map.svg": { iso: "FIN" },
  "latvia_map.svg": { iso: "LVA" },
  "malta_map.svg": { iso: "MLT" },
  "norway_map.svg": { name: "Norway", clipBBox: [4, 57, 32, 72] },
  "poland_map.svg": { iso: "POL" },
  "singapore_map.svg": { iso: "SGP" },
  "spain_map.svg": { iso: "ESP" },
};

const WIDTH = 800;
const HEIGHT = 600;
const PADDING = 20;

function ringToPath(ring) {
  if (!ring?.length) return "";
  return ring
    .map((pt, i) => `${i === 0 ? "M" : "L"}${pt[0].toFixed(2)} ${pt[1].toFixed(2)}`)
    .join(" ") + " Z";
}

function ringBBox(ring) {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  ring.forEach(([lon, lat]) => {
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  });
  return { minLon, maxLon, minLat, maxLat };
}

function bboxIntersects(a, b) {
  return !(a.maxLon < b[0] || a.minLon > b[2] || a.maxLat < b[1] || a.minLat > b[3]);
}

function clipGeometry(geometry, clipBBox) {
  if (!clipBBox) return geometry;

  if (geometry.type === "Polygon") {
    const outer = geometry.coordinates[0];
    return bboxIntersects(ringBBox(outer), clipBBox) ? geometry : null;
  }

  if (geometry.type === "MultiPolygon") {
    const polygons = geometry.coordinates.filter((polygon) =>
      bboxIntersects(ringBBox(polygon[0]), clipBBox)
    );
    if (!polygons.length) return null;
    if (polygons.length === 1) {
      return { type: "Polygon", coordinates: polygons[0] };
    }
    return { type: "MultiPolygon", coordinates: polygons };
  }

  return geometry;
}

function geometryToPaths(geometry, project) {
  const paths = [];
  if (!geometry) return paths;

  const process = (geom) => {
    if (geom.type === "Polygon") {
      geom.coordinates.forEach((ring) => {
        const projected = ring.map(project);
        paths.push(ringToPath(projected));
      });
    } else if (geom.type === "MultiPolygon") {
      geom.coordinates.forEach((polygon) => {
        polygon.forEach((ring) => {
          const projected = ring.map(project);
          paths.push(ringToPath(projected));
        });
      });
    }
  };

  process(geometry);
  return paths;
}

function fitProjection(features) {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  const visit = (coords) => {
    if (typeof coords[0] === "number") {
      const [lon, lat] = coords;
      minLon = Math.min(minLon, lon);
      maxLon = Math.max(maxLon, lon);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      return;
    }
    coords.forEach(visit);
  };

  features.forEach((f) => visit(f.geometry.coordinates));

  const lonSpan = maxLon - minLon || 1;
  const latSpan = maxLat - minLat || 1;
  const scaleX = (WIDTH - PADDING * 2) / lonSpan;
  const scaleY = (HEIGHT - PADDING * 2) / latSpan;
  const scale = Math.min(scaleX, scaleY);

  const project = ([lon, lat]) => {
    const x = PADDING + (lon - minLon) * scale;
    const y = HEIGHT - PADDING - (lat - minLat) * scale;
    return [x, y];
  };

  return project;
}

async function main() {
  const res = await fetch(
    "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
  );
  const geojson = await res.json();

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const [filename, lookup] of Object.entries(countries)) {
    const feature = geojson.features.find((f) => {
      if (lookup.name) return f.properties?.name === lookup.name;
      return (
        f.properties?.["ISO3166-1-Alpha-3"] === lookup.iso ||
        f.properties?.["ISO3166-1-Alpha-2"] === lookup.iso
      );
    });

    if (!feature) {
      console.error(`Missing feature for ${filename}`, lookup);
      continue;
    }

    const geometry = clipGeometry(feature.geometry, lookup.clipBBox);
    if (!geometry) {
      console.error(`No geometry after clip for ${filename}`);
      continue;
    }

    const clippedFeature = { geometry };
    const project = fitProjection([clippedFeature]);
    const paths = geometryToPaths(geometry, project);
    const svg = `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
${paths.map((d) => `  <path d="${d}" fill="#1E417C"/>`).join("\n")}
</svg>
`;

    fs.writeFileSync(path.join(outDir, filename), svg);
    console.log("Created", filename);
  }
}

main().catch(console.error);
