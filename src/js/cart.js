export {arrBookInCart, countCart, countBookInCart};

let arrBookInCart = [];
let countBooks = document.querySelector('.countBookInCart');

function countBookInCart(key) {
    if(localStorage[key]) {
        countBooks.innerText = JSON.parse(localStorage.getItem('BookInCart')).length;
        arrBookInCart = JSON.parse(localStorage.getItem('BookInCart'));
    } else {
        countBooks.innerText = 0;
        arrBookInCart = [];
    }
}

function countCart() {
    let btnBuy = document.querySelectorAll('.book_btn');
    btnBuy.forEach((item) => {
        item.addEventListener('click', event => {
            btnBuy = event.target.closest('.book_btn');   
            btnBuy.classList.toggle('book_btn-inTheCart');
        
        //добавляем книгу в корзину
        if(btnBuy.classList.contains('book_btn-inTheCart')) {     
            btnBuy.innerHTML = 'IN THE CART';
            arrBookInCart.push(item.id);
            saveBooks();
            countBooks.innerText = arrBookInCart.length;

        //убираем книгу из корзины
        }else{
            btnBuy.innerHTML = 'BUY NOW';
            let index = arrBookInCart.indexOf(item.id);
            arrBookInCart.splice(index, 1);
            saveBooks();
            countBooks.innerText = arrBookInCart.length;
        }
        });
    });
}

function saveBooks() {
    localStorage.setItem('BookInCart', JSON.stringify(arrBookInCart));
}