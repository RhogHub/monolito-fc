import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        //throw new Error("Method not implemented.");       
    
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,       
            salesPrice: product.salesPrice,             
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });       
        
    }

    async find(id: string): Promise<Product> {
        //throw new Error("Method not implemented.");

        const product = await ProductModel.findOne({
            where: { id },
        });

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,            
            salesPrice: product.salesPrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });

    }    

}