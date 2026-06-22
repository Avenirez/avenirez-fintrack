import { useMemo } from 'react';
import { formatRupiah } from '../utils/helpers';

export default function SummaryCards({ transactions }) {
    const { balance, income, expense } = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        return { balance: income - expense, income, expense };
    }, [transactions]);

    return (
        <section className="summary-cards" id="summary-section">
            <div className="card summary-card card-balance" id="card-balance">
                <div className="card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 10h20" />
                    </svg>
                </div>
                <p className="card-label">Total Saldo</p>
                <h2 className="card-value" id="total-balance">{formatRupiah(balance)}</h2>
                <div className="card-sparkle"></div>
            </div>
            <div className="card summary-card card-income" id="card-income">
                <div className="card-icon icon-income">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                    </svg>
                </div>
                <p className="card-label">Pemasukan</p>
                <h2 className="card-value" id="total-income">{formatRupiah(income)}</h2>
            </div>
            <div className="card summary-card card-expense" id="card-expense">
                <div className="card-icon icon-expense">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
                    </svg>
                </div>
                <p className="card-label">Pengeluaran</p>
                <h2 className="card-value" id="total-expense">{formatRupiah(expense)}</h2>
            </div>
        </section>
    );
}
