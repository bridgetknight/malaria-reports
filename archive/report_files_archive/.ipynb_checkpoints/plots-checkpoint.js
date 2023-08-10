QSCORES = document.getElementById('qscores');

var layout = {
    width: 500,
    height: 00,
    margin: {
        l: 95,
        r: 80,
        b: 90,
        t: 10
    },
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)',
    modebar: {
        // vertical modebar button layout
        orientation: 'v',
        // for demonstration purposes
        bgcolor: 'white',
        color: '#a7a8a8',
        activecolor: '#9ED3CD'
      },
    
      // move the legend inside the plot on the top right
      xaxis: {
        title: {
          text: 'Q Score',
          font: {
            family: 'Rubik',
            size: 18,
            color: '#7f7f7f'
          }
        },
      },
      yaxis: {
        title: {
          text: 'Number of Reads',
          font: {
            family: 'Rubik',
            size: 18,
            color: '#7f7f7f'
          }
        }
      }
    
}

var config = {
    displayModeBar: true // or 'true' for always visible
  };

// gathering data for Q-scores plot
var qscore_x = JSON.parse('{{ analysis.qscorex | tojson }}');
var qscore_y = JSON.parse('{{ analysis.qscorey | tojson }}');
Plotly.plot(QSCORES, [{
  type: 'scatter',
  x: qscore_x,
  y: qscore_y
}], layout, config)