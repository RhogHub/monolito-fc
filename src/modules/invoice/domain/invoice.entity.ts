import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "./invoice-Item.entity";

type InvoiceProps = {
    id?: InvoiceId;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
    total?: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export class InvoiceId extends Id {
    constructor(id: string) {
        super(id);
    }
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItems[];

    constructor(props: InvoiceProps) {
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items; 
        this.validate();       
    }

    validate(): void {
        if (this._items.length <= 0) {
            throw new Error("Has to be at least one item");
        }
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): InvoiceItems[] {
        return this._items;
    }

    get total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
    
}


