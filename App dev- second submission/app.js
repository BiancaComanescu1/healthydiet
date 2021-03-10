
//Progress page 
const weightNo = document.querySelector('#weight-lbl');
const goalNo = document.querySelector('#goal-lbl');

const replaceGoal = document.querySelector ('#btn-replace-goal');
const addCurrent = document.querySelector ('#btn-replace-current');

const finalGoal = document.querySelector ('#final-goal');
const finalWeight = document.querySelector ('#final-weight');

const outputKG = document.querySelector ("#list-lbl");


//OK button for Goal weight
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

//OK button for Current Weight
addCurrent.addEventListener('click', addCurrentWeight);

function addCurrentWeight(){

    let output = ` ${weightNo.value}kg\n` ;
    

    const newItem = document.createElement ('ion-item');
    newItem.textContent = output;
    outputKG.appendChild(newItem);
    clearItem();
    
}


//Food Diary page
const addFood = document.querySelector ('#food-add');
const addMeal = document.querySelector ('#type-meal');
const addDay = document.querySelector ('#day-week');
const addName = document.querySelector ('#name-meal');
const outputMeal = document.querySelector ('#output-meal')


//Submit button for Food Diary entry log
addFood.addEventListener('click', addFoodList);

function addFoodList(){

    let output = `${addDay.value}: ${addMeal.value} - ${addName.value} \n` ;
    

    const newItem = document.createElement ('ion-item');
    newItem.textContent = output;
    outputMeal.appendChild(newItem);
    clearItem();
    
}


//Recipe page/API
const imageDisplay = document.getElementById("img-display");
const recipeSubmit = document.querySelector ('#submit-recipes');
const caloriesNo = document.querySelector ('#calories-lbl');
const recipeInput = document.querySelector ('#recipe-name-lbl');
const outputList = document.querySelector ('#output-list');
const recipeTitle = document.querySelector ('#title-name');
const outputSelect = document.querySelector ('#select-output');

const searchTerm = document.querySelector ('#input-recipe-name');




const recipes ="https://api.edamam.com/search?q=chicken&app_id=f45ab741&app_key=%20d0e70952c6b3251fe0d750c3a8a1ffb0";
getSelectData();

outputSelect.addEventListener('ionChange', getDetails);

//------------------------------------------------------------------
function getDetails(){
  
 


  fetch(recipes).then(getJson).then(updateDisplay).catch(reportError);
  
  
}

//-------------------------------------------------------------------
function getJson(aResponse){
  return aResponse.json();
  

}


function updateDisplay(jsonObj){
    
    let recipeObjectArray = jsonObj;
    let recipeObject;


    for (let aRecipeObject of recipeObjectArray.hits){
        if (aRecipeObject.recipe.label === outputSelect.value)
            recipeObject = aRecipeObject;
        removeAllItems();
    }

    let recipeName = recipeObject.recipe.label; 
    let recipeImageURL = recipeObject.recipe.image;

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

//local storage

document.querySelector('#foodDiary').addEventListener('#food-add', function(e){

    const task = document.querySelector('#day-week').value;
    const task2 = document.querySelector('#type-meal').value;
    const task3 = document.querySelector('#name-meal').value;

    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks=[]; 
       } else{
           tasks = JSON.parse(localStorage.getItem('tasks'));
       }

       tasks.push(task);
       tasks.push(task2);
       tasks.push(task3);

       localStorage.setItem('tasks', JSON.stringify(tasks));
       

       const tasks = JSON.parse(localStorage.getItem('tasks'));

       tasks.forEach(function(task){
           console.log(task)
       })
})





















