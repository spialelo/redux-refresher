import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Plot from 'react-plotly.js';
import { changeLocation, setSelectedDate, setSelectedTemp, fetchData}  from './actions';


//dbe69e56e7ee5f981d76c3e77bbb45c
// ${API_KEY}

const API_KEY = process.env.REACT_APP_WEATHER_KEY;

class App extends React.Component {

  shouldComponentUpdate(nextProps) {
		const xDataChanged = !this.props.xData.equals(nextProps.xData);
		const yDataChanged = !this.props.yData.equals(nextProps.yData);

		return xDataChanged || yDataChanged;
	}
  
  fetchData = (evt) => {
    evt.preventDefault();

    let location = encodeURIComponent(this.props.redux.get('location'));

    let urlPref = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuff = `&APPID=${API_KEY}&units=metric`;
    let url = urlPref + location + urlSuff;
    
    this.props.dispatch(fetchData(url));
    
  };


  onPlotClick = (data) => {
    if(data.points) {
      let number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(this.props.redux.getIn(['dates', number])));
      this.props.dispatch(setSelectedTemp(this.props.redux.getIn(['temps', number])));
    }
    console.log(data);
  };

  // TO DO: look into onUpdate callback. Possibly can be used to control rerenders


  changeLocation = (evt) => {
    this.props.dispatch(changeLocation(evt.target.value));
  };

  render() {

    let currTemp = 'Not loaded yet.';

    if(this.props.redux.getIn(['data', 'list'])) {
      currTemp = this.props.redux.getIn(['data', 'list', '0', 'main', 'temp']);
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
                value={this.props.redux.get('location')}
                onChange={this.changeLocation}
              />
            </label>
          </form>
          {(this.props.redux.get('data') && this.props.redux.getIn(['data', 'list'])) ? (
            <div className="wrapper">
              { (this.props.redux.get('selected') && this.props.redux.getIn(['selected', 'temp'])) ? 
              <div className="temp-wrapper">
                <span className="temp-date">
                <p>The temperatures on { (this.props.redux.get('selected') && this.props.redux.getIn(['selected', 'temp'])) ? this.props.redux.getIn(['selected', 'date']) : '' }</p>
                </span>
              </div>
              :
              <div className="temp-wrapper">
                <p>The current temperature is <span className="temp">{ (this.props.redux.get('selected') && this.props.redux.getIn(['selected', 'temp'])) ? this.props.redux.getIn(['selected', 'temp']) : currTemp }
                <span className="temp-symbol">°C!</span></span>
                </p>
              </div>
              }
            <h2>Forecast</h2>
              <Plot 
                data={[
                  {
                    x: this.props.redux.get('dates'),
                    y: this.props.redux.get('temps'),
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
    redux: state
  };
}

export default connect(mapStateToProps)(App);
