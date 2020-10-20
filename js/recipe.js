function Food(){
    let items=[]

    function addRecipe(item){
        items.push(item)
        addHtml()
    }
    function removeRecipe(){
        items.pop()
        addHtml()
    }
    function sortAToZ(){
        items=items.sort((a,b) => {
            if(a.title>b.title) return 1;
                else if(a.title<b.title) return -1;
                else return 0;
        })
        addHtml();
    }
    function sortZToA(){
        items=items.sort((a,b) => {
            if(a.title<b.title) return 1;
                else if(a.title>b.title) return -1;
                else return 0;
        })
        addHtml();
    }
    function getRecipes(){
        $.ajax({
            url:"json/recipe.json",
            success: function(data){
                items=data
                addHtml()
            }
        })
    }
    function addHtml(){
        let html = ""
        for(let i of items){
            html += showRecipe(i)
        }
        $("#recipeItems").html(html)
    }
    function showRecipe(i){
        return `
        <div class="menu-section">
        <h2 class="menu-section-title">${i.title}</h2>
        <div class="menu-item">
          <img src="${i.picture.src}" alt="${i.picture.alt}"/>
          <h3>${i.text}</h3>
          <div class="content">
          <p>${i.steps}</p>
          </div>
        </div>
        `
    }
    return {
        addRecipe, removeRecipe, getRecipes,sortAToZ, sortZToA
    }
}