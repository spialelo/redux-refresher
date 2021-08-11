import React from 'react';
import 'dotenv/config';
import xhr from 'xhr';
import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: ''
    };

  }

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

    /*
    fetch(url).then(response => response.json())
      .then(json => this.setState({data: json}))
      .catch(error => console.log("Oops. Error."));
    */

    xhr({
      url: url
    }, (err, data) => {
      if(err) {
        console.log('Ooops. Error.', err);
        return;
      }

      this.setState({
        data: JSON.parse(data.body)
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

  let currTemp = 'Specify a location';
  if(this.state.data && this.state.data.list) {
    currTemp = this.state.data.list[0].main.temp;
  }    

    return (
      <div>
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
        <p className="temp-wrapper">
          <span className="temp">{ currTemp }</span>
          <span className="temp-symbol">°C</span>
        </p>
      </div>
    );
  }


}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
