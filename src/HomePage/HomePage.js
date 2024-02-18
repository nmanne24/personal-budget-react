import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import * as d3 from "d3";
import { pie, arc } from "d3-shape";

function HomePage() {

  var dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#ff5733',
          '#4caf50',
          '#9c27b0',
        ],
      },
    ],
    labels: [],
  };

  function createChart() {
    var ctx = document.getElementById("Charts").getContext("2d");

    if (window.myPieChart) {
      window.myPieChart.destroy();
    }

    window.myPieChart = new ChartJS(ctx, {
      type: "pie",
      data: dataSource,
    });
  }
  

  function getBudget() {
      axios.get("/budget.json").then(function (res) {
        console.log(res);
        for (var i = 0; i < res.data.myBudget.length; i++) {
          dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
          dataSource.labels[i] = res.data.myBudget[i].title;
        }
        //drawChart(randomData(res.data.myBudget));
        createChart();
        createD3Chart(res.data.myBudget);
      }).catch(function (error) {
        console.error("Error fetching budget data: ", error);
      });
    }  
    
    const svgRef = useRef(null);

    function createD3Chart(data) {
      const svg = d3.select(svgRef.current);

      const width = 900; 
      const height = 900;
      const radius = Math.min(width, height) / 2;

      svg.attr("width", width).attr("height", height);

      const centerX = width / 2;
      const centerY = height / 2;

      const g = svg.append("g").attr("transform", `translate(${centerX},${centerY})`);
    
      const color = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.title))
        .range(["#ccff66", "#ff0066", "#00ff00", "#6600ff", "#003300", "#ff0000", "#ff8c00"]);

    
      const pieGenerator = pie().value((d) => d.budget);
    
      const pathGenerator = arc()
        .outerRadius(radius * 0.6)
        .innerRadius(radius * 0.3);
    
      const arcs = pieGenerator(data);
    
      const arcPaths = g
        .selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", (d) => color(d.data.title))
        .attr("stroke", "white")
        .style("stroke-width", "2px");
    
      g.attr("transform", `translate(${width / 2},${height / 2})`);
    
      console.log("SVG Width:", width);
      console.log("SVG Height:", height);
    }

    useEffect(() => {
      console.log("useEffect is running!");
      getBudget();
      //createD3Chart(dataSource.datasets[0].data);
    }, []);
  

  return (
    <main className="center" id="main">
        <div className="page-area">
            <section>
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </section>
    
            <section>
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </section>
    
            <section>
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </section>

            <section>
                <h2>Free</h2>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </section>
    
            <section>
                <h2>Chart</h2>
                <p>
                    <canvas id="Charts" width="300" height="300" aria-label="Budget Chart"></canvas>
                </p>
            </section>

            <section>
              <h2>D3Charts</h2>
              <svg ref={svgRef} width={900} height={900}></svg>
            </section>
        </div>
    </main>
  );
}
export default HomePage;