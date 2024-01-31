import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, checkStockFacadeInputDto, checkStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCasesProps) {
        this._addUsecase = usecaseProps.addUseCase;
        this._checkStockUsecase = usecaseProps.stockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        // Pelo Dto de addProduct ser igual ao Dto do caso de uso, então pode-se apenas retornar o execute.
        // Caso o Dto do caso de uso for != do Dto da Facade, será necessário converter o Dto para o Dto do caso de uso.
        return this._addUsecase.execute(input);
    }

    checkStock(input: checkStockFacadeInputDto): Promise<checkStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }
}