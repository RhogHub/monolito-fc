import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-Item.entity";
import Invoice from "../../domain/invoice.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const address = new Address(
    "Street 1",
    "123",
    "Complemento 1",
    "City 1",
    "State 1",
    "Zip Code 1",
);

const item1 = new InvoiceItems({
    id: new Id("ItemId 1"),
    name: "Item 1",
    price: 100,
});

const item2 = new InvoiceItems({
    id: new Id("ItemId 2"),
    name: "Item 2",
    price: 200,
});

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "Document Invoice 1",
    address: address,
    items: [item1, item2],    
    createdAt: new Date(),
    updatedAt: new Date(),
});

const MockRepository = () => {
    return {
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        find: jest.fn(),
    };
};

describe("Generate Invoice usecase unit test", () => {
    it("should generate an Invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(invoiceRepository);

        const item1 = {
            id:"ItemId 1",
            name: "Item 1",
            price: 100,
        };

        const item2 = {
            id:"ItemId 2",
            name: "Item 2",
            price: 200,
        };

        const input = {
            name: "Invoice 1",
            document: "Document Invoice 1",
            street: "Street 1",
            number: "123",
            complement: "Complemente 1",
            city: "City 1",
            state: "State 1",
            zipCode: "Zip Code 1",
            items: [item1, item2]                  
        };

        const result = await usecase.execute(input);     

        expect(invoiceRepository.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.street).toBe(invoice.address.street);
        expect(result.number).toBe(invoice.address.number);
        expect(result.complement).toBe(invoice.address.complement);
        expect(result.city).toBe(invoice.address.city);
        expect(result.state).toBe(invoice.address.state);
        expect(result.zipCode).toBe(invoice.address.zipCode);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price); 
        expect(result.total).toBe(300);      
    });

    
});
