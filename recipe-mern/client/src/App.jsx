import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/home/Home";
import CreateRecipe from "./routes/create-recipe/CreateRecipe";
import SavedRecipes from "./routes/saved-recipes/SavedRecipes";
import User from "./routes/auth/user/User";
import NavBar from "./components/NavBar";

function App() {
  return (
    <main className="app">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-recipe" element={<CreateRecipe />}></Route>
          <Route path="/saved-recipes" element={<SavedRecipes />}></Route>
          <Route path="/user" element={<User />}></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
