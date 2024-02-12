import {countCart, arrBookInCart, countBookInCart} from './cart';

const booksCategory = document.querySelectorAll('.books__categories_link');
const booksCard = document.querySelector('.books__cards');
const btnLoadMore = document.querySelector('.btn_loadMore');
const star = `<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#F2C94C"/>
</svg>`;

let startIndex = 0;
let subject = 'Architecture';
let textBtnBook = 'BUY NOW';

let requestURL = `https://www.googleapis.com/books/v1/volumes?key=AIzaSyCD8pbuLqrpZzOGbCfm17GqVL-RX7nNPxU&printType=books&&maxResults=6&langRestrict=en`;

//отправляем запрос 
function sendRequest() {
    return fetch(requestURL + `&q=${subject}&startIndex=${startIndex}`).then(response => {
        return response.json();
    });
}

//отображаем запрос
async function resultRequest() {     
    const data = await sendRequest();    
    const dataItems = data.items;
    drawBooks(dataItems);
    countCart();
}

//снимаем .link_active с категории
function clearActiveCategory() {
    document.querySelector('.books__categories_link.link_active').classList.remove('link_active');
}

//меняем активную актегорию
function toggleBookCategory()  {
    booksCategory.forEach((item) => {
        item.addEventListener('click', (event) => {
            let categoryObj = event.target.closest('.books__categories_link');
            clearActiveCategory();
            categoryObj.classList.add('link_active');

            if(item.classList.contains('link_active')) {
                categoryObj = item.innerText;
            }
            
            booksCard.innerHTML = '';
         
            subject = `${categoryObj}`;
            startIndex = 0;
            resultRequest();
        });
    });
}

//обработчик кнопки LoadMore
function loadMore() {
    btnLoadMore.addEventListener('click', () => {
        startIndex += 6; 
        resultRequest();         
    });
}

//отрисовываем рейтинг звезды
function ratingStars(rating) {
    let result = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            result += star;
        } 
    }
    return result;
}


//проверка localstorage на заполнение
function checkBookInLocalStorage(bookId) {
    let result = false;
    for (let i = 0; i <= arrBookInCart.length; i++) {
        if (bookId === arrBookInCart[i]) {
            result = true;
        }
    }
    return result;
}

//отрисовываем карточки книг
function drawBooks(book) {
    book.forEach(item => {
        let books = `<div class="book_container">
                        <img class="${item.volumeInfo?.imageLinks?.thumbnail ? "book_img" : "book_placeholder"}" src="${item.volumeInfo?.imageLinks?.thumbnail}" alt="Book card"></img>
                        <div class="book_info">
                            <p class="${item.volumeInfo?.authors? "book_author" : "display-none"}">${item.volumeInfo?.authors}</p>
                            <h2 class="book_title">${item.volumeInfo?.title}</h2>
                            <div class="${item.volumeInfo?.averageRating ? "book_rating" : "display-none"}">
                                <div class="${item.volumeInfo?.averageRating ? "book_rating-stars" : "display-none"}">${item.volumeInfo?.averageRating ? ratingStars(item.volumeInfo.averageRating) : 'no rating'}</div>
                                <div class="${item.volumeInfo?.ratingsCount ? "book_rating-review" : "display-none"}">${item.volumeInfo?.ratingsCount} review</div>
                            </div>
                            <div class="book_description">${item.volumeInfo?.description ? item.volumeInfo?.description : 'No description'}</div>
                            <div class="${item.saleInfo?.retailPrice?.amount? "book_price" : "display-none"}">${item.saleInfo?.retailPrice?.amount} ${item.saleInfo?.retailPrice?.currencyCode}</div>
                            <button class="${checkBookInLocalStorage(item.id)? "book_btn book_btn-inTheCart" : "book_btn"}" id="${item.id}">${textBtnBook}</button>
                        </div>
                    </div>`;
    booksCard.innerHTML += books;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    countBookInCart('BookInCart');
    resultRequest();
    loadMore();
    toggleBookCategory(); 
});