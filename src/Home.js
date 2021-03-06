import './App.css';
import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';

function Home() {

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

  const [recipes, setRecipes] = useState(null)


  console.log(process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN)
  console.log(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        console.log(query)
        // rerender the entire component with new data
        setRecipes(data.recipeCollection.items)
        console.log(recipes)
      });
  }, []);

  if (!recipes) {
    return "Loading..."
  }

  return (
    <div className="App">
      <header >
        Our Recipes
      </header>
      <ul>
        {
          recipes.map((r, i) => {
            return (
              <li >
                <NavLink to={`/${r.sys.id}`}>
                  {r.name}
                </ NavLink>
              </li>)
          })

        }
      </ul>
    </div>
  );
}

export default Home;
