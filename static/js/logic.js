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


//flattenSenators will take in the dataset and a year as a string, currently a console log
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
        // console.log("-------------------------")
        // console.log(senator.name);
        // console.log(senator.start);
        // console.log(senator.end);
        // console.log(`start: ${parseInt(formatYear(new Date(senator.start)), 10)}`);
        // console.log(`end: ${parseInt(formatYear(new Date(senator.end)), 10)}`);
        // console.log(i);
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
<<<<<<< HEAD
      console.log(flattenSenators(d));

      //var ndx = crossfilter(d);

      //Create Dimensions

      //Create Groups

});
=======
      console.log(getSenators(d,'1990'));
    });
>>>>>>> Jason updates 5.27

//Brooke's Code for Pie Chart


//Jason's Code for Choropleth
d3.json("../static/data/legislators-historical.json", d => {
  //Checking data to ensure that we get all the senators
  console.log(d);
});
<<<<<<< HEAD
=======
// When the browser window is resized, makeResponsive() is called.

d3.select(window).on("resize", makeResponsive);

// When the browser loads, loadChart() is called
loadChart();

// Define responsive function
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads, remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
    loadChart();
  }
}
function loadChart() {
  var svgWidth = 960;
  var svgHeight = 600;

  // var color_domain = [50, 150, 350, 750, 1500]
  // // var ext_color_domain = [0, 50, 150, 350, 750, 1500]
  // // var legend_labels = ["< 50", "50+", "150+", "350+", "750+", "> 1500"]  
  // var color = d3.scale.threshold()
  // .domain(color_domain)
  // .range(["#adfcad", "#ffcb40", "#ffba00", "#ff7d73", "#ff4e40", "#ff1300"]);
  
  var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 100
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;
  
  var div = d3.select("body").append("div")   
  .attr("class", "tooltip")               
  .style("opacity", 0);

  var svg = d3
    .select("#map-id")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var path = d3.geoPath();
  
  // var projection = d3.geo.albers()
  // .rotate([-105, 0])
  // .center([-10, 65])
  // .parallels([52, 64])
  // .scale(700)
  // .translate([width / 2, height / 2]);

  d3.json("https://d3js.org/us-10m.v1.json", function (error, us) {
    if (error) throw error;

    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path);

    svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; })))
      .on("mouseover", function(d) {
        d3.select(this).transition().duration(300).style("opacity", 1);
        div.transition().duration(300)
        .style("opacity", 1)
        // div.text(nameById[d.properties.region] + " : " + rateById[d.properties.region])
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY -30) + "px");
      })
  });
  var legend = svg.selectAll("g.legend")
  .data([0, 50, 150, 350, 750, 1500])
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 20, ls_h = 20;

  legend.append("rect")
  .attr("x", 20)
  .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", "#adfcad")
  .style("opacity", 0.8);

  legend.append("text")
  .attr("x", 50)
  .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
  .text(function(d, i){ return legend_labels[i]; });

  d3.json("../static/data/legislators-historical.json", d => {
    //Checking data to ensure that we get all the senators
    console.log(d);
  });
}


>>>>>>> Jason updates 5.27

var popData = [{id: "01", population: 4830620}, {id: "02", population: 733375}, {id: "04", population: 6641928}, {id: "05", population: 2958208}, {id: "06", population: 38421464}, {id: "08", population: 5278906}, {id: "09", population: 3593222}, {id: "10", population: 926454}, {id: "11", population: 647484}, {id: "12", population: 19645772}, {id: "13", population: 10006693}, {id: "15", population: 1406299}, {id: "16", population: 1616547}, {id: "17", population: 12873761}, {id: "18", population: 6568645}, {id: "19", population: 3093526}, {id: "20", population: 2892987}, {id: "21", population: 4397353}, {id: "22", population: 4625253}, {id: "23", population: 1329100}, {id: "24", population: 5930538}, {id: "25", population: 6705586}, {id: "26", population: 9900571}, {id: "27", population: 5419171}, {id: "28", population: 2988081}, {id: "29", population: 6045448}, {id: "30", population: 1014699}, {id: "31", population: 1869365}, {id: "32", population: 2798636}, {id: "33", population: 1324201}, {id: "34", population: 8904413}, {id: "35", population: 2084117}, {id: "36", population: 19673174}, {id: "37", population: 9845333}, {id: "38", population: 721640}, {id: "39", population: 11575977}, {id: "40", population: 3849733}, {id: "41", population: 3939233}, {id: "42", population: 12779559}, {id: "44", population: 1053661}, {id: "45", population: 4777576}, {id: "46", population: 843190}, {id: "47", population: 6499615}, {id: "48", population: 26538614}, {id: "49", population: 2903379}, {id: "50", population: 626604}, {id: "51", population: 8256630}, {id: "53", population: 6985464}, {id: "54", population: 1851420}, {id: "55", population: 5742117}, {id: "56", population: 579679}, {id: "72", population: 3583073}];

