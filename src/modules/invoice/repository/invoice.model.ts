import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

interface Item {
    id: string;
    name: string;
    price: number;
}

@Table({
    tableName: "invoices",
    timestamps: false,
})
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;
    
    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare document: string;

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare number: string;

    @Column({ allowNull: false })
    declare complement: string;

    @Column({ allowNull: false })
    declare city: string;

    @Column({ allowNull: false })
    declare state: string;

    @Column({ allowNull: false })
    declare zipCode: string;

    @Column({ allowNull: false, type: DataType.JSON })
    declare items: Item[];

    @Column({ allowNull: true })
    declare total?: number;

    @Column({ allowNull: true })
    declare createdAt?: Date;

    @Column({ allowNull: true })
    declare updatedAt?: Date;
}