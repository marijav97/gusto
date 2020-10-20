$(document).ready(function () {
    let items = productsInCart();
    
    if(!items.length)
        showEmptyCart();
    else
        displayCartData();

});

function displayCartData() {
    let items = productsInCart();

    $.ajax({
        url : "json/food.json",
        success : function(data) {
            let productsForDisplay = [];

            data = data.filter(p => {
                for(let i of items)
                {
                    if(p.id == i.id) {
                        p.quantity = i.quantity;
                        return true;
                    }
                        
                }
                return false;
            });
            generateTable(data)
        }
    });
}

function generateTable(items) {
    let html = `
            <table class="timetable_sub">
				<thead>
					<tr>
						<th>SL No.</th>
						<th>Product</th>
						<th>Product Name</th>
                        <th>Base Price</th>
                        <th>Quantity</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>`;
                
    for(let i of items) {
        html += generateTr(i);
    }

    html +=`    </tbody>
            </table>`;

    $("#content").html(html);

    function generateTr(i) {
       return  `<tr class="rem1">
        <td class="invert">${i.id}</td>
        <td class="invert-image">
            <img src="${i.picture.src}" style='height:100px' alt="${i.picture.alt}" class="img-responsive">
        </td>
        <td class="invert">${i.name}</td>
        <td class="invert">$${i.price}</td>
        <td class="invert">${i.quantity}</td>
        <td class="invert">$${i.price * i.quantity}</td>
        <td class="invert">
            <div class="rem">
                <div class=""><button onclick='removeFromCart(${i.id})' class="btn-custom ">Remove</button> </div>
            </div>
        </td>
    </tr>`
    }
}
function showEmptyCart() {
    $("#content").html("<h1>Your cart is empty!</h1>")
}
function productsInCart() {
    return JSON.parse(localStorage.getItem("items"));
}
function removeFromCart(id) {
    let items = productsInCart();
    let filtered = items.filter(i => i.id != id);

    localStorage.setItem("items", JSON.stringify(filtered));

    displayCartData();
}