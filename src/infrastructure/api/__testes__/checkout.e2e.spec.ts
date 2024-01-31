import { app, sequelize } from '../express';
import request from "supertest";
import ProductModel from '../../../modules/product-adm/repository/product.model';
import FindProductUsecase from '../../../modules/store-catalog/usecase/find-product/find-product.usecase';
import { migrator } from "../../test-migrations/config-migrations/migrator";
import { FindProductInputDto } from '../../../modules/store-catalog/usecase/find-product/find-product.dto';
import { AddClientFacadeInputDto } from '../../../modules/client-adm/facade/client-adm.facade.interface.dto';
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/client-adm.facade.factory';
import Address from '../../../modules/@shared/domain/value-object/address.value-object';

describe("E2E test for checkout", () => { 
    beforeEach(async () => {
        await sequelize.sync();
    });
    beforeEach(async () => {         
        const migration = migrator(sequelize);
        await migration.up();          
    });
        
    it("should create a checkout process", async () => {
        const product = ProductModel.create({
            id: "1p",
            name: "Product 1",
            description: "Description Product 1",
            purchasePrice: 50, 
            salesPrice: 100,            
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),          
        });
        
        const MockRepository = () => {
            return {
                findAll: jest.fn(),
                find: jest.fn().mockReturnValue(Promise.resolve(product)),
            };
        };

        const client = {
            "name": "Client 1",
            "email": "client@example.com",
            "document": "Document 1",
            "street": "Street 1",
            "number": "123",
            "complement": "Complement 1",
            "city": "City 1",
            "state": "State 1",
            "zipCode": "ZipCode 1",           
            "createdAt": new Date(),
            "updatedAt": new Date(),
        };  
         
        const clientFacade = ClientAdmFacadeFactory.create();
    
        const clientDto: AddClientFacadeInputDto = {
            //id: req.body.id,
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address (
                client.street,
                client.number,
                client.complement,
                client.city,
                client.state,
                client.zipCode,
            ),
        };
                
        const output = await clientFacade.add(clientDto); 

        const productRepository = MockRepository();
        const usecase = new FindProductUsecase(productRepository);
        const input: FindProductInputDto = {
            id: "1p"
        };
        await usecase.execute(input);
        
        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: output.id,
                products: [{ productId: input.id }],
            });
        
        expect(response.status).toEqual(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.total).toEqual(100);
        expect(response.body.status).toEqual("approved"); 
    });         

});