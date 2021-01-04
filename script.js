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

/* Calculate the price of what you used */
document.getElementById('calculated').addEventListener('click', function(){
    if (document.getElementById('ingredient').value === "") {
        alert("Falta el nombre del ingrediente/producto")
    }else if (document.getElementById('price').value === "") {
        alert("Falta el precio del producto")
    }else if (document.getElementById('totally').value === "") {
        alert("Falta el total del producto")
    }else if (document.getElementById('used').value === "") {
        alert("Falta la cantidad que utilizo")
    }
    else {
        let price = document.getElementById('price').value;
        let totally = document.getElementById('totally').value;
        let used = document.getElementById('used').value;
        let result =(used*price)/totally;
        document.getElementById('result').value = result;
    }
});

/* Add an ingredient to the recipe */
document.getElementById('add').addEventListener('click', function(){
    if(document.getElementById('result').value === ""){
        alert("Falta calcular el producto")
    }
    else{
        ingredient = [
            document.getElementById('ingredient').value,
            document.getElementById('price').value,
            document.getElementById('totally').value,
            document.getElementById('used').value,
            document.getElementById('result').value
        ];
        
        let last_array = recipes.length - 1 ;
        
        recipes[last_array].push(ingredient);
        
        /* Sum the totally */
        let valor_quetiene = parseFloat(document.getElementById('totally_number'+last_array).value)
        document.getElementById('totally_number'+last_array).value = parseFloat(valor_quetiene) + parseFloat(document.getElementById('result').value)
        
        console.log(recipes);
        
        document.getElementById('ingredient').value = ""
        document.getElementById('price').value = ""
        document.getElementById('totally').value = ""
        document.getElementById('used').value = ""
        document.getElementById('result').value = ""

        let innHTML = "";
        innHTML += "<p>"+ingredient[0]+" "+ingredient[3]+"gr - $"+ingredient[4]+"°°</p>"
        document.getElementById('product'+last_array).innerHTML+=innHTML
    }
});