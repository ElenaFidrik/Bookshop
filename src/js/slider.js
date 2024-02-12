const slides = document.querySelectorAll('.img');
const dots = document.querySelectorAll('.dot');
const intervalSlider = 5000;
let slideIndex = 0;

function sliderAuto() {
    setInterval(function() {
        slides[slideIndex].classList.remove('img_active');
        dots[slideIndex].classList.remove('dot_active');
    
        slideIndex++;

        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
    
        slides[slideIndex].classList.add('img_active');
        dots[slideIndex].classList.add('dot_active');
    }, intervalSlider);
        
    showSlide(slideIndex);
}

function showSlide() {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slides[slideIndex].classList.remove('img_active');
            dots[slideIndex].classList.remove('dot_active');
                
            slideIndex = index;
                
            slides[slideIndex].classList.add('img_active');
            dots[slideIndex].classList.add('dot_active');
        });
    });
}  

sliderAuto();  