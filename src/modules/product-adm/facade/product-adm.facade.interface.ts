export interface AddProductFacadeInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    salesPrice?: number;
    stock: number;
}

export interface checkStockFacadeInputDto {
    productId: string;    
}

export interface checkStockFacadeOutputDto {
    productId: string;   
    stock: number;
}

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    
    checkStock(
        input: checkStockFacadeInputDto
    ): Promise<checkStockFacadeOutputDto>;
}