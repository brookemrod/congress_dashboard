//flattenSenators will take in the dataset and a year and update the graphs accordingly ----------------------------------------------
function flattenSenators(d,yearString) {
  var i = 0;
  var flattened = []
  d.forEach(e => {
    e.terms.forEach(f => {
      formatYear = d3.timeFormat("%Y");
      if (f.type == "sen" && parseInt(yearString, 10) >= parseInt(formatYear(new Date(f.start)), 10) &&
        parseInt(yearString, 10) < parseInt(formatYear(new Date(f.end)), 10)) {
        var senator = {};
        senator.name = `${e.name.first} ${e.name.last}`;
        senator.start = f.start;
        senator.end = f.end;
        senator.state = f.state;
        senator.party = f.party;
        senator.gender = e.bio.gender;
        senator.id = stateDict[f.state];
        if (senator.party == "Anti-Administration"){
          senator.partyID = 0
        }
        else if (senator.party == "Pro-Administration"){
          senator.partyID = 1
        }
        else if (senator.party == "Federalist"){
          senator.partyID = 2
        }
        else if (senator.party == "Republican"){
          senator.partyID = 3
        }
        else if (senator.party == "Adams Democrat"){
          senator.partyID = 4
        }
        else if (senator.party == "Jacksonian Republican"){
          senator.partyID = 5
        }
        else if (senator.party == "Adams"){
          senator.partyID = 6
        }
        else if (senator.party == "Jackson"){
          senator.partyID = 7
        }
        else if (senator.party == "Anti Jackson"){
          senator.partyID = 8
        }
        else if (senator.party == "Whig"){
          senator.partyID = 9
        }
        else if (senator.party == "Democrat"){
          senator.partyID = 10
        }
        else {
          senator.party = "Other";
          senator.partyID = 11;
        };
        // if (senator.party == Object.keys(partyDict)){
        //   senator.partyID = partyDict.value}
        // else senator.partyID = 999
        flattened.push(senator);
        //console.log("-------------------------")
        // console.log(senator.name);
        // console.log(senator.start);
        // console.log(senator.end);
        // console.log(`start: ${parseInt(formatYear(new Date(senator.start)), 10)}`);
        //console.log(`end: ${parseInt(formatYear(new Date(senator.end)), 10)}`);
        //console.log(i);
        i = i + 1;
      }
    });
  });
  return flattened;
}

//Example data
//var senatorData = [{id: "01", population: 4830620}, {id: "02", population: 733375}, {id: "04", population: 6641928}, {id: "05", population: 2958208}, {id: "06", population: 38421464}, {id: "08", population: 5278906}, {id: "09", population: 3593222}, {id: "10", population: 926454}, {id: "11", population: 647484}, {id: "12", population: 19645772}, {id: "13", population: 10006693}, {id: "15", population: 1406299}, {id: "16", population: 1616547}, {id: "17", population: 12873761}, {id: "18", population: 6568645}, {id: "19", population: 3093526}, {id: "20", population: 2892987}, {id: "21", population: 4397353}, {id: "22", population: 4625253}, {id: "23", population: 1329100}, {id: "24", population: 5930538}, {id: "25", population: 6705586}, {id: "26", population: 9900571}, {id: "27", population: 5419171}, {id: "28", population: 2988081}, {id: "29", population: 6045448}, {id: "30", population: 1014699}, {id: "31", population: 1869365}, {id: "32", population: 2798636}, {id: "33", population: 1324201}, {id: "34", population: 8904413}, {id: "35", population: 2084117}, {id: "36", population: 19673174}, {id: "37", population: 9845333}, {id: "38", population: 721640}, {id: "39", population: 11575977}, {id: "40", population: 3849733}, {id: "41", population: 3939233}, {id: "42", population: 12779559}, {id: "44", population: 1053661}, {id: "45", population: 4777576}, {id: "46", population: 843190}, {id: "47", population: 6499615}, {id: "48", population: 26538614}, {id: "49", population: 2903379}, {id: "50", population: 626604}, {id: "51", population: 8256630}, {id: "53", population: 6985464}, {id: "54", population: 1851420}, {id: "55", population: 5742117}, {id: "56", population: 579679}, {id: "72", population: 3583073}];


var listData = [];

d3.json("../static/data/legislators-historical.json").then(d => {
  //Checking data to ensure that we get all the senators
  // console.log('hello world')
  // console.log(d);
  console.log(flattenSenators(d,"1900"))
  data = flattenSenators(d,'1900');
  data.forEach(e => {
    var temp = {"id":e.id, "partyID": e.partyID, "state":e.state, "name":e.name, "party":e.party};
    listData.push(temp);
  });
}); 



var chart = new d3plus.Geomap()
.config({
  zoom: false
})
  .data(listData)
  .colorScale("partyID")
  .topojson("https://d3plus.org/topojson/states.json")
  .fitFilter(function(d) {
    return ["02", "15", "43", "60", "66", "69", "72", "78"].indexOf(d.id) < 0;
  })
  .label(function(d) {
    return stateFullName[d.state];
  })
  .tooltipConfig({
    body: function(d) {
      return "Senator:" + d.name + ", " + d.party;
    }});
  

  chart
  .projection("geoAlbersUsa")
  .ocean("transparent")
  .colorScaleConfig({color: ["red", "purple", "blue"]})
  .render();


