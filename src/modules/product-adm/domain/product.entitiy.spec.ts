import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "./product.entity";

describe("Product entity unit test", () => {    
    it("should throw error when name is empty", () => {
        const inputProduct = {
            id: new Id("1"),
            name: "",
            description: "Description 1",
            purchasePrice: 0, 
            salesPrice: 100,  
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        expect(() => {
            const product = new Product(inputProduct);
        }).toThrow("Name is required");
    });

    it("should throw error when description is empty", () => {
        const inputProduct = {
            id: new Id("1"),
            name: "Product 1",
            description: "",
            purchasePrice: 0, 
            salesPrice: 100,  
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        expect(() => {
            const product = new Product(inputProduct);
        }).toThrow("Description is required");
    });

    it("should throw error when purchase price is zero", () => {
        const inputProduct = {
            id: new Id("1"),
            name: "Product 1",
            description: "Description Product 1",
            purchasePrice: 0, 
            salesPrice: 100,  
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        expect(() => {
            const product = new Product(inputProduct);
        }).toThrow("Purchase price cannot be zero");
    });

    it("should throw error when sales price is zero", () => {

        const inputProduct = {
            id: new Id("1"),
            name: "Product 1",
            description: "Description Product 1",
            purchasePrice: 100, 
            salesPrice: 0,  
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        expect(() => {
            const product = new Product(inputProduct);
        }).toThrow("Sales price cannot be zero");
    });
});