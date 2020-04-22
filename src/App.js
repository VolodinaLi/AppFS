import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderTabs from './components/HeaderTabs';
import config from './config';
import Firebase from 'firebase';

class App extends React.Component {
  constructor(props) {
    super(props)
    Firebase.initializeApp(config);
    this.state = {
      mainPage:(
        <div> Главная Страница</div>
      ),
      database: Firebase.database()      
    }
    
  }

  render() {
    return (
      <div>
        <HeaderTabs item1={this.state.mainPage} database={this.state.database}/> 
      </div>
    );
  }
}

export default App;
