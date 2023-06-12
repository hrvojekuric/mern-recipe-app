import { useState } from "react";
import { getUserId } from "../../hooks/getUserId";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const userId = getUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipes, setRecipes] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipes({ ...recipes, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipes.ingredients];
    ingredients[index] = value;
    setRecipes({ ...recipes, ingredients });
  };

  const addIngredient = () => {
    const ingredients = [...recipes.ingredients, ""];
    setRecipes({ ...recipes, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/recipes",
        { ...recipes },
        { headers: { authorization: cookies.access_token } }
      );
      alert("Recipe created");

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        name="name"
        id="name"
        type="text"
        value={recipes.name}
        onChange={handleChange}
      />
      <label htmlFor="imageUrl">Image url</label>
      <input
        type="string"
        id="imageUrl"
        name="imageUrl"
        value={recipes.imageUrl}
        onChange={handleChange}
      />
      <label htmlFor="ingredients">Ingredients</label>
      {recipes.ingredients.map((ingredient, index) => (
        <input
          key={index}
          type="text"
          name="ingredients"
          value={ingredient}
          onChange={(event) => handleIngredientChange(event, index)}
        />
      ))}
      <button type="button" onClick={addIngredient}>
        Add ingredient
      </button>
      <label htmlFor="instructions">Instructions</label>
      <textarea
        type="string"
        name="instructions"
        id="instructions"
        value={recipes.instructions}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="cookingTime">Cooking time</label>
      <input
        type="number"
        name="cookingTime"
        id="cookingTime"
        value={recipes.cookingTime}
        onChange={handleChange}
      />
      <button type="submit">Create recipe</button>
    </form>
  );
};

export default CreateRecipe;
