let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let listCard2 = document.querySelector(".listCard2");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

//เมื่อคลิกที่ openShopping, จะเพิ่มคลาส active ให้กับ body เพื่อแสดงตะกร้าสินค้า.
openShopping.addEventListener("click", () => {
    body.classList.add("active");
});
//เมื่อคลิกที่ closeShopping, คลาส active จะถูกลบออกจาก body เพื่อซ่อนตะกร้าสินค้า.
closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "Korean Noodles",
    image: "1.PNG",
    price: 120,
  },
  {
    id: 2,
    name: "BBQ Korean Chicken",
    image: "2.PNG",
    price: 189,
  },
  {
    id: 3,
    name: "Tokbokki",
    image: "3.PNG",
    price: 149,
  },
  {
    id: 4,
    name: "kimchi",
    image: "4.PNG",
    price: 89,
  },
  {
    id: 5,
    name: "Korean BBQ Burger",
    image: "5.PNG",
    price: 110,
  },
  {
    id: 6,
    name: "gochugaru",
    image: "6.PNG",
    price: 222,
  },
  {
    id: 7,
    name: "Kimchi soup",
    image: "7.PNG",
    price: 145,
  },
  {
    id: 8,
    name: "Bibimbap",
    image: "8.PNG",
    price: 179,
  },
  {
    id: 9,
    name: "Bossam",
    image: "9.PNG",
    price: 200,
  },
  {
    id: 10,
    name: "Samgyeopsal",
    image: "10.PNG",
    price: 299,
  },
];
let listCards = [];

//มันจะสร้าง HTML elements สำหรับแต่ละสินค้าและแสดงผลลัพธ์ในหน้าเว็บ โดยใช้ forEach loop สำหรับทุกสินค้าใน array products
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card <i class="fas fa-shopping-cart"></i></button>`; // เพิ่มไอคอนรถเข็นหลังจากปุ่ม "Add To Card"
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = {...products[key], quantity: 1 }; // ถ้าสินค้ายังไม่ได้ถูกเพิ่ม ให้เพิ่มสินค้านั้นและกำหนด quantity เป็น 1
    } else {
        listCards[key].quantity += 1; // ถ้าสินค้าได้ถูกเพิ่มแล้ว ให้เพิ่ม quantity
    }
    reloadCard(); // โหลดการ์ดสินค้าใหม่เพื่ออัปเดต UI
}

function reloadCard() {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            let totalItemPrice = value.price * value.quantity; // คำนวณราคารวมสำหรับแต่ละสินค้า
            totalPrice += totalItemPrice; // อัปเดตราคารวมทั้งหมด
            count += value.quantity; // อัปเดตจำนวนสินค้าทั้งหมด

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${totalItemPrice.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString(); // อัปเดตราคารวมใน UI
    quantity.innerText = count; // อัปเดตจำนวนสินค้าใน UI
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key]; //// ลบสินค้าออกถ้าจำนวนเป็น 0
    } else {
        listCards[key].quantity = quantity; //// อัปเดตจำนวนสินค้า
        listCards[key].price = quantity * products[key].price; //เป็นคำนวณนี้เป็นการอัปเดตราคาของสินค้าในตะกร้า
    }
    reloadCard();
}

function clearCart() {
    listCards = []; // เคลียร์รายการสินค้าทั้งหมดในตะกร้า
    reloadCard(); // โหลดการ์ดสินค้าใหม่เพื่ออัปเดต UI
}

function reloadCard2() {
    const listCard2 = document.getElementById("listCard2"); // อ้างอิงถึง element ที่มี ID เป็น "listCard2"

    if (listCard2) {
        listCard2.innerHTML = ""; // เคลียร์เนื้อหาที่มีอยู่ใน listCard2 ก่อนที่จะเพิ่มข้อมูลใหม่

        let count = 0;
        let totalPrice = 0;
        listCards.forEach((value, key) => {
            if (value != null) {
                let totalItemPrice = value.price * value.quantity; // คำนวณราคารวมสำหรับแต่ละสินค้า
                totalPrice += totalItemPrice; // อัปเดตราคารวมทั้งหมด
                count += value.quantity; // อัปเดตจำนวนสินค้าทั้งหมด

                let newDiv = document.createElement("li");
                newDiv.innerHTML = `
                    <div><img src="image/${value.image}"/></div>
                    <div>${value.name}</div>
                    <div>${totalItemPrice.toLocaleString()}</div>
                    `;
                listCard2.appendChild(newDiv); // เพิ่ม element ลงใน listCard2
            }
        });

        total.innerText = totalPrice.toLocaleString(); // อัปเดตราคารวมใน UI
        quantity.innerText = count; // อัปเดตจำนวนสินค้าใน UI
    } else {
        console.error("Element with ID 'listCard2' not found or is null.");
    }
}