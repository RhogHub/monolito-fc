import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";


const transactionObj1 = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved", //Quando o objeto é criado ele é criado como pendente, por isso 'forcar' o status aqui.
});

const MockRepositoryApproved = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionObj1)),
    };
};

const transactionObj2 = new Transaction({
    id: new Id("1"),
    amount: 50,
    orderId: "1",  
    status: "declined",  
});

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionObj2)),
    };
};

describe("Process payment usecase unit test", () => {
    it("should approve a transaction", async () => {
        const paymentRepository = MockRepositoryApproved();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 100,
        }

        const result = await usecase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(transactionObj1.id.id);
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBe(transactionObj1.createdAt);
        expect(result.updatedAt).toBe(transactionObj1.updatedAt);        
    });

    it("should decline a transaction", async () => {
        const paymentRepository = MockRepositoryDeclined();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 50,
        }

        const result = await usecase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(transactionObj2.id.id);
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBe(transactionObj2.createdAt);
        expect(result.updatedAt).toBe(transactionObj2.updatedAt);        
    });

});