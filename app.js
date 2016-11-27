(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ShoppingListController', ShoppingListController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingCartService',ShoppingCartService);



ShoppingListController.$inject = ['ShoppingCartService'];
function ShoppingListController(ShoppingCartService) {
  var list = this;
  list.itemsToBuy = ShoppingCartService.getItemsToBuy();

  list.itemBought = function (index) {
      ShoppingCartService.itemBought(index);
      if (list.itemsToBuy.length == 0)
      	list.Message = "Everything is Bought!"
    };
  };
AlreadyBoughtController.$inject = ['ShoppingCartService'];
function AlreadyBoughtController(ShoppingCartService) {
  var boughtList = this;
  boughtList.itemsBought = ShoppingCartService.getItemsBought();
  boughtList.showMessage = ShoppingCartService.getMessage();
  if (boughtList.itemsBought.length > 0){
  	boughtList.showMessage = false;
  	console.log("lala");
  };
}



// If not specified, maxItems assumed unlimited
function ShoppingCartService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
  	 {
  	 	name:"Chips",
     	quantity: 4
     },
     {
     	name:"Chips1",
    	quantity: 4},
     {name:"Chips2",
     quantity: 4},
     {name:"Chips3",
     quantity: 4},
     {name:"Chips4",
     quantity: 4},
  ];
  var itemsBought = [];
  var showMessage = true;
  service.itemBought = function (index) {
  	itemsBought.push(itemsToBuy[index]);
  	showMessage = false;
  	itemsToBuy.splice(index,1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  service.getItemsBought = function () {
  	return itemsBought;
  }
  service.getMessage = function(){
  	return showMessage;
  }
}

})();