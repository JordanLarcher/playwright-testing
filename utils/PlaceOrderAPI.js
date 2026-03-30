class PlaceOrderAPI {

    constructor(token, apiContext, orderPayload) {
        this.token = token;
        this.apiContext = apiContext;
        this.orderPayload = orderPayload;
    }


    async createOrder(){
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: this.orderPayload,
                headers:{
                    'Authorization': this.token,
                    'Content-Type': 'application/json'
                }
            }
        );

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        
        return {
            token: this.token,
            orderId: orderId
        };
    }


}

module.exports = { PlaceOrderAPI }