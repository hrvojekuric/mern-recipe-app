import { useEffect, useState } from "react";
import axios from "axios";
import { getUserId } from "../../hooks/getUserId";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userId = getUserId();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    const result = await axios.put("http://localhost:3000/recipes", {
      userId,
      recipeID,
    });
    setSavedRecipes(result.data.savedRecipe);
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <main>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h2>{recipe.name}</h2>
          <img src={recipe.imageUrl} />
          <p>{recipe.instructions}</p>
          <div>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </div>
          <p>Cooking time: {recipe.cookingTime} min</p>
          <button
            onClick={() => saveRecipe(recipe._id)}
            disabled={isRecipeSaved(recipe._id)}
          >
            {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
          </button>
        </div>
      ))}
    </main>
  );
};

export default Home;
