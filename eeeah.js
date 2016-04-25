//  easy enhanced-ecommerce analitic harvester

var e = (function () {
		"use strict";

		//application
		var method  = {},
			settings = {},
			defaultSettings = {};

		//scopes
		var	lists = {},
			observed = [],
			promos = [],
			products = [],
			actions = [];

		var	queue = [];

		// init
		method.init		= function (parameters) {

			//if(typeof $ !== 'function')
				//console.log('jQuery required. Object $ is not defined');

			if(typeof dataLayer !== 'object') {
				console.log('GTM dataLayer required. Object dataLayer is not defined');
				return;
			}

			for(var selector in parameters.watch)
				method.watch(parameters.watch[selector]);

			window.addEventListener("beforeunload", function(){	method.deliver();}, false);

			setTimeout( function(){	method.deliver();}, 200);
		};

		// push
		method.push		= function (promoId) {

		};

		//data layer base operations

		//on click at product in lists
		method.products		= function (listId, productId) {



			//product object
			lists[listId].productId;


			queue.push()
		};

		//on add product to cart
		method.add			= function (productId, quantity, parameters) {};

		//on remove product from cart
		method.remove		= function (productId, quantity, parameters) {};

		//on click at promo-banner in promos
		method.promos		= function (promoId) {};

		//
		method.option		= function () {};

		method.addToObserved = function(selector){
			observed.push(selector);
		};

		//watching DOM
		method.watch		= function (selector) {

			var blocks = document.querySelectorAll(selector);
			if(!!blocks)
				for(var i = 0; i < blocks.length; i++){
					var id = blocks[i].getAttribute('data-e-list-id');
					if(!!id) method.onFoundList(id, blocks[i]);

					var id = blocks[i].getAttribute('data-e-detail-id');
					if(!!id) method.onFoundDetail(id, blocks[i]);

				}
		};

		method.onFoundDetail = function(listId, block){
			var list = [];
			var products = block.querySelectorAll('[data-e-product-id]');
			var listId = block.getAttribute('data-e-detail-list-id');
			var status = block.getAttribute('data-e-detail-status');



			if(!!products){
				for (var i = 0; i < products.length; i++)
					if (products[i]) {



						var product = {};
						var id = products[i].getAttribute('data-e-product-id');
						var name = products[i].getAttribute('data-e-product-name');
						if(!!id && !!name) {
							product.id = id;
							product.name = name;
							product.price = '5600.00';
							product.brand = 'Vans';
							product.category = 'Кеды';
							product.variant = 'синий_5600-1000discount_зима2015';
							list.push(product);
						}
					}
			}

			method.addNewDetail(list, listId, status);
			block.addEventListener("DOMSubtreeModified", function (e) {
				alert(e);
			});


		};

		method.addNewDetail 	= function(list, listId, status){
			//lists[listId] = list;
			method.onAddNewDetail(list, listId, status);
		};

		method.onAddNewDetail 	= function(list, listId, status){
			var message = method.prepareDetail(list, listId, status);
			queue.push(message);
		};

		//prepare data for sending ecommerce impressions
		method.prepareDetail 	= function (list, listId, status){

			var data = {};

			data.event = 'productDetail'+'_'+status;

			data.ecommerce = {};

			data.ecommerce.actionField = {'list': listId};

			data.ecommerce.products = list;

			return data;
		};

		method.onFoundList = function(listId, block){

			var list = [];

			var blocks = block.querySelectorAll('[data-e-impression-id]');

			if(!!blocks){
				for (var i = 0; i < blocks.length; i++)
					if (blocks[i]) {
						var impression = {};
						var id = blocks[i].getAttribute('data-e-impression-id');
						var name = blocks[i].getAttribute('data-e-impression-name');
						if(!!id && !!name) {

							impression.id = id;
							impression.name = name;
							impression.price = '5600.00';
							impression.brand = 'Vans';
							impression.category = 'Кеды';
							impression.variant = 'синий_5600-1000discount_зима2015';
							impression.list = listId;
							impression.position= i+1;

							list.push(impression);

						}
					}



			}

			method.addNewList(listId, list);
			block.addEventListener("DOMSubtreeModified", function (e) {
				alert(e);
			});


		};

		method.addNewList 	= function(listId, list){
			lists[listId] = list;
			method.onAddNewlist(list);
		};

		method.onAddNewlist 	= function(list){
				var message = method.prepareImpressions(list);
				queue.push(message);
		};

	/*
		method.ecommerce 	= function(){

		}
	*/

		//prepare data for sending ecommerce impressions
		method.prepareImpressions 	= function (list){

			var data = {};

			data.event = 'productImpression';

			data.ecommerce = {};
			data.ecommerce.impressions = list;

			return data;
		};

		method.list		= function (block) {

			//$(block).find('[data-e-impresson-id]');

		};

		method.deliver		= function(){

			//deliver all object from queue
			for (var i = queue.length - 1; i >= 0; i--){
				dataLayer.push(queue[i]);
				queue.splice(i, 1);
			}



		};

		//launch application
		method.init({ watch: ['[data-e-list-id]','[data-e-detail-id]'] });
		return method;

	}())
