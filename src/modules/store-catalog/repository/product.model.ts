import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "products",
    modelName: "ProductCatalogModel",
    timestamps: false,
})
export default class ProductCatalogModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare description: string;

    @Column({allowNull: false})
    declare salesPrice: number;
}