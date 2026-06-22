import { useState, useMemo } from 'react';
import { formatRupiah } from '../utils/helpers';

export default function BudgetTracker({ transactions, budgetLimit, onSetBudget, onResetBudget }) {
    const [inputValue, setInputValue] = useState('');

    const totalExpense = useMemo(
        () => transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
        [transactions]
    );

    const pct = budgetLimit > 0 ? Math.min((totalExpense / budgetLimit) * 100, 100) : 0;

    let barClass = '';
    let pctText = `${Math.round(pct)}% terpakai`;
    let pctColor = 'var(--text-muted)';

    if (pct >= 100) {
        barClass = 'danger';
        pctText = '⚠️ Anggaran terlampaui!';
        pctColor = 'var(--color-red)';
    } else if (pct >= 75) {
        barClass = 'warning';
        pctText = `${Math.round(pct)}% terpakai — Mendekati batas!`;
        pctColor = 'var(--color-gold)';
    }

    const handleSave = () => {
        const val = parseFloat(inputValue);
        if (!val || val <= 0) return;
        onSetBudget(val);
        setInputValue('');
    };

    // Monthly stats
    const monthlyStats = useMemo(() => {
        const now = new Date();
        const monthTx = transactions.filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        const monthInc = monthTx.filter(t => t.type === 'income');
        const monthExp = monthTx.filter(t => t.type === 'expense');
        const avgExp = monthExp.length > 0
            ? monthExp.reduce((s, t) => s + t.amount, 0) / monthExp.length
            : 0;

        return {
            incomeCount: monthInc.length,
            expenseCount: monthExp.length,
            avgExpense: Math.round(avgExp),
        };
    }, [transactions]);

    return (
        <div className="card budget-card" id="budget-card">
            <h3 className="card-heading">Batas Anggaran Bulanan</h3>

            <div className="budget-input-group" id="budget-input-group">
                <label htmlFor="budget-input" className="budget-label">Target Batas (Rp)</label>
                <div className="input-with-btn">
                    <input
                        type="number"
                        id="budget-input"
                        className="input-field"
                        placeholder="Contoh: 5000000"
                        min="0"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSave()}
                    />
                    <button className="btn btn-gold" id="set-budget-btn" onClick={handleSave}>Simpan</button>
                </div>
            </div>

            {budgetLimit > 0 && (
                <div className="budget-progress-section visible" id="budget-progress-section">
                    <div className="budget-info">
                        <span className="budget-spent" id="budget-spent">{formatRupiah(totalExpense)}</span>
                        <span className="budget-separator">dari</span>
                        <span className="budget-limit" id="budget-limit">{formatRupiah(budgetLimit)}</span>
                    </div>
                    <div className="progress-bar-track" id="progress-bar-track">
                        <div
                            className={`progress-bar-fill ${barClass}`}
                            id="progress-bar-fill"
                            style={{ width: `${pct}%` }}
                        ></div>
                    </div>
                    <p className="budget-percentage" id="budget-percentage" style={{ color: pctColor }}>{pctText}</p>
                    <button className="btn btn-outline btn-sm" id="reset-budget-btn" onClick={onResetBudget}>Reset Anggaran</button>
                </div>
            )}

            <div className="monthly-summary" id="monthly-summary">
                <h4 className="summary-title">Ringkasan Bulan Ini</h4>
                <div className="summary-row">
                    <span>Transaksi Masuk</span>
                    <span className="text-emerald" id="month-income-count">{monthlyStats.incomeCount} transaksi</span>
                </div>
                <div className="summary-row">
                    <span>Transaksi Keluar</span>
                    <span className="text-red" id="month-expense-count">{monthlyStats.expenseCount} transaksi</span>
                </div>
                <div className="summary-row">
                    <span>Rata-rata Pengeluaran</span>
                    <span id="avg-expense">{formatRupiah(monthlyStats.avgExpense)}</span>
                </div>
            </div>
        </div>
    );
}
