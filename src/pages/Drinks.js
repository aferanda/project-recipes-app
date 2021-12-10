// Tela principal de receitas de bebidas: `/bebidas`;
import React, { useContext } from 'react';
import { DrinkRecipesContext } from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Categories from '../components/Categories';
import '../styles/recipes.css';

const MAX_CARDS = 12;
const MAX_CATEGORIES = 5;

function Drinks() {
  const { drinksRecipes, drinksCategories } = useContext(DrinkRecipesContext);

  return (
    <>
      <Header />
      <div className="ctn-btn-categories">
        { drinksCategories.map(({ strCategory }, index) => (
          index < MAX_CATEGORIES && (
            <Categories key={ index } categoryName={ strCategory } />
          )
        )) }
      </div>
      <section className="ctn-card-recipes">
        { drinksRecipes
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            index < MAX_CARDS
            && (
              <Card
                key={ idDrink }
                index={ index }
                name={ strDrink }
                img={ strDrinkThumb }
              />
            )
          )) }
      </section>
      <Footer />
    </>
  );
}

export default Drinks;
