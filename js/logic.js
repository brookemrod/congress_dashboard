
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


//getSenators will take in the dataset and a year as a string, currently a console lo
function getSenators(d, yearString) {
  var i = 0;
  var results = []
  d.forEach(e => {
    e.terms.forEach(f => {
      var formatYear = d3.timeFormat("%Y");
      if (f.type == "sen" && parseInt(yearString, 10) >= parseInt(formatYear(new Date(f.start)), 10) &&
        parseInt(yearString, 10) < parseInt(formatYear(new Date(f.end)), 10)) {
        var senator = {};
        senator.name = e.name;
        senator.start = f.start;
        senator.end = f.end;
        senator.state = f.state;
        senator.party = f.party;
        results.push(senator);
        console.log("-------------------------")
        console.log(e.name);
        console.log(f);
        console.log(`start: ${parseInt(formatYear(new Date(f.start)), 10)}`);
        console.log(parseInt(yearString, 10))
        console.log(`end: ${parseInt(formatYear(new Date(f.end)), 10)}`)
        console.log(i);
        i = i + 1;
      }
    });
  });
  return results;
}

//Import Data Using File Instead of Flask, for now
d3.json("./data/legislators-historical.json",d => {
      console.log(d);
      console.log(getSenators(d,'1972'));
});
