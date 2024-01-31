import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from "./find-all-products.usecase";

const product1 = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description Product 1",
    salesPrice: 100,
});

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Description Product 2",
    salesPrice: 150,
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    };
};

describe("Find all products usecase unit test", () => {
    it("should find all products", async () => {
        const productRepository = MockRepository();
        const usecase = new FindAllProductsUsecase(productRepository);

        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe("1");
        expect(result.products[0].name).toBe("Product 1");
        expect(result.products[0].description).toBe("Description Product 1");
        expect(result.products[0].salesPrice).toBe(100);
        expect(result.products[1].id).toBe("2");
        expect(result.products[1].name).toBe("Product 2");
        expect(result.products[1].description).toBe("Description Product 2");
        expect(result.products[1].salesPrice).toBe(150);
    });
    
});