partyDict = {"Democrat": 10,
  "Republican": 3,
  "Whig": 9,
  "Anti-Administration": 0,
  "Pro-Administration": 1,
  "Jacksonian Republican": 5,
  "Jacksonian": 6,
  "Adams Democrat":  4,
  "Adams": 7,
  "Anti Jackson": 8,
  "Federalist": 2,
}

stateDict = {"AL": "01","AK":"02","AZ":"04","AR":"05","CA":"06","CO":"08","CT":"09","DE":"10","FL":"12",
"GA":"13","HI":"15","ID":"16","IL":"17","IN":"18","IA":"19","KS":"20","KY":"21","LA":"22",
"ME":"23","MD":"24","MA":"25","MI":"26","MN":"27","MS":"28","MO":"29","MT":"30","NE":"31","NV":"32",
"NH":"33","NJ":"34","NM":"35","NY":"36","NC":"37","ND":"38","OH":"39","OK":"40","OR":"41","PA":"42",
"RI":"44","SC":"45","SD":"46","TN":"47","TX":"48","UT":"49","VT":"50","VA":"51","WA":"53","WV":"54","WY":"56"};

stateFullName = {"AL":"Alabama","AK":"Alaska","AZ":"Arizona","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","FL":"Florida",
"GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana",
"ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska",
"NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota",
"OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota",
"TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia","WY":"Wyoming"};

//Define Unique Function
function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}
//Define Pie Chart Functions ----------------------------------------------------------------------------------------------------
function genderPieData(data) {
  var labelList = [];
  data.forEach(d => {
    labelList.push(d.gender);
  });
  var labels = labelList.filter(onlyUnique);

  var counts = {};
  labels.forEach(d=> counts[d] = 0);
  labelList.forEach(d=>{
    counts[d] = counts[d] + 1;
  });
  var values = Object.values(counts);
  
  return [labels,values];
};

function partyPieData(data) {
  var labelList = [];
  data.forEach(d => {
    labelList.push(d.party);
  });
  var labels = labelList.filter(onlyUnique);

  var counts = {};
  labels.forEach(d=> counts[d] = 0);
  labelList.forEach(d=>{
    counts[d] = counts[d] + 1;
  });
  var values = Object.values(counts);
  
  return [labels,values];
};

//Victor's Code for Slider -----------------------------------------------------------------------------------
var dataTime = d3.range(0, 230).map(function(d) {
  return new Date(1789 + d, 10, 3);
});

//Define the Card Width as stwidth
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
  .default(new Date(1900, 10, 3))
  .on('onchange', val => {
    d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
    // console.log(d3.timeFormat('%Y')(val));
  });

var gTime = d3
  .select('div#slider-time')
  .append('svg')
  .attr('width', stwidth)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(40,30) scale (0.9 0.9)');
  //Fix transform and width attributes so that the slider doesn't get cut off.

gTime.call(sliderTime);

d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));

// Run the code ---------------------------------------------------------------------------------------------
d3.json("../static/data/legislators-historical.json").then(d => {
  var blah = flattenSenators(d,'1900');
  console.log(genderPieData(blah));
  console.log(partyPieData(blah));

  var partypiedata = [{
    values: partyPieData(blah)[1],
    labels: partyPieData(blah)[0],
    type: 'pie'
  }];
  var genderpiedata = [{
    values: genderPieData(blah)[1],
    labels: genderPieData(blah)[0],
    type: 'pie'
  }];
  
  var layout = {
    height: 400,
    width: 400
  };
  
  Plotly.newPlot('partypie', partypiedata, layout);
  Plotly.newPlot('genderpie', genderpiedata, layout);

  //On Slider Change, update pie charts and graphics
  sliderTime.on('onchange',value => {
    console.log(value);
    d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));
    var year = d3.timeFormat('%Y')(value)
    var data = flattenSenators(d,year);
    var partypiedata = [{
      values: partyPieData(data)[1],
      labels: partyPieData(data)[0],
      type: 'pie'
    }];
    var genderpiedata = [{
      values: genderPieData(data)[1],
      labels: genderPieData(data)[0],
      type: 'pie'
    }];
    var layout = {
      height: 400,
      width: 400
    };
    
    Plotly.newPlot('partypie', partypiedata, layout);
    Plotly.newPlot('genderpie', genderpiedata, layout); 

    var dataList = []
    data.forEach(e => {
      var temp = {"id":e.id, "partyID": e.partyID, "state":e.state, "name":e.name, "party":e.party};
      dataList.push(temp)
    });

    chart
    .projection("geoAlbersUsa")
    .ocean("transparent")
    .colorScaleConfig({color: ["red", "purple", "blue"]})
    .render().data(dataList);
  });
});