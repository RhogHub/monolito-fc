import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
//import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import Address from "../../@shared/domain/value-object/address.value-object";

describe("ClientAdmFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    }); 

    it("should create a client", async () => {
        const repository = new ClientRepository();
        const addUsecase = new AddClientUseCase(repository);
        const facade = new ClientAdmFacade({
            addUseCase: addUsecase,
            findUseCase: undefined,
        });

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            document: "Document",
            address: new Address(
                "Street 1",
                "123",
                "Complement 1",
                "City 1",
                "State 1",
                "ZipCode 1",
            ),
        };

        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: "1" } });

        expect(client).toBeDefined();
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.document).toBe(input.document);
        expect(client.street).toBe(input.address.street);  
        expect(client.number).toBe(input.address.number);  
        expect(client.complement).toBe(input.address.complement); 
        expect(client.city).toBe(input.address.city); 
        expect(client.state).toBe(input.address.state); 
        expect(client.zipCode).toBe(input.address.zipCode);       
    });

    it("should find a client", async () => {
        // const repository = new ClientRepository();
        // const addUsecase = new AddClientUseCase(repository);
        // const findUsecase = new FindClientUseCase(repository);
        // const facade = new ClientAdmFacade({
        //     addUsecase: addUsecase,
        //     findUsecase: findUsecase,
        // });

        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            document: "Document",
            address: new Address(
                "Street 1",
                "123",
                "Complement 1",
                "City 1",
                "State 1",
                "ZipCode 1",
            ),
        };

        await facade.add(input);

        const client = await facade.find({ id: "1" });

        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.document).toBe(input.document);
        expect(client.address.street).toBe(input.address.street);  
        expect(client.address.number).toBe(input.address.number);  
        expect(client.address.complement).toBe(input.address.complement); 
        expect(client.address.city).toBe(input.address.city); 
        expect(client.address.state).toBe(input.address.state); 
        expect(client.address.zipCode).toBe(input.address.zipCode); 
    });
    
});