import './App.css';
import React, { useState, useEffect } from 'react';
import {useParams, NavLink} from 'react-router-dom';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


function Home() {
    
  let { id } = useParams();

    // const pageQuery = graphql`
    // {
    //     recipe(id: "${id}"){
    //       sys{id}
    //       name
    //       course
    //       picture {
    //         title 
    //         description 
    //         contentType
    //         fileName
    //         size
    //         url
    //         width
    //         height
    //       }
    //       ingredients{
    //         childMarkdownRemark {
    //           html 
    //         } 
    //       }
    //       instructions
    //     }
    //   }
    // `

    const query = `
    {
      recipe(id: "${id}"){
        sys{id}
        name
        course
        picture {
          title 
          description 
          contentType
          fileName
          size
          url
          width
          height
        }
        ingredients
        instruction{
          json
        }
      }
    }
    `


    const [recipe, setRecipe] = useState(null)

console.log(process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN)
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

        // rerender the entire component with new data
        
        console.log(data)
        setRecipe(data.recipe)
        console.log(data.recipe)
      });
  }, []);

  if (!recipe) {
    return "Loading..."
  }

  return (
    <div className="App">
      <header >
        <div className="headlineContainer">
          <div className="backBtn">
        <NavLink to={`/`} className="backBtnContent">
          {"<"}
          </NavLink></div>
          <h1 className="recipeTitle">
        {
          recipe.name
        }</h1>
        </div>
        <div className="recipeImageContainer">
        <img className="recipeImage" src={recipe.picture.url}></img>
        </div>
      </header>
      <div className="recipeCourse">Course: {recipe.course}</div>
      <div className="recipeIngredientsListContainer">
      <div className="recipeIngredientsList">
        {recipe.ingredients.map(ingredient => {
          return <div className="recipeIngredient">{ingredient}</div>
      })}</div>
      </div>
      <div className="recipeInstructions">{documentToReactComponents(recipe.instruction.json)}</div>
    </div>
  );
}

export default Home;
