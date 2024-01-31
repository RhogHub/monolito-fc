import express, { Request, Response } from "express";
import Address from "../../../modules/@shared/domain/value-object/address.value-object";
import { AddClientFacadeInputDto } from "../../../modules/client-adm/facade/client-adm.facade.interface.dto";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";

export const clientsRoute = express.Router();

clientsRoute.post('/', async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();
    try {
        const clientDto: AddClientFacadeInputDto = {
            //id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new Address (
                req.body.street,
                req.body.number,
                req.body.complement,
                req.body.city,
                req.body.state,
                req.body.zipCode,
            ),
        };
                
        const output = await clientFacade.add(clientDto);     
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
