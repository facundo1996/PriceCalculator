/* Contains all recipes */
let recipes = [];

/* Contains a recipe */
let recipe = [];

/* load saved recipes */
window.addEventListener('load',function(){
    let numerical_counter = 0
    if (localStorage.length > 0){
        document.getElementById("records").style.display="block"
    }
    while (localStorage.getItem('local_recipes'+numerical_counter)){
       

        let innHTML = "";
        innHTML += "<div id='recipe_record"+numerical_counter+"'>"+localStorage.getItem('local_recipes'+numerical_counter)+"<button class='btn btn-dark' onclick='remove_local(this)'>Eliminar</button><hr></div>";
        document.getElementById('records').innerHTML+=innHTML
        

        numerical_counter = numerical_counter+1
    }
})

/* Create the final product list */
document.getElementById('create').addEventListener('click', function(){
    
    /* name validation */
    if (document.getElementById('name').value === "") {
        document.getElementById('name').style.background="pink"
    }
    else{
        /* Create the product and save it to the recipe list */
        let product1 = [document.getElementById('name').value];
        document.getElementById('name').style.background="white"
        document.getElementById("calculated").style.display="block"
        document.getElementById("result").style.display="block"
    
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
        document.getElementById("products").style.display="block"
    }
    recipe = []

    
});

/* Calculate the price of what you used */
document.getElementById('calculated').addEventListener('click', function(){
    let price = document.getElementById('price').value
    let totally = document.getElementById('totally').value
    let used = document.getElementById('used').value

    if (document.getElementById('ingredient').value === "") {
        document.getElementById('ingredient').style.background="pink"
        document.getElementById('price').style.background="white"
        document.getElementById('totally').style.background="white"
        document.getElementById('used').style.background="white"
    }else if (price === "") {
        document.getElementById('price').style.background="pink"
        document.getElementById('ingredient').style.background="white"
        document.getElementById('totally').style.background="white"
        document.getElementById('used').style.background="white"
        
    }else if (totally === "") {
        document.getElementById('totally').style.background="pink"
        document.getElementById('ingredient').style.background="white"
        document.getElementById('price').style.background="white"
        document.getElementById('used').style.background="white"
    }else if (used === "") {
        document.getElementById('used').style.background="pink"
        document.getElementById('ingredient').style.background="white"
        document.getElementById('price').style.background="white"
        document.getElementById('totally').style.background="white"
    }
    else {
        let result =(used*price)/totally;
        document.getElementById('result').value = parseFloat(result).toFixed(2);
        document.getElementById("add").style.display="block"
        document.getElementById('ingredient').style.background="white"
        document.getElementById('price').style.background="white"
        document.getElementById('totally').style.background="white"
        document.getElementById('used').style.background="white"
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

        document.getElementById("finish").style.display="block"
        document.getElementById("add").style.display="none"
    }
});

/* Finished current product */
document.getElementById('finish').addEventListener('click', function(){
    document.getElementById('name').readOnly = false
    document.getElementById("create").style.display="block"
    document.getElementById('name').value = ""

    let last_array = recipes.length - 1
 
    /* Put the summary in a <p> and  add the delete button*/
    let innHTML = "";
    innHTML += "<p class='font-weight-bold'>El total gastado: $"+document.getElementById('totally_number'+last_array).value+"</p> <button class='btn btn-dark' onclick='save(this)'>Guardar receta</button> <button class='btn btn-dark' onclick='remove(this)'>Eliminar</button> "
    innHTML += "<hr>"
    document.getElementById('product'+last_array).innerHTML+=innHTML


    /* Delete the summary */
    let input2 = document.getElementById('totally'+last_array)
    let parent = input2.parentNode
    parent.removeChild(input2)
    
    document.getElementById("finish").style.display="none"
    document.getElementById("calculated").style.display="none"
    document.getElementById("result").style.display="none"
    
}); 


/* Delete the product (also from the list) */
const remove = b => {
    let parent = document.getElementById('products');
    let child = b.parentElement;
    
    
    let number_list = parseInt(child.id.slice(-1));
    
    let name_screen = document.getElementById('product'+number_list).childNodes[1].innerHTML;
    /* let name_list = recipes[number_list][0][0]; */
    
    recipes = recipes.filter(recipes_filter => recipes_filter[0][0] != name_screen)
    
    parent.removeChild(child)
    console.log(recipes)

    if(recipes.length === 0 ){
        document.getElementById("products").style.display="none"
    }

}

const save = x => {
    let parent = document.getElementById('products');
    let child_html = x.parentElement
    /* Delete Buttons */
    child_html.removeChild(child_html.childNodes[child_html.childNodes.length - 3 ])
    child_html.removeChild(child_html.childNodes[child_html.childNodes.length - 4 ])
    child_html.removeChild(child_html.childNodes[child_html.childNodes.length - 1 ])
    
    /* Save in local storage */
    let numerical_counter = 0
    while (localStorage.getItem('local_recipes'+numerical_counter)){
        numerical_counter = numerical_counter+1
    }
    localStorage.setItem('local_recipes'+numerical_counter,child_html.innerHTML)
    
    /* code copied from the remove function */
    let number_list = parseInt(child_html.id.slice(-1));
    let name_screen = document.getElementById('product'+number_list).childNodes[1].innerHTML;
    recipes = recipes.filter(recipes_filter => recipes_filter[0][0] != name_screen)


    /* Delete HTML */
    parent.removeChild(child_html)
    /* History appears */
    document.getElementById("records").style.display="block"
    
    if(recipes.length === 0 ){
        document.getElementById("products").style.display="none"
    }
    

    let innHTML = "";
    innHTML += "<div id='recipe_record"+numerical_counter+"'>"+localStorage.getItem('local_recipes'+numerical_counter)+"<button class='btn btn-dark' onclick='remove_local(this)'>Eliminar</button><hr></div>";
    document.getElementById('records').innerHTML+=innHTML

}

/* Delete the recipe from the localstorage */
const remove_local = g => {
    let parent = document.getElementById('records');
    let child_html = g.parentElement
    
    localStorage.removeItem('local_recipes'+child_html.id.slice(-1))
    parent.removeChild(child_html)

    if (localStorage.length === 0){
        document.getElementById("records").style.display="none"
    }

}

/* Help buttom */
document.getElementById('help').addEventListener('click', function(){
    document.getElementById("help_div").style.display="flex"
})

document.getElementById('close_help').addEventListener('click', function(){
    document.getElementById("help_div").style.display="none"
})
