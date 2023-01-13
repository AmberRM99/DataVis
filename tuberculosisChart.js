// console.log('read file')
// var TBdata = [
//     {
//       year: 2009,
//       popularity: 1299
//     },
//     {
//       year: 2010,
//       popularity: 912
//     },
//     {
//       year: 2011,
//       popularity: 986
//     },
//     {
//       year: 2012,
//       popularity: 996
//     },
//     {
//       year: 2013,
//       popularity: 1012
//     },
//     {
//       year: 2014,
//       popularity: 1035
//     },
//     {
//       year: 2015,
//       popularity: 994
//     },
//     {
//       year: 2016,
//       popularity: 1016
//     },
//     {
//       year: 2017,
//       popularity: 1057
//     },
//     {
//       year: 2018,
//       popularity: 1103
//     },
//     {
//       year: 2019,
//       popularity: 1122
//     }
//   ];
  
//   // Create SVG and padding for the chart
//   const TBsvg = d3
//     .select("#TB")
//     .append("svg")
//     .attr("height", 300)
//     .attr("width", 600);
//   const TBmargin = { top: 0, bottom: 20, left: 30, right: 20 };
//   const TBchart = TBsvg.append("g").attr("transform", `translate(${TBmargin.left},0)`);
//   const TBwidth = +TBsvg.attr("width") - TBmargin.left - TBmargin.right;
//   const TBheight = +TBsvg.attr("height") - TBmargin.top - TBmargin.bottom;
//   const TBgrp = TBchart
//     .append("g")
//     .attr("transform", `translate(-${TBmargin.left},-${TBmargin.top})`);
  
//   // Add empty scales group for the scales to be attatched to on update 
//   TBchart.append("g").attr("class", "x-axis");
//   TBchart.append("g").attr("class", "y-axis");
  
//   // Add empty path
//   const path = TBgrp
//     .append("path")
//     .attr("transform", `translate(${TBmargin.left},0)`)
//     .attr("fill", "none")
//     .attr("stroke", "steelblue")
//     .attr("stroke-linejoin", "round")
//     .attr("stroke-linecap", "round")
//     .attr("stroke-width", 1.5);
  
//   function updateScales(data) {
//     // Create scales
//     const yScale = d3
//       .scaleLinear()
//       .range([TBheight, 0])
//       .domain([0, d3.max(data, dataPoint => dataPoint.popularity)]);
//     const xScale = d3
//       .scaleLinear()
//       .range([0, TBwidth])
//       .domain(d3.extent(data, dataPoint => dataPoint.year));
//     return { yScale, xScale };
//   }
  
//   function createLine(xScale, yScale) {
//     return line = d3
//     .line()
//     .x(dataPoint => xScale(dataPoint.year))
//     .y(dataPoint => yScale(dataPoint.popularity));
//   }
  
//   function updateAxes(data, chart, xScale, yScale) {
//     chart
//       .select(".x-axis")
//       .attr("transform", `translate(0,${TBheight})`)
//       .call(d3.axisBottom(xScale).ticks(data.length).tickFormat(d3.format("d")));
//     chart
//       .select(".y-axis")
//       .attr("transform", `translate(0, 0)`)
//       .call(d3.axisLeft(yScale));
//   }
  
//   function updatePath(data, line) {
//     const updatedPath = d3
//       .select("path")
//       .interrupt()
//       .datum(data)
//       .attr("d", line);
//     const pathLength = updatedPath.node().getTotalLength();
//     // D3 provides lots of transition options, have a play around here:
//     // https://github.com/d3/d3-transition
//     const transitionPath = d3
//       .transition()
//       .ease(d3.easeSin)
//       .duration(2500);
//     updatedPath
//       .attr("stroke-dashoffset", pathLength)
//       .attr("stroke-dasharray", pathLength)
//       .transition(transitionPath)
//       .attr("stroke-dashoffset", 0);
//   }
  
//   function updateChart(data) {
//     console.log('hello i am read')
//       const { yScale, xScale } = updateScales(data);
//       const line = createLine(xScale, yScale);
//       updateAxes(data, TBchart, xScale, yScale);
//       updatePath(data, line);
//   }
  
//   updateChart(TBdata);