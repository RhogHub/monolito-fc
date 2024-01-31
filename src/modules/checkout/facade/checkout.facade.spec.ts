import { Sequelize } from "sequelize-typescript";
import OrderModel from "../repository/order.model";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import CheckoutFacade from "./checkout.facade";
import { PlaceOrderFacadeInputDto } from "./checkout.facade.interface";

describe("CheckoutFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { alter: true },
        });

        sequelize.addModels([OrderModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate an Order", async () => {        
        const client = {
            id: "1c",
            name: "Client 1",
            email: "client@x.com",
            document: "Document 1",
            address: {
                street: "Street 1",
                number: "123",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",
                zipCode: "Zip Code 1",
            }.toString(),         
        };
        const product = {
            productId: "1p",
            stock: 10,
        };
        const productCatalog = {
            id: "1p",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100,
        };
        const item1 = {
            id: "1p",
            name: "Product 1",
            price: 100,
        };
        const invoice = {
            id: "1",
            name: "Client 1",
            document: "Document 1",
            street: "Street 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "Zip Code 1",
            items: [{ item1 }],            
        };
        const payment = {
            transactionId: "1t",
            orderId: "1o",
            amount: 100,
            status: "approved",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const clientFacadeMock = {
            find: jest.fn().mockReturnValue(client),
            add: jest.fn(),
        };
        const productFacadeMock = {
            addProduct: jest.fn(),
            checkStock: jest.fn().mockReturnValue(product),
        };
        const productCatalogFacadeMock = {
            find: jest.fn().mockReturnValue(productCatalog),
            findAll: jest.fn(),
        };
        const checkoutRepository = new CheckoutRepository();
        const invoiceFacadeMock = {
            find: jest.fn(),
            generate: jest.fn().mockReturnValue(invoice),            
        };
        const paymentFacadeMock = {
            process: jest.fn().mockReturnValue(payment),
        };

        const placeOrderUseCase = new PlaceOrderUseCase(
            clientFacadeMock,
            productFacadeMock,
            productCatalogFacadeMock,
            checkoutRepository,            
            paymentFacadeMock,
            invoiceFacadeMock,
        );

        const checkoutFacade = new CheckoutFacade(placeOrderUseCase);
        
        const input: PlaceOrderFacadeInputDto = {
            clientId: client.id,
            products: [{
                productId: productCatalog.id,
            }],
        };

        const orderDb = await checkoutFacade.placeOrder(input);
        
        const result = await OrderModel.findOne({
            where: { id: orderDb.id }           
        });
       
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.client.id).toEqual("1c");
        expect(result.client.name).toEqual("Client 1");
        expect(result.status).toEqual("approved");        
    });

});