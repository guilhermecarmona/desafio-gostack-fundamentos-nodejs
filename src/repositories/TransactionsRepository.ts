import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income: number = 0;
    let outcome: number = 0;
    const transactionsBalanceReducer = (
      sum: number,
      currentValue: Transaction,
    ) => {
      if (currentValue.type === 'income') {
        income += currentValue.value;
        return sum + currentValue.value;
      } else {
        outcome += currentValue.value;
        return sum - currentValue.value;
      }
    };
    const total = this.transactions.reduce(transactionsBalanceReducer, 0);
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
