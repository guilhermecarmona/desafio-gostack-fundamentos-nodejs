import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionServiceDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    type,
    value,
  }: CreateTransactionServiceDTO): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total - value < 0) throw Error('Insufficient balance');
    }
    return this.transactionsRepository.create({ title, type, value });
  }
}

export default CreateTransactionService;
