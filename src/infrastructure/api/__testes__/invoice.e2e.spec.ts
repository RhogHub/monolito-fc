import InvoiceModel from '../../../modules/invoice/repository/invoice.model';
import { app, sequelize } from '../express';
import request from "supertest";

describe("E2E test for Invoice", () => {
    beforeEach(async () => {
        await sequelize.sync();            
    });
    
    afterEach(async () => {
        await sequelize.close();
    });
    
    it("should find an Invoice", async () => {
        const item1 = {
            id: "1",
            name: "Item 1",
            description: "Description Item 1",
            price: 100,
            stock: 10,
        };

        const item2 = {
            id: "2",
            name: "Item 2",
            description: "Description Item 2",
            price: 200,
            stock: 20,
        };

        const invoice = {
            id: "i1",
            name: "Client 1",            
            document: "Document 1",
            street: "Street 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "zip Code 1",
            items: [item1,item2],
            total: item1.price + item2.price,
            createdAt: new Date()            
        };
        
        await InvoiceModel.create(invoice);

        const response = await request(app).get(`/invoice/${invoice.id}`);
         
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Client 1");
        expect(response.body.document).toBe("Document 1");
        expect(response.body.items[0].id).toBe("1");
        expect(response.body.items[0].name).toBe("Item 1");        
        expect(response.body.items[0].price).toBe(100);               
        expect(response.body.items[1].id).toBe("2");
        expect(response.body.items[1].name).toBe("Item 2");       
        expect(response.body.items[1].price).toBe(200);            
        expect(response.body.total).toBe(300); 
    });  

});