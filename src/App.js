import React, { Component } from 'react';
import './App.css';
import Chart from 'chart.js';
import NeuralNetwork from './algorithm/NeuralNetwork';

class App extends Component {
  constructor(props){
    super(props);
    this.nn = new NeuralNetwork();
  }

  initGraph(dataSet){
    var ctx = document.getElementById("myChart");
    var scatterChart = new Chart(ctx, {
      type: 'scatter',
      data: {
          datasets: [
            {
              label: 'Scatter Dataset',
              data: dataSet[0],
              // data: this.nn.red,
              
              //#ff6384
              backgroundColor:'#36a2eb'
            },
            {
              label: 'Scatter Dataset',
              data: dataSet[1],
              // data: this.nn.blue,
              //#36a2eb
              backgroundColor:'#ff6384'
            }
          ]
      },
      options: {
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom'
              }]
          }
      }
    });
  }

  initData(param){
    // console.log(param);
    var array1 = [];
    var array2 = [];
    for(let i =0; i<1000; i++){
      console.log(param);
      let x = Math.random()*10;
      let y = Math.random()*10;
      let target = param.w1*x + param.w2*y+param.b;
      let result = this.nn.sigmoid(target);
      console.log(param,target,result);
      
      if(result>0.5){
        array1.push({x:x, y:y});
      }else{
        array2.push({x:x, y:y});
      }
    }

    // console.log(12** 2)
    return [array1,array2];
  }

  componentDidMount(){
    //do learning first, get most accuate parameters...
    var param = this.nn.train();
    console.log(param);
    var dataSet = this.initData(param);
    this.initGraph(dataSet);


  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React Algorithm</h1>
          <h3>NeuralNetwork Experiment</h3>
        </header>
        
        <canvas  id="myChart" width="600" height="200"></canvas>
      </div>
    );
  }
}

export default App;
