import React from 'react';
import './Character.css';
import picture from '../resources/picture.svg';

class Character extends React.Component{
  render(){
    return(
     <div className="CharacterPage">
        <img src={picture} className="Face"/>
     </div>
     );
  }
}
export default Character;