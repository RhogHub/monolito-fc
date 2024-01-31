import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, AddClientFacadeOutputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface.dto";

export interface UseCaseProps {
    addUseCase: UseCaseInterface;
    findUseCase: UseCaseInterface;    
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {    
    private _addUsecase: UseCaseInterface;
    private _findUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._addUsecase = usecaseProps.addUseCase;
        this._findUsecase = usecaseProps.findUseCase;
    }
    
    async add(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {
        return await this._addUsecase.execute(input);
    }
    
    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUsecase.execute(input);
    }

}