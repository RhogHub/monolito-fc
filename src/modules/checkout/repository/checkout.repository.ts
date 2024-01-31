import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./order.model";

export default class CheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id.id,            
            client: {
                id: order.client.id.id,
                name: order.client.name,
                email: order.client.email,                
                address: order.client.address,
            },
            products: order.products.map((product) => ({               
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,                          
            })),
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        });
    }

    async findOrder(id: string): Promise<Order> {
        //throw new Error("Method not implemented.");
        const order = await OrderModel.findOne({
            where: { id }          
        });

        if (!order) {
            throw new Error("Order not found");
        }

        return new Order({
            id: new Id(order.id),
            client: new Client({
                id: new Id(order.id),
                name: order.client.name,
                email: order.client.email,                
                address: order.client.address,
            }),
            products: order.products.map((product) => new Product({
                id: new Id(product.id.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            })),
            status: order.status,        
        });
    }

}