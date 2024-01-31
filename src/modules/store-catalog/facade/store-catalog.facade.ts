import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCaseProps {
    findUseCase: FindProductUsecase;
    findAllUseCase: FindAllProductsUsecase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findUseCase: FindProductUsecase;
    private _findAllUseCase: FindAllProductsUsecase;
    
    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase;
        this._findAllUseCase = props.findAllUseCase;
    }
    
    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        //throw new Error("Method not implemented.");
        return await this._findUseCase.execute(id);        
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        //throw new Error("Method not implemented.");
        return await this._findAllUseCase.execute();
    }

}