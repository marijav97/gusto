window.onload=function(){
    showSpecials();
    slideShow();
    prikaziVrste();
    showAll();
    document.getElementById("sortAZ").addEventListener("click",sortAToZ);
    document.getElementById("sortZA").addEventListener("click",sortZToA);
    document.getElementById("priceHigh").addEventListener("click",sortFromHighest);
    document.getElementById("priceLow").addEventListener("click",sortFromLowest);
    document.getElementById("search").addEventListener("blur", filtrirajPretraga);
    $.ajax({
        url : "json/food.json",
        method : "GET",
        type : "json",
        success : function(data) {
            showItems(data);
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}
function showSpecials(){
    $.ajax({
      url:"json/specials.json",
      method:"get",
      dataType: "json",
      success: function(specials){
        let html="";
        for(spec of specials){
          html+= `
          <div class="col-xs-12 col-sm-4">
          <div class="features-item">
            <h3>${spec.name}</h3>
            <img src="${spec.picture.src}" class="img-responsive" alt="${spec.picture.alt}">
            <p>${spec.description}</p> 
            </div></div>`;
        }
        document.querySelector("#specItem").innerHTML=html;
      },
      error: function(xhr,error, status){
        console.log("Greska!");
      }
    });
  }
function slideShow(){
    var trenutna= $('#slider .active');
    var sledeca=trenutna.next().length ? trenutna.next() : trenutna.parent().children(':first');
    trenutna.removeClass('active');
    sledeca.addClass('active');
    setTimeout(slideShow, 3000);
}
function prikaziVrste() {
    $.ajax({
        url : "json/categories.json",
        method : "GET",
        type : "json",
        success : function(marke) {
            let select = "<select id='marke'><option value='0'>Show</option>";
            for(let m of marke) {
                select += `<option value='${m.id}'>${m.name}</option>`;
            }
            select += "</select>";

            document.querySelector("#categ").innerHTML = select;

            document.querySelector("#marke").addEventListener("change", function() {
                Number(this.value) ? filtriraj(this.value) : showAll();
            });
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}
function sortAToZ(e){
    $.ajax({
        url: "json/food.json",
        method:"get",
        dataType: "json",
        success: function(data){
            data.sort(function(a,b){
                if(a.name>b.name) return 1;
                else if(a.name<b.name) return -1;
                else return 0;
            });
            showItems(data);
        }
    })
}
function sortZToA(e){
    $.ajax({
        url: "json/food.json",
        method:"get",
        dataType: "json",
        success: function(data){
            data.sort(function(a,b){
                if(a.name<b.name) return 1;
                else if(a.name>b.name) return -1;
                else return 0;
            });
            showItems(data);
        }
    })
    
}
function sortFromHighest(e){
    $.ajax({
        url: "json/food.json",
        method:"get",
        dataType: "json",
        success: function(data){
            data.sort(function(a,b){
                if(a.price==b.price) 
                    return;
                return a.price>b.price ? -1 : 1;
            });
            
            showItems(data);
        }
    })
}
function sortFromLowest(e){
    $.ajax({
        url: "json/food.json",
        method:"get",
        dataType: "json",
        success: function(data){
            data.sort(function(a,b){
                if(a.price==b.price) 
                    return;
                return a.price<b.price ? -1 : 1;
            });
            
            showItems(data);
        }
    })
}
function filtriraj(catId) {
    $.ajax({
        url : "json/food.json",
        method : "GET",
        type : "json",
        success : function(data) {
            data = data.filter(p => p.category.id == catId);
            showItems(data);
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}
function filtrirajPretraga() {
    const unos = this.value;
    $.ajax({
      url: 'json/food.json',
      method: 'GET',
      dataType: 'json',
      success: function (element) {
        const filtriraniPostovi = element.filter(el => {
          if (el.name.toLowerCase().indexOf(unos.toLowerCase()) !== -1) {
            return true;
          }
          if (el.description.toLowerCase().indexOf(unos.toLowerCase()) !== -1) {
            return true;
          }
        });
        showItems(filtriraniPostovi);
      },
      error: function (err) {
        console.error(err);
      }
    });
  }
function showAll() {
    $.ajax({
        url : "json/food.json",
        method : "GET",
        type : "json",
        success : function(data) {
            showItems(data);
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}

function showItems(products) {
        let html = "";

        for(let p of products) {

            html += 
            `
            <div class="col-xs-12 col-sm-4 product">
            <h3>${p.name} - $${p.price}</h3>
            <img src="${p.picture.src}" alt="${p.picture.alt}" class="img-responsive"/>
            <p> ${p.description} </p>
            <button class="btn-custom add-to-cart" data-id=${p.id}>ADD TO CART</button>
            </div>`;
 
        }
        document.querySelector("#items").innerHTML = html;
        bindCartEvents();
}
function bindCartEvents() {
    $(".add-to-cart").click(addToCart);
}
function productsInCart() {
    return JSON.parse(localStorage.getItem("items"));
}
function addToCart() {
    let id = $(this).data("id");

    var items = productsInCart();

    if(items) {
        if(productIsAlreadyInCart()) {
            updateQuantity();
        } else {
            addToLocalStorage()
        }
    } else {
        addFirstItemToLocalStorage();
    }

    console.log("Cart successfully updated!");

    function productIsAlreadyInCart() {
        return items.filter(i => i.id == id).length;
    }

    function addToLocalStorage() {
        let items = productsInCart();
        items.push({
            id : id,
            quantity : 1
        });
        localStorage.setItem("items", JSON.stringify(items));
    }

    function updateQuantity() {
        let items = productsInCart();
        for(let i in items)
        {
            if(items[i].id == id) {
                items[i].quantity++;
                break;
            }      
        }

        localStorage.setItem("items", JSON.stringify(items));
    }

    function addFirstItemToLocalStorage() {
        let items= [];
        items[0] = {
            id : id,
            quantity : 1
        };
        localStorage.setItem("items", JSON.stringify(items));
    }
}
function clearCart() {
    localStorage.removeItem("items");
}

