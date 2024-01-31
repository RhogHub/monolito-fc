import { Sequelize } from "sequelize-typescript";
import OrderModel from "./order.model";
import CheckoutRepository from "./checkout.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import Address from "../../@shared/domain/value-object/address.value-object";

describe("checkoutRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { alter: true },
        });

        sequelize.addModels([OrderModel]);
        await sequelize.sync({ alter: true });
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate an Order", async () => {
        const checkoutRepository = new CheckoutRepository();

        const input = new Order({
            id: new Id("1"),            
            client: new Client({
                id: new Id("1"),
                name: "Client 1",
                email: "mail@x.com",                
                address: new Address(
                    "Street 1",
                    "123",
                    "Complement 1",
                    "City 1",
                    "State 1",
                    "Zip Code 1",
                ).toString(),
            }),
            products: [ new Product({
                id: new Id("1"),
                name: "Product 1",
                description: "Description Product 1",
                salesPrice: 100
            })],
            status: "approved", 
            createdAt: new Date(),
            updatedAt: new Date(),           
        });

        await checkoutRepository.addOrder(input);

        const orderDb = await OrderModel.findOne({
            where: { id: "1" }            
        });
        
        expect(orderDb.id).toEqual("1");
        expect(orderDb.client.id).toEqual("1");
        expect(orderDb.client.name).toEqual("Client 1");
        expect(orderDb.client.email).toEqual("mail@x.com");
        expect(orderDb.client.address).toEqual("Street 1, 123, Zip Code 1, City 1");
        expect(orderDb.products[0].id).toEqual("1");
        expect(orderDb.products[0].name).toEqual("Product 1");
        expect(orderDb.products[0].description).toEqual("Description Product 1");
        expect(orderDb.products[0].salesPrice).toEqual(100);
        expect(orderDb.status).toEqual("approved");
    });

});