import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    findUseCase: UseCaseInterface;
    generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findUsecase: UseCaseInterface;
    private _generateUsecase: UseCaseInterface;   

    constructor(usecaseProps: UseCaseProps) {
        this._findUsecase = usecaseProps.findUseCase;
        this._generateUsecase = usecaseProps.generateUseCase;
    }

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        //throw new Error("Method not implemented.");
        return await this._findUsecase.execute(input);
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        //throw new Error("Method not implemented.");
       return await this._generateUsecase.execute(input);
    }

}