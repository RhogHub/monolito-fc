import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceItems from "../../domain/invoice-Item.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

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
    createdAt: new Date()    
});

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find a invoice usecase unit test", () => {
    it("should find a invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUseCase(invoiceRepository);

        const input = {
            id: "1",
        }

        const result = await usecase.execute(input);

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(input.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.total).toBe(300);
        expect(result.createdAt).toBe(invoice.createdAt);        
    });
    
});
