import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoiceFacade test", () => {
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
        // const repository = new InvoiceRepository();
        // const findUsecase = new FindInvoiceUseCase(repository);
        // const facade = new InvoiceFacade({
        //     findUseCase: findUsecase,
        //     generateUseCase: undefined,
        // });

        const facade = InvoiceFacadeFactory.create();

        const item1 = {
            id: "1",
            name: "Item 1",
            price: 100,
        };

        const item2 = {
            id: "2",
            name: "Item 2",
            price: 200,
        };

        const input = await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Document Invoice 1",            
            street: "Street 1",
            number: "123",
            complement: "Complement",
            city: "City 1",
            state: "State 1",
            zipCode: "Zip Code 1",          
            items: [item1, item2],  
            createdAt: new Date(),
            updatedAt: new Date(),         
        });
    
        const result = await facade.find({ id: "1" });

        expect(result).toBeDefined();
        expect(result.id).toEqual(input.id);
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.address.street).toBe(input.street);    
        expect(result.address.number).toBe(input.number);   
        expect(result.address.complement).toBe(input.complement);    
        expect(result.address.city).toBe(input.city);     
        expect(result.address.street).toBe(input.street);    
        expect(result.address.state).toBe(input.state);   
        expect(result.address.street).toBe(input.street);    
        expect(result.address.zipCode).toBe(input.zipCode); 
        expect(result.address.street).toBe(input.street);    
        expect(result.address.number).toBe(input.number);  
        expect(result.items.length).toEqual(2);
        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);
        expect(result.items[1].id).toBe(input.items[1].id);
        expect(result.items[1].name).toBe(input.items[1].name);
        expect(result.items[1].price).toBe(input.items[1].price);
        expect(result.total).toEqual(300);               
    });

    it("should generate an invoice", async () => {
        // const repository = new InvoiceRepository();
        // const generateUsecase = new GenerateInvoiceUseCase(repository);
        // const facade = new InvoiceFacade({
        //     findUseCase: undefined,
        //     generateUseCase: generateUsecase,
        // });

        const facade = InvoiceFacadeFactory.create();

        const item1 = {
            id: "1",
            name: "Item 1",
            price: 100,
        };

        const item2 = {
            id: "2",
            name: "Item 2",
            price: 200,
        };

        const input = await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Document Invoice 1",            
            street: "Street 1",
            number: "123",
            complement: "Complement",
            city: "City 1",
            state: "State 1",
            zipCode: "Zip Code 1",          
            items: [item1, item2],
            tota: 300.00,  
            createdAt: new Date(),
            updatedAt: new Date(),         
        });

        const newInvoice = await facade.generate(input);

        const invoiceDb = await InvoiceModel.findOne({ where: {  id: newInvoice.id  } });
        
        expect(invoiceDb.id).toBeDefined();
        expect(newInvoice.id).toBeDefined();       
        expect(newInvoice.name).toBe(input.name);
        expect(newInvoice.document).toBe(input.document);
        expect(newInvoice.document).toBe(input.document);
        expect(newInvoice.street).toBe(input.street);    
        expect(newInvoice.number).toBe(input.number);   
        expect(newInvoice.complement).toBe(input.complement);    
        expect(newInvoice.city).toBe(input.city);     
        expect(newInvoice.street).toBe(input.street);    
        expect(newInvoice.state).toBe(input.state);   
        expect(newInvoice.street).toBe(input.street);    
        expect(newInvoice.zipCode).toBe(input.zipCode); 
        expect(newInvoice.street).toBe(input.street);    
        expect(newInvoice.number).toBe(input.number);  
        expect(newInvoice.items.length).toEqual(2);
        //expect(newInvoice.items[0].id).toEqual(input.items[0].id);
        expect(newInvoice.items[0].name).toBe(input.items[0].name);
        expect(newInvoice.items[0].price).toBe(input.items[0].price);
        //expect(newInvoice.items[1].id).toBe(input.items[1].id);
        expect(newInvoice.items[1].name).toBe(input.items[1].name);
        expect(newInvoice.items[1].price).toBe(input.items[1].price);
        expect(newInvoice.total).toEqual(300);        
    });
    
});