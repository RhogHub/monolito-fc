import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-Item.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway;

    constructor(_invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = _invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const address = new Address(
            input.street,
            input.number,
            input.complement,
            input.city,
            input.state,
            input.zipCode, 
        );

        let items = input.items.map((item) => new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            price: item.price,            
        }));

        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: address,
            items: items,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await this._invoiceRepository.generate(invoice);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            street: result.address.street,
            number: result.address.number,
            complement: result.address.complement,
            city: result.address.city,
            state: result.address.state,
            zipCode: result.address.zipCode,
            items: result.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: result.total
            //createdAt: result.createdAt,
            //updatedAt: result.updatedAt,
        };
    }
}