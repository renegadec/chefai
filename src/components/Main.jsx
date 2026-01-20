import React, { useState, useRef, useEffect } from 'react'
import IngredientsList from "./IngredientsList"
import ChefRecipe from "./ChefRecipe"
import { getRecipeFromChefClaude, getRecipeFromMistral } from "../ai"

const Main = () => {

    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("")
    const recipeSection = useRef(null)

    useEffect(() => {
        if(recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behaviour: 'smooth'})
        }
    }, [recipe])

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

  return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ChefRecipe recipe={recipe} />}
        </main>
  )
}

export default Main