var chart = new d3plus.Geomap()
.config({
  // data: "https://d3plus.org/data/city_coords.json",
  // groupBy: "slug",
  // colorScale: "dma_code",
  // label: function(d) {
  //   return d.city + ", " + d.region;
  // },
  // point: function(d) {
  //   return [d.longitude, d.latitude];
  // },
  zoom: false
})
  .data(popData)
  .colorScale("population")
  .topojson("https://d3plus.org/topojson/states.json")
  .fitFilter(function(d) {
    return ["02", "15", "43", "60", "66", "69", "72", "78"].indexOf(d.id) < 0;
  });

  chart
  .projection("geoAlbersUsa")
  .ocean("transparent")
  .render();
// When the browser window is resized, makeResponsive() is called.

// d3.select(window).on("resize", makeResponsive);

// // When the browser loads, loadChart() is called
// loadChart();

// // Define responsive function
// function makeResponsive() {

//   // if the SVG area isn't empty when the browser loads, remove it and replace it with a resized version of the chart
//   var svgArea = d3.select("body").select("svg");

//   if (!svgArea.empty()) {
//     svgArea.remove();
//     loadChart();
//   }
// }
// function loadChart() {
//   var svgWidth = 960;
//   var svgHeight = 600;

//   // var color_domain = [50, 150, 350, 750, 1500]
//   // // var ext_color_domain = [0, 50, 150, 350, 750, 1500]
//   // // var legend_labels = ["< 50", "50+", "150+", "350+", "750+", "> 1500"]  
//   // var color = d3.scale.threshold()
//   // .domain(color_domain)
//   // .range(["#adfcad", "#ffcb40", "#ffba00", "#ff7d73", "#ff4e40", "#ff1300"]);
  
//   var margin = {
//     top: 20,
//     right: 40,
//     bottom: 100,
//     left: 100
//   };

//   var width = svgWidth - margin.left - margin.right;
//   var height = svgHeight - margin.top - margin.bottom;
  
//   var div = d3.select("body").append("div")   
//   .attr("class", "tooltip")               
//   .style("opacity", 0);

//   var svg = d3
//     .select("#map-id")
//     .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);
  
//   var chartGroup = svg.append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//   var path = d3.geoPath();
  
//   // var projection = d3.geo.albers()
//   // .rotate([-105, 0])
//   // .center([-10, 65])
//   // .parallels([52, 64])
//   // .scale(700)
//   // .translate([width / 2, height / 2]);

//   d3.json("https://d3js.org/us-10m.v1.json", function (error, us) {
//     if (error) throw error;

//     svg.append("g")
//       .attr("class", "states")
//       .selectAll("path")
//       .data(topojson.feature(us, us.objects.states).features)
//       .enter().append("path")
//       .attr("d", path);

//     svg.append("path")
//       .attr("class", "state-borders")
//       .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; })))
//       .on("mouseover", function(d) {
//         d3.select(this).transition().duration(300).style("opacity", 1);
//         div.transition().duration(300)
//         .style("opacity", 1)
//         // div.text(nameById[d.properties.region] + " : " + rateById[d.properties.region])
//         .style("left", (d3.event.pageX) + "px")
//         .style("top", (d3.event.pageY -30) + "px");
//       })
//   });
//   var legend = svg.selectAll("g.legend")
//   .data([0, 50, 150, 350, 750, 1500])
//   .enter().append("g")
//   .attr("class", "legend");

