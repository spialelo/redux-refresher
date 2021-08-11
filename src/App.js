import React from 'react';
import 'dotenv/config';
import xhr from 'xhr';
import Plot from 'react-plotly.js';
import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      data: {},
      dates: [],
      temps: [],
      selected: {
      }
    };

  }


  onPlotClick = (data) => {
    if(data.points) {
      this.setState({
        selected: {
          date: data.points[0].x,
          temp: data.points[0].y
        }
      })
    }
    console.log(data);
  };

  fetchData = (evt) => {
    evt.preventDefault();
    // ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
    // concat 'http://api.openweathermap.org/data/2.5/forecast?q=' + variable + '&APPID=YOURAPIKEY&units=metric' 
    
    if(!API_KEY) {
      console.log('Please enter your API_KEY and the location.');
      return;
    }


    let location = encodeURIComponent(this.state.location);
    let urlPref = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuff = `&APPID=${API_KEY}&units=metric`;
    let url = urlPref + location + urlSuff;

    xhr({
      url: url
    }, (err, data) => {
      if(err) {
        console.log('Ooops. Error.', err);
        return;
      }


      let body = JSON.parse(data.body);
      let list = body.list;
      let dates = [];
      let temps = [];
      for(let i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }


      this.setState({
        data: body,
        dates,
        temps,
        selected: {
          date: '',
          temp: null
       	}
      }, () => {
        console.log('fetch data from ', this.state.location);
      });
  
    }); 
    
  };


  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };


  render() {

  let currTemp = 'Not loaded yet.';
  if(this.state.data && this.state.data.list) {
    currTemp = this.state.data.list[0].main.temp;
  }    

    return (
      <div style={{margin: '0 auto', textAlign: 'center'}}>
        <h1>Weather v1.0</h1>
        <form onSubmit={this.fetchData}>
          <label htmlFor="usrLocation">
            I want to know the weather for
            <input 
              placeholder={"City, Country"}
              type="text"
              id="usrLocation"
              value={this.state.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        {(this.state.data && this.state.data.list) ? (
          <div className="wrapper">
          <p className="temp-wrapper">
            <span className="temp">{ (this.state.selected && this.state.selected.temp) ? this.state.selected.temp : currTemp }</span>
            <span className="temp-symbol">°C</span>
            <span className="temp-date">
            { (this.state.selected && this.state.selected.temp) ? this.state.selected.date : '' }
            </span>
          </p>
          <h2>Forecast</h2>
            <Plot 
            data={[
              {
                x: this.state.dates,
                y: this.state.temps,
                type: 'scatter',
              }
            ]}
            layout={{margin: {
                  t: 0, r: 0, l: 30
              },
              xaxis: {
                  gridcolor: 'transparent'
              }}}
            displayModeBar={false}
            onClick={this.onPlotClick}
          />
        </div>
        )
        : null}
        
      </div>
    );
  }
}

export default App;
