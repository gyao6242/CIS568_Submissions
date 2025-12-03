const svg = d3.select("#map");
const width = 900;
const height = 600;

// Create a Mercator projection
const projection = d3.geoMercator()
  .scale(width / 2 / Math.PI)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

// Load world map via TopoJSON
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  .then(worldData => {
    const countries = topojson.feature(worldData, worldData.objects.countries);

    // Draw land
    svg.append("g")
      .selectAll("path")
      .data(countries.features)
      .join("path")
        .attr("class", "land")
        .attr("d", path);

    // Draw borders
    svg.append("path")
      .datum(topojson.mesh(worldData, worldData.objects.countries, (a, b) => a !== b))
      .attr("class", "boundary")
      .attr("d", path);
  });