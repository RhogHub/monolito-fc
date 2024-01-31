import Address from "../../../@shared/domain/value-object/address.value-object";
import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("Add Client Usecase unit test", () => {
    it("should add a client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUseCase(repository);

        const input = {
            //id: "1",
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

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.address.street);
        expect(result.number).toEqual(input.address.number);
        expect(result.complement).toEqual(input.address.complement);
        expect(result.city).toEqual(input.address.city);
        expect(result.state).toEqual(input.address.state);
        expect(result.zipCode).toEqual(input.address.zipCode);
    });

});