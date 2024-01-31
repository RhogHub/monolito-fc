import express, { Request, Response } from "express";
import { FindInvoiceFacadeInputDTO } from "../../../modules/invoice/facade/invoice.facade.interface";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {    
    const invoiceFacade = InvoiceFacadeFactory.create();
    try {
        const invoiceDto: FindInvoiceFacadeInputDTO = {
            id: req.params.id,            
        };
        const output = await invoiceFacade.find(invoiceDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
