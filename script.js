/* Contains all recipes */
let recipes = [];

/* Contains a recipe */
let recipe = [];

/* Create the final product list */
document.getElementById('create').addEventListener('click', function(){
    
    /* name validation */
    if (document.getElementById('name').value === "") {
        alert("Ingresa un nombre correcto")
    }
    else{
        /* Create the product and save it to the recipe list */
        let product1 = [document.getElementById('name').value];
    
        recipe.push(product1);
        recipes.push(recipe)

        document.getElementById('name').readOnly = true
    
        console.log(recipes)
    
        document.getElementById("create").style.display="none"

        /* We show it on screen */
        let last_array = recipes.length - 1 ;
        let innHTML = "";
        innHTML += "<div id='product"+last_array+"' class='product'> <h3 id='h3'>"+document.getElementById('name').value+"</h3></div>"
        innHTML += "<div id='totally"+last_array+"' class='product'> <input id='totally_number"+last_array+"' readOnly value='0'></div>"
        document.getElementById('products').innerHTML+=innHTML
    }
    recipe = []
});

    