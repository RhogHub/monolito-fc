import { migrator } from '../../test-migrations/config-migrations/migrator';
import { app, sequelize } from '../express';
import request from "supertest";

describe("E2E test for clients", () => {
    beforeEach(async () => {
        await sequelize.sync();            
    });
         
    it("should create a client", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "John",
                email: "john@x.com",
                document: "Document 1",
                street: "Street 1",
                number: "123",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",                    
                zipCode: "Zip Code 1",
            });
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toEqual("John");  
        expect(response.body.email).toEqual("john@x.com");   
        expect(response.body.document).toEqual("Document 1");  
        expect(response.body.street).toEqual("Street 1");
        expect(response.body.number).toEqual("123");          
        expect(response.body.complement).toEqual("Complement 1");    
        expect(response.body.city).toEqual("City 1");  
        expect(response.body.state).toEqual("State 1");
        expect(response.body.zipCode).toEqual("Zip Code 1");
    });
    
});