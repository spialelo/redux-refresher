import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Plot from 'react-plotly.js';
import { changeLocation, setSelectedDate, setSelectedTemp, fetchData}  from './actions';


//dbe69e56e7ee5f981d76c3e77bbb45c
// ${API_KEY}

const API_KEY = process.env.REACT_APP_WEATHER_KEY;

class App extends React.Component {

  
  fetchData = (evt) => {
    evt.preventDefault();

    let location = encodeURIComponent(this.props.state.location);

    let urlPref = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuff = `&APPID=${API_KEY}&units=metric`;
    let url = urlPref + location + urlSuff;
    
    this.props.dispatch(fetchData(url));
    
  };


  onPlotClick = (data) => {
    if(data.points) {
      let number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(this.props.state.dates[number]));
      this.props.dispatch(setSelectedTemp(this.props.state.temps[number]));
    }
    console.log(data);
  };


  changeLocation = (evt) => {
    this.props.dispatch(changeLocation(evt.target.value));
  };

  render() {

    let currTemp = 'Not loaded yet.';
    if(this.props.state.data && this.props.state.data.list) {
      currTemp = this.props.state.data.list[0].main.temp;
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
                value={this.props.state.location}
                onChange={this.changeLocation}
              />
            </label>
          </form>
          {(this.props.state.data && this.props.state.data.list) ? (
            <div className="wrapper">
              { (this.props.state.selected && this.props.state.selected.temp) ? 
              <p className="temp-wrapper">
                <span className="temp-date">
                <p>The temperatures on { (this.props.state.selected && this.props.state.selected.temp) ? this.props.state.selected.date : '' }</p>
                </span>
              </p>
              :
              <p className="temp-wrapper">
                <p>The current temperature is <span className="temp">{ (this.props.state.selected && this.props.state.selected.temp) ? this.props.state.selected.temp : currTemp }
                <span className="temp-symbol">°C!</span></span>
                </p>
              </p>
              }
            <h2>Forecast</h2>
              <Plot 
              data={[
                {
                  x: this.props.state.dates,
                  y: this.props.state.temps,
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

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(App);
