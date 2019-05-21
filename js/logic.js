
// Figure out a way to make the 
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
// Import Data Using File instead of URL for now
d3.json("./data/legislators-historical.json",d => {
      console.log(d);
      d.forEach(e => {
          e.terms.forEach(f => {
            if(f.type == "sen"){
                //console.log(f);
            }
          });
      });
});

//Testing Dates
var blah = Date("2019-01-02")
console.log(blah)
console.log(typeof blah)
console.log(parseDate(blah))