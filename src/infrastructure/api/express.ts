import express, {Express} from "express";
import { Sequelize } from "sequelize-typescript";
import { clientsRoute } from "./routes/clients.route";
import { productsRoute } from "./routes/products.route";
import { checkoutRoute } from "./routes/checkout.route";
import { invoiceRoute } from "./routes/invoice.route";
import ClientModel from "../../modules/client-adm/repository/client.model";
import ProductModel from "../../modules/product-adm/repository/product.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import { Umzug } from "umzug"
import ProductCatalogModel from "../../modules/store-catalog/repository/product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";

export const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/clients", clientsRoute);
app.use("/products", productsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;
export let migration: Umzug<any>;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        //storage: './db.sqlite',
        logging: false        
    });
    sequelize.addModels([ClientModel,ProductCatalogModel,ProductModel,InvoiceModel,TransactionModel,OrderModel]);
    await sequelize.sync({alter: true});
        
}
setupDb();