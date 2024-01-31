import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class PlaceOrderFacadeFactory {
    static create() {
        const clientFacade = ClientAdmFacadeFactory.create();
        const productFacade = ProductAdmFacadeFactory.create();
        const productCatalogFacade = StoreCatalogFacadeFactory.create(); 
        const checkoutRepository = new CheckoutRepository();  
        const paymentFacade = PaymentFacadeFactory.create();     
        const invoiceFacade = InvoiceFacadeFactory.create();     

        const placeOrderUseCase = new PlaceOrderUseCase(
            clientFacade,
            productFacade,
            productCatalogFacade,
            checkoutRepository,   
            paymentFacade,         
            invoiceFacade,            
        );

        const facade = new CheckoutFacade(placeOrderUseCase);
        
        return facade;
    }
}