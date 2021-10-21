import './App.css';
import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom'

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


  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/njpamh37adwc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer 4TvBJEJIG7PBWPKDW_w-_2Mv6JTveJxGsNK6dZ3LlQY",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

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
              <li>
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
