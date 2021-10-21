import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Recipe from './Recipe'

// const GqlSpaceId = 'njpamh37adwc';

// const GqlToken = '4TvBJEJIG7PBWPKDW_w-_2Mv6JTveJxGsNK6dZ3LlQY'

const query = `
{
  recipeCollection {
    items {
      sys {id},
      name,
      course,
      picture {
        url
      }
    }
  }
}
`

function App() {


  return (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/:id" component={Recipe} />
  </Switch>
  );
}

export default App;
