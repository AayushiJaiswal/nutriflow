let index = 0;
        const totalItems = 7;
        const itemsToShow = 3;
        const carousel = document.getElementById("carousel");
        
        function slideCarousel() {
            index += itemsToShow;
            if (index >= totalItems) {
                index = 0;
            }
            let translateValue = -index * (100 / itemsToShow) + "%";
            carousel.style.transform = "translateX(" + translateValue + ")";
        }
        setInterval(slideCarousel, 3000);

        document.addEventListener("DOMContentLoaded", function () {
            var swiper = new Swiper(".mySwiper", {
                slidesPerView: "auto",
                spaceBetween: 20,
                loop: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                }
            });
        });
        
        // Show Supplements Section when clicked
function showSupplements() {
    document.getElementById("supplements-section").classList.remove("hidden");
}

        