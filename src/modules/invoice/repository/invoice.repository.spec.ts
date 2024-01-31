import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceRepository from "./invoice.repository";
import InvoiceItems from "../domain/invoice-Item.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Invoice from "../domain/invoice.entity";

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find an Invoice", async () => {
        const item1 = {
            id: new Id("1"),
            name: "Item 1",
            price: 100,      
        };

        const item2 = {
            id: new Id("2"),
            name: "Item 2",
            price: 200,      
        };

        const invoice = await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Document Invoice 1",
            street: "Street 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "Zip Code 1",
            items: [item1,item2],
            total: 300.00,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        const invoiceRepository = new InvoiceRepository();       
        
        const result = await invoiceRepository.find(invoice.id);

        expect(result).toBeDefined();
        expect(result.id.id).toEqual(invoice.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.street).toEqual(invoice.street);
        expect(result.address.number).toEqual(invoice.number);
        expect(result.address.complement).toEqual(invoice.complement);
        expect(result.address.city).toEqual(invoice.city);
        expect(result.address.state).toEqual(invoice.state);
        expect(result.address.zipCode).toEqual(invoice.zipCode);
        expect(result.items[0].id.id).toEqual(invoice.items[0].id);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.items[1].id.id).toEqual(invoice.items[1].id);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);
        expect(result.total).toEqual(300);
    });

    it("should generate an Invoice", async () => {
        const address = new Address(
            "Street 1",
            "123",
            "Complement 1",
            "City 1",
            "State 1",
            "Zip Code 1",
        );

        const item1 = new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 100,      
        });

        const item2 = new InvoiceItems({
            id: new Id("2"),
            name: "Item 2",
            price: 200,      
        });

        const invoice = await new Invoice({
            //id: new Id("1"),
            name: "Invoice 1",
            document: "Document Invoice 1",
            address: address,
            items: [item1,item2],
            total: 300.00,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const invoiceRepository = new InvoiceRepository();

        const result = await invoiceRepository.generate(invoice);
        //console.log(result);

        expect(result).toBeDefined();
        expect(result.id.id).toEqual(invoice.id.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.street).toEqual(invoice.address.street);
        expect(result.address.number).toEqual(invoice.address.number);
        expect(result.address.complement).toEqual(invoice.address.complement);
        expect(result.address.city).toEqual(invoice.address.city);
        expect(result.address.state).toEqual(invoice.address.state);
        expect(result.address.zipCode).toEqual(invoice.address.zipCode);
        expect(result.items[0].id.id).toEqual(invoice.items[0].id);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.items[1].id.id).toEqual(invoice.items[1].id);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);
        expect(result.total).toEqual(invoice.total);
    });
    
});