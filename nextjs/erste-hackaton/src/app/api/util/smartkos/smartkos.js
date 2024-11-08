import CatProdReader from "@/app/api/util/modules/categoryprod";

class Smartkos {
    constructor(userPref, budget, shop, shopProds, userShopHistory) {
        this.userPref = userPref;
        this.budget = budget;
        this.shop = shop;
        this.shopProds = shopProds;
        this.userHistory = userShopHistory;
        this.userProducts = [];
        this.propousedProducts = [];
    }

    feed(userProducts){
        this.userProducts = userProducts;
    }

    propouse(){


        return this.propousedProducts;
    }
}

export default Smartkos;