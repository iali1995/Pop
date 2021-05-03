import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const styles = {
  main:{'margin': 0,
    'padding': 0,
    'width': '210px',
    'backgroundColor': '#f1f1f1',
    'position': 'absolute',
    'height': '100vh',
    'overflow': 'auto',
    'zIndex': 99
  },
  links:{
    'display': 'block',
    'color': 'white',
    'padding': '16px',
    'textDecoration': 'none'
  }
}
const Button = styled.button`
  background: lightgrey;
  border-radius: 10px;
  border-width: 4px;
  border-color: #ffd1dc;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  width: 9em;
  display: block;
`

const SideBar = ({ close, setMLPrimary, setLVPrimary }) => {

  return (
    <div style={styles.main} className='sidebar'>
      <ul styles={styles.links}>
        <br/>
        <Link>
          <Button><a onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
            }}>PopUps</a></Button> 
        </Link>
        <br/>
        <Link to='/yourprofile'>
          <Button><a onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
            }}>Your Profile</a></Button>
        </Link>
        <br/>
        <Link to='/yourpopups'>
          <Button><a onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
          }}>Your PopUps</a></Button>
        </Link>
        <br/>
        <Link to='/settings'>
          <Button><a onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
          }}>Settings</a></Button>
        </Link>
        <br/>
          <Button><a href="/logout" onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
            }}>Logout</a></Button>
      </ul>
    </div>
  )
}

export default SideBar;