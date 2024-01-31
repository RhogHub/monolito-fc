import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-Item.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<Invoice> {
        //throw new Error("Method not implemented.");

        const invoiceDb = await InvoiceModel.findOne({ where: { id } });

        if(!invoiceDb) {
            throw new Error("Invoice not found.");
        }

        const address = new Address(
            invoiceDb.street,
            invoiceDb.number,
            invoiceDb.complement,
            invoiceDb.city,
            invoiceDb.state,
            invoiceDb.zipCode,
        );

        return new Invoice({
            id: new Id(invoiceDb.id),
            name: invoiceDb.name,
            document: invoiceDb.document,
            address: address,
            items: invoiceDb.items.map((item) => new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            })),            
            total: invoiceDb.total,
            createdAt: invoiceDb.createdAt,
            updatedAt: invoiceDb.updatedAt,
        });

    }
    
    async generate(invoice: Invoice): Promise<Invoice> {
        
        const newInvoice = await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => new InvoiceItems({
                id: new Id(item.id.id),
                name: item.name,
                price: item.price,
            })),     
            total: invoice.total,       
            createdAt: invoice.createdAt            
        });

        return new Invoice({
            id: new Id(newInvoice.id),
            name: newInvoice.name,
            document: newInvoice.document,
            address: new Address(
                newInvoice.street,
                newInvoice.number,
                newInvoice.complement,
                newInvoice.city,
                newInvoice.state,
                newInvoice.zipCode,
            ),            
            items: newInvoice.items.map((item) => 
                new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
                })
            ),
            total: newInvoice.total,
            createdAt: newInvoice.createdAt            
        });

    }

}