// Fake data

//2,399,929 2,370,918 2,342,046 2,314,238 2,285,709 2,265,234 2,243,665 2,196,714 2,131,659 2,042,488 1,989,282 -
const data = [
  {
    year: 2009,
    aData: 2399929,
    bData: 1450000
  },
  {
    year: 2010,
    aData: 2370918,
    bData: 1370000
  },
  {
    year: 2011,
    aData: 2342046,
    bData: 1280000
  },
  {
    year: 2012,
    aData: 2285709,
    bData: 1200000
  },
  {
    year: 2013,
    aData: 2265234,
    bData: 1130000
  },
  {
    year: 2014,
    aData: 2243665,
    bData: 1070000
  },
  {
    year: 2015,
    aData: 2196714,
    bData: 1030000
  }
];
const color = ["lightgreen", "lightblue"];
// Create SVG and padding for the chart
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("height", 300)
  .attr("width", 600);

const strokeWidth = 1.5;
const margin = { top: 0, bottom: 20, left: 30, right: 20 };
const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);

const width = +svg.attr("width") - margin.left - margin.right - strokeWidth * 2;
const height = +svg.attr("height") - margin.top - margin.bottom;
const grp = chart
  .append("g")
  .attr("transform", `translate(-${margin.left - strokeWidth},-${margin.top})`);

// Create stack
const stack = d3.stack().keys(["aData", "bData"]);
const stackedValues = stack(data);
const stackedData = [];
// Copy the stack offsets back into the data.
stackedValues.forEach((layer, index) => {
  const currentStack = [];
  layer.forEach((d, i) => {
    currentStack.push({
      values: d,
      year: data[i].year
    });
  });
  stackedData.push(currentStack);
});

// Create scales
const yScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(stackedValues[stackedValues.length - 1], dp => dp[1])]);
const xScale = d3
  .scaleLinear()
  .range([0, width])
  .domain(d3.extent(data, dataPoint => dataPoint.year));

const area = d3
  .area()
  .x(dataPoint => xScale(dataPoint.year))
  .y0(dataPoint => yScale(dataPoint.values[0]))
  .y1(dataPoint => yScale(dataPoint.values[1]));

const series = grp
  .selectAll(".series")
  .data(stackedData)
  .enter()
  .append("g")
  .attr("class", "series");

series
  .append("path")
  .attr("transform", `translate(${margin.left},0)`)
  .style("fill", (d, i) => color[i])
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", strokeWidth)
  .attr("d", d => area(d));

// Add the X Axis
chart
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale).ticks(data.length));

// Add the Y Axis
chart
  .append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(yScale));