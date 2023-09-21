COVERAGE = document.getElementById("coverage_plot");
//data = document.querySelector("meta[name="qscores_y"]").content;
//console.log(data);

function createCoveragePlot(data) {
    var layout = {
        showlegend: false,
        width: 500,
        height: 350,
        margin: {
            l: 95,
            r: 80,
            b: 90,
            t: 10
      },
        paper_bgcolor:"rgba(0,0,0,0)",
        plot_bgcolor:"rgba(0,0,0,0)",
        modebar: {
            // vertical modebar button layout
            orientation: "v",
            // for demonstration purposes
            bgcolor: "white",
            color: "#a7a8a8",
            activecolor: "#9ED3CD"
        },
      
        // move the legend inside the plot on the top right
        xaxis: {
            title: {
                    text: "End Position (bp)",
                    font: {
                        family: "Rubik",
                        size: 18,
                        color: "#7f7f7f"
                    }
            },
        },
        yaxis: {
            title: {
                    text: "Depth",
                    font: {
                        family: "Rubik",
                        size: 18,
                        color: "#7f7f7f"
                    }
            }
        }
      
    }

    var config = {
        displayModeBar: true // or "false" for invisible
    };
 
    // Parse strings representing values to JSON arrays
    var coverage_x = coverage_x;
    coverage_x = data.replace(/[""]/g, "");
    x_values = JSON.parse(coverage_x)

    var coverage_y = coverage_y;
    coverage_y = data.replace(/[""]/g, "");
    y_values = JSON.parse(coverage_y)
    let nbins = x_values.length;

    var trace = {
        x: x_values,
        y: y_values,
        autobinx: false,
        nbinsx: nbins,
        colorscale:,
        type: "histogram"
    };

    Plotly.newPlot(COVERAGE, trace, layout, config);
}

// get data values from meta tags passed through HTML
coverage_x = document.querySelector("meta [name='coverage_x']").content; // stop position
coverage_y = document.querySelector("meta [name='coverage_y']").content; // depth at stop position

// debug
console.log(coverage_x);
console.log(coverage_y);

// generate plot
createCoveragePlot(coverage_x, coverage_y);