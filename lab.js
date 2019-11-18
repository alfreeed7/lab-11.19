

var penpromise= d3.json("penguins/classData.json")

penpromise.then(
function(penguins)
{
   
    seth1("Graph of the Quizes");
    setup(penguins);
},
    
function(err)
{
    seth1("No penguin");
});

var seth1 = function(message)
{
    d3.select("h1").text(message);
}



var screen = {width:800,height:500}
var margins={top:10,right:50,bottom:50,left:50}

var setup=function(penguins)
{
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g")
    .attr("id","graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width=screen.width-margins.left-margins.right
    var height=screen.height-margins.top-margins.bottom
    
    var xScale=d3.scaleLinear()
    .domain([0,37])
    .range([0,width])
    
    var yScale=d3.scaleLinear()
    .domain([0,10])
    .range([height,0])

    var cScale=d3.scaleOrdinal
    
    var xAxis=d3.axisBottom(xScale)
    var yAxis=d3.axisLeft(yScale)
    
    d3.select("svg")
    .append("g")
    .classed("axis",true);
    
    d3.select(".axis")
    .append("g")
    .attr("id","xAxis")
    .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
        d3.select(".axis")
    .append("g")
    .attr("id","yAxis")
    .attr("transform","translate(25,"+margins.top+")")
    .call(yAxis)
    
    d3.select("#graph")
    .selectAll('circle')
    .data(penguins[0].quizes)
    .enter()
    .append("circle")
    .on("mouseover",function(num,index)
       {
        var label="("+index+","+num.grade+")";
        d3.select("#tooltip")
        .text(label)
        .style("left",(d3.event.pageX+18)+"px")
        .style("top",(d3.event.pageY-28)+"px")
        .classed("hidden",false)
    })
    .on("mouseout",function()
       {
        d3.select("#tooltip")
          .classed("hidden",false)
        })
    .attr("fill","red")
    .attr("r",5)
    .attr("cx",function(num,index)
    {
      return xScale(index);
    })
    .attr("cy",function(num)
    {
      return yScale(num.grade);
    })
    
    d3.select("#buttons")
    .selectAll("img")
    .data(penguins)
    .enter()
    .append("img")
    .attr("src",function(obj)
    {return "penguins/" + obj.picture })
    
    .on("click",function(penguin,index)
       {
        drawpath(penguins,xScale,yScale,index)}
    
    
)
     
}

var drawpath=function(penguins,xScale,yScale,index)
{

   d3.select("#graph")
    .selectAll("circle")
    .data(penguins[index].quizes)
    .transition()
    .attr("cx",function(num,index)
    {
      return xScale(index);
    })
    .attr("cy",function(num)
    {
      return yScale(num.grade);
    })
    
}

