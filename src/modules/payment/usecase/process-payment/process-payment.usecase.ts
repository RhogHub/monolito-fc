import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
    constructor(
        private transactionRepository: PaymentGateway,        
    ) {}
    
    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        //throw new Error("Method not implemented.");
        //console.log(input);
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId,
        });

        transaction.process();
        //Com Vindi (gateway de pagamento): aguardaria o retorno antes de persistir no db.

        const persistTransaction = await this.transactionRepository.save(transaction);

        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: persistTransaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,
        };
    }

}