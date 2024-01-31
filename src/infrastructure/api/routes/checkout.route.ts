import express, { Request, Response } from "express";
import CheckoutRepository from "../../../modules/checkout/repository/checkout.repository";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import { PlaceOrderInputDto } from "../../../modules/checkout/usecase/place-order/place-order.dto";

export const checkoutRoute = express.Router();

checkoutRoute.post('/', async (req: Request, res: Response) => {
    const repository = new CheckoutRepository();
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const productCatalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();

    const usecase = new PlaceOrderUseCase(
        clientFacade,
        productFacade,
        productCatalogFacade,
        repository,        
        paymentFacade,
        invoiceFacade,
    );

    try {
        const input: PlaceOrderInputDto = {
            clientId: req.body.clientId,
            products: req.body.products,
        };

        const output = await usecase.execute(input);        
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});