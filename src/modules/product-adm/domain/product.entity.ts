import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: ProductId;
    name: string;
    description: string;
    purchasePrice: number;  
    salesPrice: number;  
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export class ProductId extends Id {
    constructor(id: string){
        super(id);
    }
}

export default class Product extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _description: string;
    private _purchasePrice: number //preço que o produto foi comprado    
    private _salesPrice: number;
    private _stock: number;

    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._description = props.description;
        this._purchasePrice = props.purchasePrice;        
        this._salesPrice = props.salesPrice,
        this._stock = props.stock;    
        this.validate();  
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get purchasePrice(): number {
        return this._purchasePrice;
    }

    get stock(): number {
        return this._stock;
    }

    set name(name: string) {
        this._name = name;
    }

    get salesPrice(): number {
        return this._salesPrice;
    }

    set salesPrice(salesPrice: number) {
        this._salesPrice = salesPrice;
    }

    set description(description: string) {
        this._description = description;
    }

    set purchasePrice(purchasePrice: number) {
        this._purchasePrice = purchasePrice;
    }

    set stock(stock: number) {
        this._stock = stock;
    }

    validate(): boolean {           
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    
        if (this.description.length === 0) {
            throw new Error("Description is required");
        }

        if (this._purchasePrice === 0) {
            throw new Error("Purchase price cannot be zero");
        }
    
        if (this._salesPrice === 0) {
            throw new Error("Sales price cannot be zero");
        }
    
        return true;
    }

}
