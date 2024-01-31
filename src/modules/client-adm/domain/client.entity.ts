import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object"

type ClientProps = {
    id?: ClientId,
    name: string;
    email: string;
    document: string;
    address: Address;
    createdAt?: Date;
    updatedAt?: Date;
}

export class ClientId extends Id {
    constructor(id: string){
        super(id);
    }
}

export default class Client extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _email: string;
    private _document: string;
    private _address: Address;  

    constructor(props: ClientProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._email = props.email;
        this._document = props.document;
        this._address = new Address(
            props.address.street,  
            props.address.number,
            props.address.complement,
            props.address.city,
            props.address.state,
            props.address.zipCode,
        );    
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }   
    
}