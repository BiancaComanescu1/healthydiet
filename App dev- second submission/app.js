
const weightNo = document.querySelector('#weight-lbl');
const goalNo = document.querySelector('#goal-lbl');

const replaceGoal = document.querySelector ('#btn-replace-goal');
const addCurrent = document.querySelector ('#btn-replace-current');

const finalGoal = document.querySelector ('#final-goal');
const finalWeight = document.querySelector ('#final-weight');

const outputKG = document.querySelector ("#list-lbl");






replaceGoal.addEventListener('click', updateGoal);




function updateGoal (){

    let realGoal= goalNo.value;
    finalGoal.textContent = realGoal;
    clearItem();
   
}

function clearItem(){
    goalNo.value="";
    weightNo.value="";
    addName.value="";
    addDay.value="";
    addMeal.value="";
    
}
addCurrent.addEventListener('click', addCurrentWeight);

function addCurrentWeight(){

    let output = ` ${weightNo.value}kg\n` ;
    

    const newItem = document.createElement ('ion-item');
    newItem.textContent = output;
    outputKG.appendChild(newItem);
    clearItem();
    
}


const addFood = document.querySelector ('#food-add');
const addMeal = document.querySelector ('#type-meal');
const addDay = document.querySelector ('#day-week');
const addName = document.querySelector ('#name-meal');
const outputMeal = document.querySelector ('#output-meal')



addFood.addEventListener('click', addFoodList);

function addFoodList(){

    let output = `${addDay.value}: ${addMeal.value} - ${addName.value} \n` ;
    

    const newItem = document.createElement ('ion-item');
    newItem.textContent = output;
    outputMeal.appendChild(newItem);
    clearItem();
    
}

const imageDisplay = document.getElementById("img-display");
const recipeSubmit = document.querySelector ('#submit-recipes');
const caloriesNo = document.querySelector ('#calories-lbl');
const recipeInput = document.querySelector ('#recipe-name-lbl');
const outputList = document.querySelector ('#output-list');
const recipeTitle = document.querySelector ('#title-name');
const outputSelect = document.querySelector ('#select-output');

const searchTerm = document.querySelector ('#input-recipe-name');
//let recipeNameInput = "";




const recipes ="https://api.edamam.com/search?q=chicken&app_id=f45ab741&app_key=%20d0e70952c6b3251fe0d750c3a8a1ffb0";
const recipes2= "https://api.edamam.com/search?q=potato&app_id=f45ab741&app_key=%20d0e70952c6b3251fe0d750c3a8a1ffb0";
getSelectData();

outputSelect.addEventListener('ionChange', getDetails);

//------------------------------------------------------------------
function getDetails(){
  
 


  fetch(recipes).then(getJson).then(updateDisplay).catch(reportError);
  fetch(recipes2).then(getJson).then(getListOfRecipes).catch(reportError);
  
}

//-------------------------------------------------------------------
function getJson(aResponse){
  return aResponse.json();
  

}


function updateDisplay(jsonObj){
    //getRecipeNameInput();
    


    let recipeObjectArray = jsonObj;
    let recipeObject;


    for (let aRecipeObject of recipeObjectArray.hits){
        if (aRecipeObject.recipe.label === outputSelect.value)
            recipeObject = aRecipeObject;
        removeAllItems();
    }

    let recipeName = recipeObject.recipe.label; 
    let recipeImageURL = recipeObject.recipe.image;

    // recipeTitle.textContent = recipeName;
    imageDisplay.src = recipeImageURL;
    makeDetailsList(recipeObject);


}


function reportError(anError){
    console.log(anError);
}


function getRecipeNameInput(){

    recipeNameInput = searchTerm.value;
    removeAllItems();

}

function makeDetailsList(aRecipeObject){

    let recipePropertyList = ["label", "calories","url","ingredientLines", "mealType"];

    for (let recipeProperty of recipePropertyList){

        const newItem = document.createElement("ion-item");
        let outputText= recipeProperty.toUpperCase() + ": " + aRecipeObject.recipe[recipeProperty];
        newItem.textContent = outputText;
        outputList.appendChild(newItem);
    }
    
    
}
function removeAllItems(){
    while(outputList.lastElementChild){
  
      outputList.removeChild(outputList.lastElementChild);
    }
  }

  function getSelectData(){

    fetch(recipes).then(getJson).then(getListOfRecipes).catch(reportError);
    fetch(recipes2).then(getJson).then(getListOfRecipes).catch(reportError);

  }
  
  function getListOfRecipes(jsonObj){
      let recipeObjectArray = jsonObj;
      let recipeNamesArray = [];

      for (let recipeObject of recipeObjectArray.hits){
          recipeNamesArray.push(recipeObject.recipe.label);
      }

      buildSelectOptions(recipeNamesArray);
  }


function buildSelectOptions(anArrayOfRecipesNames){

        for (let recipeName of anArrayOfRecipesNames){
            createSelectOption(recipeName);
        }

}

function createSelectOption(aName){
    const newItem = document.createElement("ion-select-option");
    newItem.value = aName;
    newItem.textContent = aName.toUpperCase();

    outputSelect.appendChild(newItem);
}




















