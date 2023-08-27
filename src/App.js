import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  
  const[name, setName] = useState('');
  const[userdata, setUserdata] = useState(null);
  const[error, setError] = useState(null);
  const[elementdisplay, setElementdisplay] = useState('flex');
  const[bgcolor, setBgcolor] = useState('#fff');
  const[color, setColor] = useState('#000');
  const [borderColor, setBorderColor] = useState('black');
  // const [buttonContent, setButtonContent] = useState('\xb00');

  const handleSearch = async () => {
    setError(null);
    
    try {
      const response = await axios.get(`https://api.github.com/users/${name}`);
      setUserdata(response.data);
      setElementdisplay('none');
    } catch (error) {
      setError('User not found.');
    }

  };

  const close = () => {
    setElementdisplay('flex');
    setUserdata(null);
    setName('');
  }

  const theme = () => {
    // setButtonContent('&#9788;');
    toggleBorderColor();
    if (bgcolor === '#fff'){
      setBgcolor('#000');
      // setBordercolor('black');
      setColor('#fff');
    }
    else if (bgcolor === '#000'){
      setBgcolor('#fff');
      // setBordercolor('white');
      setColor('#000');
    }
  }

  const toggleBorderColor = () => {
    if (borderColor === 'black') {
      setBorderColor('white');
    } else {
      setBorderColor('black');
    }
  };
  return (
    <div className="App" style={{ backgroundColor: bgcolor, color: color}}>
      <h1>GitHub Search</h1>
      <div className='cont1' style={{ display: elementdisplay }}>
        <input className='username'
                type='text' 
                placeholder='Enter Username'
                value={name}
                onChange={(e)=> setName(e.target.value)}></input>
        <button className='search' onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {userdata && (
        <div className="user-profile" style={{ border: `1px solid ${borderColor}`}}>
          <div className='x'>
            <button onClick={close}>X</button>
          </div>
          <img src={userdata.avatar_url} alt="User Avatar" />
          <h2 className='usrnm'>{userdata.login}</h2>
          <p>Name: {userdata.name}</p>
          <p>Followers: {userdata.followers}</p>
          <p>Following: {userdata.following}</p>
          <p>Public Repos: {userdata.public_repos}</p>
        </div>        
      )}
      <div className='theme'>
        <button onClick={theme}>O</button>
      </div>
    </div>
  );
}

export default App;
