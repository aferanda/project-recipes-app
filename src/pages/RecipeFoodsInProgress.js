// Tela de receita em processo de comida: `/comidas/{id-da-receita}/in-progress`;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FoodsDetails from '../components/FoodsDetails';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import { doneFoodsRecipes } from '../helpers/doneRecipes';

function RecipeFoodsInProgress() {
  const [checked, setChecked] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const { mealsDetails } = useContext(FoodRecipesContext);
  const { share, setShare, ingredients } = useContext(DrinkRecipesContext);

  const { pathname } = useLocation();
  const ID = pathname.split('/')[2];

  useEffect(() => {
    const inProgressDefault = { cocktails: {}, meals: {} };
    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || inProgressDefault;
    if (inProgressRecipes.meals[ID]) {
      setChecked(inProgressRecipes.meals[ID]);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [ID, setChecked]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    Object.assign(inProgressRecipes.meals, { [ID]: checked });
    if (inProgressRecipes.meals[ID].length === Object.entries(ingredients).length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [ID, checked, ingredients]);

  return (
    <>
      { share
      && (
        <div className="alert-container">
          <div className="alert">
            <p>Link copiado!</p>
            <button type="button" onClick={ () => setShare(false) }>X</button>
          </div>
        </div>)}
      <FoodsDetails checked={ checked } setChecked={ setChecked } />
      <Link to="/receitas-feitas">
        <button
          type="button"
          className="finish-recipe-btn"
          data-testid="finish-recipe-btn"
          disabled={ isDisabled }
          onClick={ () => doneFoodsRecipes(mealsDetails) }
        >
          Finalizar Receita
        </button>
      </Link>
    </>
  );
}

export default RecipeFoodsInProgress;
