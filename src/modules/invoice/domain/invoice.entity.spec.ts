import Address from "../../@shared/domain/value-object/address.value-object";
import Invoice from "./invoice.entity";

describe("Entity Invoice unit test", () => {    
    it("should throw error when Invoice has less than one item", async () => {
        expect(() => {
            new Invoice({
                name: "Invoice 1",
                document: "Document Invoice 1",
                address: new Address(
                    "Street 1",
                    "123",
                    "Complement 1",
                    "City 1",
                    "State 1",
                    "Zip Code 1",
                ),
                items: []                
            });
        }).toThrow("Has to be at least one item");
    });
    
});