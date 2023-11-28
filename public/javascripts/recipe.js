/* Sources:
How to check when Enter key is pressed in text inputfield: https://blog.devgenius.io/how-to-detect-the-pressing-of-the-enter-key-in-a-text-input-field-with-javascript-380fb2be2b9e  */

async function searchRecipe(recipeName) {
    let url = "http://127.0.0.1:3000/recipe/"+recipeName;
    let response = await fetch(url);
    let recipe = await response.json(); 
    if (recipe.data == "Recipe not found!") {
        console.log("Recipe not found!");
        return
    } else {
        let foundRecipe = {
            name: recipe.data.name,
            instructions: recipe.data.instructions, 
            ingredients: recipe.data.ingredients
        }
        renderPage(foundRecipe)
    }
}
async function addNewRecipe() {
    //Finding elements: 
    const newRecipeName = document.getElementById("name-text");
    const newIngredient = document.getElementById("ingredients-text");
    const newInstruction = document.getElementById("instructions-text");
    const addIngredientBtn = document.getElementById("add-ingredient");
    const addInstructionBtn = document.getElementById("add-instruction");
    const submitBtn = document.getElementById("submit");
    // Lists for ingredients and instructions
    let ingredients = []; 
    let instructions = []; 

    // Checking whether new ingredient is added: 
    addIngredientBtn.addEventListener("click", () => {
        if (newIngredient.value !== "") {
            if (ingredients.indexOf(newIngredient.value) == -1) {
                ingredients.push(newIngredient.value)
                console.log("New ingredient added!")
            }
        }
    })

    addInstructionBtn.addEventListener("click", () => {
        if (newInstruction.value != "" && instructions.indexOf(newInstruction.value) == -1) {
            instructions.push(newInstruction.value);
            console.log("New instruction added!!")
        } 
    })

    submitBtn.addEventListener("click", async () => {
        if (newRecipeName.value !== "" && ingredients.length != 0 && instructions.length != 0 ) {
            let recipe = {
                "name": newRecipeName.value,
                "instructions": instructions,  
                "ingredients": ingredients
            }
            let response = await fetch("http://127.0.0.1:3000/recipe/", {method: 'POST',
            headers: {
            "Content-type": "application/json"
             }, 
            body: JSON.stringify(recipe)
            //body: '{ "name": "' + newRecipeName.value + '", "instructions": ' + instructions + '", "ingredients": '+ingredients + '}'
           });
           let data = await response; 
           console.log(data);
        }

        sendImages()
    })

}

async function sendImages() {
    const imageInput = document.getElementById("image-input");
    let images_temp = imageInput.files;
    let images = []
    for (let i=0; i < images_temp.length; i++) {
        images.push(images_temp[i].name)
    }
    //Example how to use formData: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects
    //Sending FormData: https://medium.com/deno-the-complete-reference/sending-form-data-using-fetch-in-node-js-8cedd0b2af85
    let imageData = new FormData();
    imageData.append("images", images);
    let body = imageData;
    let response = await fetch("http://127.0.0.1:3000/images", {method: "POST", body,});
    let text = await response.text(); 
    console.log(text);
}


function renderPage(recipe) {
    let nameItem = document.getElementById("recipe-name");
    let ingredientsList = []; 
    let instructionsList = []; 
    let Ing_list = document.getElementById("ingredients-list");
    let Inst_list = document.getElementById("instructions-list");
    //Creating new elements when none exists in the website or when the recipe name is changed
    if (nameItem.innerText == "" || nameItem.innerText !== recipe.name) {
        nameItem.innerText = recipe.name;
        if (ingredientsList.length == 0 ) {
            ingredientsList = recipe.ingredients
        }

        if (instructionsList.length == 0) {
            instructionsList = recipe.instructions; 
        }
        //Emptying the list in case there is some items already! Based on this: https://www.tutorialspoint.com/how-to-remove-an-added-list-items-using-javascript
        while (Ing_list.firstChild) {
            Ing_list.removeChild(Ing_list.firstChild);
        }
        while (Inst_list.firstChild) {
            Inst_list.removeChild(Inst_list.firstChild);
        }
    
        ingredientsList.forEach(ingredient => {
            let item = document.createElement("li");
            item.innerText = ingredient; 
            Ing_list.appendChild(item);
        });

        instructionsList.forEach(instruction => {
        let item = document.createElement("li");
        item.innerText=instruction; 
        Inst_list.appendChild(item);
    });
    } 
    
    //body.appendChild(Ing_list);
}
window.onload = async function() {
    //Task 1
    //let recipe = await getRecipe()
    //renderPage(recipe)
    const search = document.getElementById("search");
    
    search.addEventListener("keyup", async (event) => {
        if(event.key === "Enter"){
            if (search.value !== "") {
                console.log("Looking for a recipe for " + search.value + "..");
                await searchRecipe(search.value);
            }
        }
    })
    
    addNewRecipe();


}