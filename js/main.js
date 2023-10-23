/*<div class="rooms__slider slider-rooms">
						<div class="slider-rooms__body">
							<!-- Slider main container -->
							<div class="swiper">
							  <!-- Additional required wrapper -->
							  <div class="swiper-wrapper">
							    <!-- Slides -->
							    <div class="slider-rooms-slide">
							    	<div class="slider-rooms__image">
							    		<img src="img/room/slider1.jpg" alt="slider1">
							    	</div>
							    	<a href="#" class="slider-rooms__content _icon-arrow-link">
							    		<div class="slider-rooms__number">01 </div>
							    		<div class="slider-rooms__line"></div>
							    		<div class="slider-rooms__text">Bed Room</div>
										 <div class="slider-rooms__title">Inner Peace</div>
							    	</a>
							    </div>
							    <div class="slider-rooms-slide">
									<div class="slider-rooms__image">
										<img src="img/room/slider1.jpg" alt="slider1">
									</div>
									<a href="#" class="slider-rooms__content _icon-arrow-link">
										<div class="slider-rooms__number">01 </div>
										<div class="slider-rooms__line"></div>
										<div class="slider-rooms__text">Bed Room</div>
										<div class="slider-rooms__title">Inner Peace</div>
									</a>
								</div>
							</div>
						</div>
						<div class="slider-rooms__controls controls-slider-rooms">
							<div class="controls-slider-rooms__dots"></div>
							<div class="controls-slider-rooms__arrows slider-arrows">
								<button type= "button" class="slider-arrow slider-arrow__prev _icon-arrow-down"></button>
								<button type= "button" class="slider-arrow slider-arrow__next _icon-arrow-down"></button>
							</div>

						</div>

					</div> */

	
const swiper1 = new Swiper('.slider-rooms__body', {
	observer: true,
	observer: true,
	 slidesPerView: 'auto',
	 spaceBetween: 30,
	 // Responsive breakpoints
	 watchOverflow:true,
	 navigation: {
		nextEl: '.slider-arrow__next',
		prevEl: '.slider-arrow__prev',
	 },
	 pagination: {
		el: '.controls-slider-rooms__dots',
		clickable:true,
		type: 'bullets',
	 },
	 loop:true,
	 speed:900,
	 loopAdditionalSlides:5,
	 preloadImages:false,
	 parallax:true,

});






	const swiper = new Swiper('.swiper', {
	observer: true,
	observer: true,
		// breakpoints: {
		//   // when window width is >= 320px
		//   320: {
		//     slidesPerView: 2,
		//     spaceBetween: 20
		//   },
		//   // when window width is >= 480px
		//   480: {
		//     slidesPerView: 3,
		//     spaceBetween: 30
		//   },
		//   // when window width is >= 640px
		//   640: {
		//     slidesPerView: 4,
		//     spaceBetween: 40
		//   }
		// },
		slidesPerView: 1,
		spaceBetween: 30,
		// Responsive breakpoints

		watchOverflow:true,
		navigation: {
			nextEl: '.slider-arrow__next',
			prevEl: '.slider-arrow__prev',
		},
		pagination: {
			el: '.controls-slider-main__dots',
			clickable:true,
			type: 'bullets',
		},
		loop:true,
		speed:900,
		loopAdditionalSlides:5,
		preloadImages:false,
		parallax:true,

	});

