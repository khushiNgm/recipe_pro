
const inputBox  = document.querySelector("#input");
const searchbtn = document.querySelector("#Search");
const recipeContainer = document.querySelector(".recipeContainer");
const recipeDetailContent=document.querySelector(".recipeDetailContent");
const recipeCloseBtn=document.querySelector(".recipeCloseBtn");


const fetchRecipes = async(query) =>{
    recipeContainer.innerHTML="<h2>Fetching recipes...</h2>";

    try{
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
    
        recipeContainer.innerHTML="";
    
        response.meals.forEach(meal => {
          const recipeDiv = document.createElement('div');
          recipeDiv.classList.add('recipe');
    
          recipeDiv.innerHTML =`
          <img src="${meal.strMealThumb}"/>
          <h3>${meal.strMeal}</h3>
          <p><span class="dish">${meal.strArea}</span>Dish</p>
           <p>Belongs to <span class="dish">${meal.strCategory}</span> Category</p>
          `
          const button =document.createElement('button');
          button.textContent="View Recipe";
          button.id='showRecipe';
           recipeContainer.appendChild(recipeDiv);
         
    
                //Adding EventListener to recipe button
                button.addEventListener('click',()=>{
                    console.log("openRecipePOPup");
                    openRecipePopup(meal);
                })
                recipeDiv.appendChild(button);
        });

    }
    catch(error){
        recipeContainer.innerHTML="<h2>Error in featching Recipes...</h2>";
    }
  
}

                             //function for Ingredients
const fetchIngredients =(meal)=>{
   let  IngredientsList= "";
   for(let i=1;i<=20;i++){
    const ingredient = meal[`strIngredient${i}`];
    console.log(ingredient);
     if(ingredient){
         const measure =meal[`strMeasure${i}`];
        IngredientsList += `<li>${measure} ${ingredient}</li>`
        console.log( IngredientsList);
    }
    else{
       break;
     }
   }
   return IngredientsList;
}

const  openRecipePopup= (meal) =>{
    recipeDetailContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
       <h3>Ingredents:</h3>
    <ul class="ingredeientList">${fetchIngredients(meal)}</ul>
     <div class="recipeinstruction">
        <h3>Instruction:</h3>
        <p >${meal.strInstructions}</p>
    </div>
    <div class="vedio"><h3>Find vedio solution:</h3>
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
   
    `
    recipeDetailContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailContent.parentElement.style.display="none";
});

searchbtn.addEventListener('click',()=>{
         // No need for preventDefault() as there's no default action for the button
    const input =inputBox.value.trim();
    if(!input){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(input);
    console.log("button was clicked");
});


