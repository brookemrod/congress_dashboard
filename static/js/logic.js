// Figure out a way to make the graph, I guess
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


//getSenators will take in the dataset and a year as a string, currently a console log
function flattenSenators(d) {
  var i = 0;
  var flattened = []
  d.forEach(e => {
    e.terms.forEach(f => {
      formatYear = d3.timeFormat("%Y");
      if (f.type == "sen" /*&& parseInt(yearString, 10) >= parseInt(formatYear(new Date(f.start)), 10) &&
        parseInt(yearString, 10) < parseInt(formatYear(new Date(f.end)), 10)*/) {
        var senator = {};
        senator.name = `${e.name.first} ${e.name.last}`;
        senator.start = f.start;
        senator.end = f.end;
        senator.state = f.state;
        senator.party = f.party;
        flattened.push(senator);
        console.log("-------------------------")
        console.log(senator.name);
        console.log(senator.start);
        console.log(senator.end);
        console.log(`start: ${parseInt(formatYear(new Date(senator.start)), 10)}`);
        console.log(`end: ${parseInt(formatYear(new Date(senator.end)), 10)}`);
        console.log(i);
        i = i + 1;
      }
    });
  });
  return flattened;
}

d3.json("../static/data/legislators-historical.json",(err,d) => {
  if(err) throw error;
  //Checking data to ensure that we get all the senators
      console.log(d);
      console.log(flattenSenators(d));

      var ndx = crossfilter(d);

      //Create Dimensions

      //Create Groups

});

//Brooke's Code for Pie Chart


//Jason's Code for Choropleth


//Victor's Code for Slider

//Import Data Using File Instead of Flask, for now