window.onload = function(){

	// if (document.querySelector('.slider-main__body')) {

	// }
	document.addEventListener('click',documentActions);

	function documentActions(e) {
		// console.log(e.target)
		if (e.target.classList.contains('search-form__icon')) {
			e.preventDefault();
			document.querySelector('.search-form').classList.toggle('_active');
		}else if (!e.target.closest('.search-form')&& document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}
		/*Spollers*/
/*		if (window.innerWidth < 768) {
			if(e.target.classList.contains('menu__arrow')){//'[data-spoller]'
				e.preventDefault();
				console.log(e.target)
				e.target.classList.toggle('_active');
					document.querySelector('.menu__list_sub').classList.toggle('_hidden')
					document.querySelector('.menu__list_sub').hidden = false;
					// document.querySelector('.menu__list_sub').classList.toggle('_active')
			}
			if (document.querySelector('.menu__list_sub').classList.contains('_hidden')) {
					document.querySelector('.menu__list_sub').hidden = true;
			}
		}*/
		/*hover*/
			if (window.innerWidth > 768) {
				if(e.target.classList.contains('menu__arrow')){
					e.preventDefault();
					e.target.closest('.menu__item').classList.toggle('_hover')
					// e.target.closest('.menu__arrow').classList.toggle('show')
				}else if (!e.target.closest('.menu__item')&& document.querySelector('.menu__item._hover')) {
						document.querySelector('.menu__item').classList.remove('_hover');
				}
		}
		if(e.target.classList.contains('products__more')){
			getProducts(e.target);
			e.preventDefault();
		}
		if(e.target.classList.contains('action-product__button')){
			let productId = e.target.closest('.item-product').dataset.pid;
	
			addToCard(e.target,productId);
			e.preventDefault();
		}
	}
	function addToCard(productButton,productId) {
		if (!productButton.classList.contains('_hold')) {
			productButton.classList.add('_hold');
			productButton.classList.add('_fly');
			const cart =  document.querySelector('.actions-header__item_cart');
			const product =  document.querySelector(`[data-pid = "${productId}" ]`);

			const productImage =  product.querySelector('.item-product__image img');

			const productImageFly = productImage.cloneNode(true);

			const productImageFlyWidth = productImage.offsetWidth;
			const productImageFlyHeight = productImage.offsetHeight;
			const productImageFlyTop = productImage.getBoundingClientRect().top;
			const productImageFlyLeft = productImage.getBoundingClientRect().left;

			productImageFly.setAttribute('class' , '_flyImage _ibg');
			productImageFly.style.cssText = ` 
				left: ${productImageFlyLeft}px;
				width: ${productImageFlyWidth}px;
				top: ${productImageFlyTop}px;
				height: ${productImageFlyHeight}px;
			`
			document.body.append(productImageFly);
			const cartFlyLeft = cart.getBoundingClientRect().left;
			const cartFlyTop = cart.getBoundingClientRect().top;
			productImageFly.style.cssText = ` 
				left: ${cartFlyLeft}px;
				top: ${cartFlyTop}px;
				opacity :0px;
				height :0px;
				width :0px;
			`;
			productImageFly.addEventListener('transitionend',()=>{
				if (productButton.classList.contains('_fly')) {
					productImageFly.remove();
					productButton.classList.remove('_fly');
					updateCard(productButton,productId);
				}
			})
		}
	}
	function updateCard(productButton,productId,productAdd = true) {
		const cart = document.querySelector('.actions-header__item_cart');
		const cartQuantity = cart.querySelector('span')  ;
		if (productAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++ cartQuantity.innerHTML;
			}else{
				cart.insertAdjacentHTML('beforeend',`<span>1</span>`);
			}
		}

	}

	async function getProducts(button){
		if(!button.classList.contains('_hold')){

			button.classList.add('_hold');
			let file = 'json/products.json';
			let response = await fetch(file,{
				method: "GET"
			});
			if (response.ok){
				let result = await response.json();
				loadProducts(result);
				button.classList.remove('_hold');
				button.remove();
			}

		}

	}
	function loadProducts(data){
		const productsItems = document.querySelector('.products__items');
		data.products.forEach( function(item, index) {
			const productId  = item.id;
			const productUrl  = item.url;
			const productTitle  = item.title;
			const productText  = item.text;
			const productLabels  = item.labels;
			const productImage  = item.image;
			const productPrice  = item.price;
			const productOldPrice  = item.priceOld;
			const productShareUrl  = item.shareUrl;
			const productLikeUrl  = item.likeUrl;
			let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
						let productTemplateEnd = `</article>`;

						let productTemplateLabels = '';
						if (productLabels) {
							let productTemplateLabelsStart = `<div class="item-product__labels">`;
							let productTemplateLabelsEnd = `</div>`;
							let productTemplateLabelsContent = '';

							productLabels.forEach(labelItem => {
								productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
							});

							productTemplateLabels += productTemplateLabelsStart;
							productTemplateLabels += productTemplateLabelsContent;
							productTemplateLabels += productTemplateLabelsEnd;
						}

						let productTemplateImage = `
					<a href="${productUrl}" class="item-product__image _ibg">
						<img src="img/products/${productImage}" alt="${productTitle}">
					</a>
				`;

						let productTemplateBodyStart = `<div class="item-product__body">`;
						let productTemplateBodyEnd = `</div>`;

						let productTemplateContent = `
					<div class="item-product__content">
						<h3 class="item-product__title">${productTitle}</h3>
						<div class="item-product__text">${productText}</div>
					</div>
				`;

						let productTemplatePrices = '';
						let productTemplatePricesStart = `<div class="item-product__prices">`;
						let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
						let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
						let productTemplatePricesEnd = `</div>`;

						productTemplatePrices = productTemplatePricesStart;
						productTemplatePrices += productTemplatePricesCurrent;
						if (productOldPrice) {
							productTemplatePrices += productTemplatePricesOld;
						}
						productTemplatePrices += productTemplatePricesEnd;

						let productTemplateActions = `
					<div class="item-product__actions actions-product">
						<div class="actions-product__body">
							<a href="" class="actions-product__button btn btn_white">Add to cart</a>
							<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
							<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
						</div>
					</div>
				`;

						let productTemplateBody = '';
						productTemplateBody += productTemplateBodyStart;
						productTemplateBody += productTemplateContent;
						productTemplateBody += productTemplatePrices;
						productTemplateBody += productTemplateActions;
						productTemplateBody += productTemplateBodyEnd;

						let productTemplate = '';
						productTemplate += productTemplateStart;
						productTemplate += productTemplateLabels;
						productTemplate += productTemplateImage;
						productTemplate += productTemplateBody;
						productTemplate += productTemplateEnd;
						productsItems.insertAdjacentHTML('beforeend',productTemplate);
		});
	}



