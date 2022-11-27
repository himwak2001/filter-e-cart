const data = [
    {
        id: 1,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 740,
        cat: "Dress",
    },
    {
        id: 11,
        name: "Invicta Men's Pro Diver 2",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 600,
        cat: "Dress",
    },
    {
        id: 2,
        name: "Timex Men's Expedition Scout ",
        img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
        price: 1000,
        cat: "Sport",
    },
    {
        id: 3,
        name: "Breitling Superocean Heritage",
        img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
        price: 5000,
        cat: "Luxury",
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap ",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 1500,
        cat: "Sport",
    },
    {
        id: 5,
        name: "Garmin Venu Smartwatch ",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 2500,
        cat: "Casual",
    },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoryContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const showProducts = (products) =>{
    productsContainer.innerHTML = products.map(item => 
        `
        <div class="product">
            <img src=${item.img}>
            <span class="productName">${item.name}</span>
            <span class="productPrice">₹ ${item.price}</span>
        </div>
        `
        ).join("");
}

const searchProducts = () =>{
    searchInput.addEventListener('keyup', (e)=>{
        const searchText = e.target.value.toLowerCase();
        if(searchText){
            showProducts(data.filter(item => item.name.toLowerCase().indexOf(searchText) !== -1));
        } else{
            showProducts(data);
        }
    })
}

const setSearchCats = ()=>{
    const catList = data.map(item => item.cat);
    const categories = ["All", ...catList.filter((value, i) =>{
        return catList.indexOf(value) === i;
    })];

    categoryContainer.innerHTML = categories.map(item=>
        `
        <span class = 'cat'>${item}</span>
        `
    ).join("");

    categoryContainer.addEventListener("click", (e)=>{
        const valueCat = e.target.textContent;
        valueCat === "All" ? showProducts(data) : showProducts(data.filter(item =>{
            return item.cat === valueCat;
        }));

    })
}

const showPrice = () =>{
    const priceList = data.map(item => item.price);
    console.log(priceList);
    const minValue = Math.min(...priceList);
    const maxValue = Math.max(...priceList);
    priceRange.min = minValue;
    priceRange.max = maxValue;

    priceValue.textContent = "₹ "+ maxValue;

    priceRange.addEventListener('input', (e)=>{
        priceValue.textContent = "₹ "+ e.target.value;
        showProducts(data.filter(item => item.price <= e.target.value));
        if(e.target.value == minValue){
            showProducts(data);
        }
    })
}

showProducts(data);
searchProducts();
setSearchCats();
showPrice();