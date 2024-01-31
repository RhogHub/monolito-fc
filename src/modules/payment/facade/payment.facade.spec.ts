import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
//import TransactionRepository from "../repository/transaction.repository";
//import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
//import PaymentFacade from "./payment.facade";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("PaymentFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a transaction",async () => {
        //Puro:
        // const repository = new TransactionRepository();
        // const usecase = new ProcessPaymentUseCase(repository);
        // const facade = new PaymentFacade(usecase);

        //Com factory:
        const facade = PaymentFacadeFactory.create();

        const input = {
            orderId: "order-1",
            amount: 100,
        };

        const output = await facade.process(input);

        expect(output.transactionId).toBeDefined();
        expect(output.orderId).toBe(input.orderId);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe("approved");
    });
    
});