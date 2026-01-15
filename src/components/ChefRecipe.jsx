import React from 'react'
import ReactMarkdown from "react-markdown"

const ChefRecipe = (props) => {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
        <h2>Chef AI Recommends:</h2>
        <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  )
}

export default ChefRecipe