//   var ls_w = 20, ls_h = 20;

//   legend.append("rect")
//   .attr("x", 20)
//   .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
//   .attr("width", ls_w)
//   .attr("height", ls_h)
//   .style("fill", "#adfcad")
//   .style("opacity", 0.8);

//   legend.append("text")
//   .attr("x", 50)
//   .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
//   .text(function(d, i){ return legend_labels[i]; });

//   d3.json("../static/data/legislators-historical.json", d => {
//     //Checking data to ensure that we get all the senators
//     console.log(d);
//   });
// }



d3.select(window).on("resize", makeResponsive);

// When the browser loads, loadChart() is called
loadChart();

<<<<<<< HEAD
// Define responsive function
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads, remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
    loadChart();
  }
}
function loadChart() {
  var svgWidth = 960;
  var svgHeight = 600;

  var color_domain = [50, 150, 350, 750, 1500]
  var ext_color_domain = [0, 50, 150, 350, 750, 1500]
  var legend_labels = ["< 50", "50+", "150+", "350+", "750+", "> 1500"]  
  // var color = d3.scale.threshold()
  // .domain(color_domain)
  // .range(["#adfcad", "#ffcb40", "#ffba00", "#ff7d73", "#ff4e40", "#ff1300"]);
  
  var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 100
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;
  
  var div = d3.select("body").append("div")   
  .attr("class", "tooltip")               
  .style("opacity", 0);

  var svg = d3
    .select("#map-id")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var path = d3.geoPath();
  /*
  var projection = d3.geo.albers()
  .rotate([-105, 0])
  .center([-10, 65])
  .parallels([52, 64])
  .scale(700)
  .translate([width / 2, height / 2]);
*/
  d3.json("https://d3js.org/us-10m.v1.json", function (error, us) {
    if (error) throw error;

    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path);

    svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; })))
      .on("mouseover", function(d) {
        d3.select(this).transition().duration(300).style("opacity", 1);
        div.transition().duration(300)
        .style("opacity", 1)
        // div.text(nameById[d.properties.region] + " : " + rateById[d.properties.region])
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY -30) + "px");
      })
  });
  var legend = svg.selectAll("g.legend")
  .data([0, 50, 150, 350, 750, 1500])
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 20, ls_h = 20;

  legend.append("rect")
  .attr("x", 20)
  .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", "#adfcad")
  .style("opacity", 0.8);

  legend.append("text")
  .attr("x", 50)
  .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
  .text(function(d, i){ return legend_labels[i]; });

  d3.json("../static/data/legislators-historical.json", d => {
    //Checking data to ensure that we get all the senators
    console.log(d);
  });
}




//Victor's Code for Slider
// Time
var dataTime = d3.range(0, 243).map(function(d) {
  return new Date(1776 + d, 10, 3);
});
=======
>>>>>>> Jason updates 5.27

var stbb = document.querySelector ('#slider-time').getBoundingClientRect();
var stwidth = stbb.right-stbb.left;

var sliderTime = d3
  .sliderBottom()
  .min(d3.min(dataTime))
  .max(d3.max(dataTime))
  .step(1000 * 60 * 60 * 24 * 365)
  .width(stwidth)
  .ticks(50)
  .tickFormat(d3.timeFormat('%Y'))
  .tickValues(dataTime)
  .default(new Date(2018, 10, 3))
  .on('onchange', val => {
    d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
    console.log(d3.timeFormat('%Y')(val));
  });

var gTime = d3
  .select('div#slider-time')
  .append('svg')
  .attr('width', stwidth)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(40,30) scale (0.9 0.9)');
  //Fix transform and width attributes so that the slider doesn't get cut off.
  //Add fxn

gTime.call(sliderTime);

d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));


//Import Data Using File Instead of Flask, for now