window.isMobileOrTablet = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

if(isMobileOrTablet()) {
   console.log('Вы зашли с мобильного устройства');
} else {
	console.log('Вы с desktop');
}
if (document.documentElement.clientWidth <767.98) {
	const dataSpollerButtons = document.querySelectorAll('[data-spoller_button]');
	const dataSpollersMenu = document.querySelectorAll('[data-spollers_menu]');

	function hideMenuSpoller(){
		let dataSpollerMenuArr  = [];
		let dataSpollerMenuHeight = [];
		if (dataSpollersMenu.length > 0) {
			for (let i = 0; i < dataSpollersMenu.length; i++) {
				

				const dataSpollerMenu = dataSpollersMenu[i];
				dataSpollerMenuHeight[i] = dataSpollersMenu[i].clientHeight + 'px';
				dataSpollerMenuArr[i] = dataSpollersMenu[i];
				let height = dataSpollerMenu.clientHeight + 'px';
				let padding = window.getComputedStyle(dataSpollerMenu).padding;

				dataSpollerMenu.style.height = '0px';
				dataSpollerMenu.style.paddingTop = '0px';
				dataSpollerMenu.style.overflow = 'hidden';
				dataSpollerMenu.style.paddingBottom = '0px';
				dataSpollerMenu.style.transition = 'all.23s ease';
				const dataSpollerButton = dataSpollerButtons[i]; 
			

				dataSpollerButton.addEventListener('click',function(event,index){
						if (!dataSpollerMenu.classList.contains('_show')) {
							dataSpollerMenu.classList.add('_show');
							setTimeout(function(){
							    dataSpollerMenu.style.height = dataSpollerMenuHeight[i];

							}, 0);
						}else {
				    		dataSpollerMenu.style.paddingTop = '0px';
				    		dataSpollerMenu.style.paddingBottom  = '0px';
				        dataSpollerMenu.style.height = '0px';
				        dataSpollerMenu.addEventListener('transitionend', 
				            function () {
				                dataSpollerMenu.classList.remove('_show');
				            }, {
				                once: true
				        });
						}	
				})
			}


		}
	}
	hideMenuSpoller()
}
// настройки
let options = {
    root: document.querySelector('.scroll-list'),
    rootMargin: '5px',
    threshold: 0.5
}

/*Header*/
// функция обратного вызова
let callback = function(entries, observer){
    console.log(entries)
    console.log(observer.rootMargin)
    if (entries[0].isIntersecting) { //проверка на прокручивание вниз header
    		headerElement.classList.remove('_scroll')
    }else{
    		headerElement.classList.add('_scroll')
    }
}

const headerElement = document.querySelector('.header');
const headerObserver = new  IntersectionObserver(callback, options)

headerObserver.observe(headerElement)





if (window.innerWidth <600) {
	const toggleContent = document.querySelector('[data-spollers]');
	toggleContent.style.height = 'auto';
	let height = toggleContent.clientHeight + 'px';
	let padding = window.getComputedStyle(toggleContent).padding;
	// console.log(padding);
	// toggleContent.hidden = true;
	toggleContent.style.height = '0px';
	toggleContent.style.paddingTop = '0px';
	toggleContent.style.paddingBottom = '0px';
	toggleContent.style.transition = 'all.23s ease';


	document.querySelector('[data-spoller]').addEventListener('click', function (event) {
	        event.preventDefault();

	        if (!toggleContent.classList.contains('_show')) {

	            toggleContent.classList.add('_show');

	            document.querySelector('[data-spoller]').style.transform = 'rotate(180deg)';
	                          
                
	            setTimeout(function () {

	                toggleContent.style.height = height;
	                toggleContent.style.paddingTop = padding;

	                toggleContent.style.paddingBottom  = padding;
	            }, 0);
	        } else {
	        		toggleContent.style.paddingTop = '0px';
	        		toggleContent.style.paddingBottom  = '0px';
	        		// toggleContent.style.paddingTop = '0px';
	            toggleContent.style.height = '0px';
	            document.querySelector('[data-spoller]').style.transform = 'rotate(0deg)';
	            toggleContent.addEventListener('transitionend', 
	                function () {
	                    toggleContent.classList.remove('_show');
	                }, {
	                    once: true
	            });
	        }
	    });
}








	const burger = document.querySelector('.header__burger');  
	const menu__list = document.querySelector('.header__menu ');
	const menu__link = document.querySelectorAll('.menu__link');
	
	burger.onclick = function(){
	         menu__list.classList.toggle('_active');
	        menu__link.forEach( function(element, index) {
	           element.classList.toggle('_active');
	        });
	        burger.classList.toggle('_active');
	}

}




