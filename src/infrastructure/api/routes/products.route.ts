import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../../modules/product-adm/facade/product-adm.facade.interface";

export const productsRoute = express.Router();

productsRoute.post('/', async (req: Request, res: Response) => {
    const productFacade = ProductAdmFacadeFactory.create();
    try {
        const productDto: AddProductFacadeInputDto = {
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            salesPrice: req.body.salesPrice,
            stock: req.body.stock,            
        };
        const output = await productFacade.addProduct(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
