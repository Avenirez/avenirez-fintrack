import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import DonutChart from './components/DonutChart';
import BudgetTracker from './components/BudgetTracker';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import DeleteModal from './components/DeleteModal';

export default function App() {
    // ── State (dengan localStorage otomatis) ─────────────
    const [transactions, setTransactions] = useLocalStorage('ft_transactions', []);
    const [budgetLimit, setBudgetLimit] = useLocalStorage('ft_budget', 0);
    const [theme, setTheme] = useLocalStorage('ft_theme', 'dark');
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    // ── Theme ────────────────────────────────────────────
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, [setTheme]);

    // ── Transaction CRUD ─────────────────────────────────
    const addTransaction = useCallback((tx) => {
        setTransactions(prev => [...prev, tx]);
    }, [setTransactions]);

    const requestDelete = useCallback((id) => {
        setDeleteTargetId(id);
    }, []);

    const confirmDelete = useCallback(() => {
        if (!deleteTargetId) return;
        setTransactions(prev => prev.filter(t => t.id !== deleteTargetId));
        setDeleteTargetId(null);
    }, [deleteTargetId, setTransactions]);

    const cancelDelete = useCallback(() => {
        setDeleteTargetId(null);
    }, []);

    // ── Budget ───────────────────────────────────────────
    const handleSetBudget = useCallback((val) => {
        setBudgetLimit(val);
    }, [setBudgetLimit]);

    const handleResetBudget = useCallback(() => {
        setBudgetLimit(0);
    }, [setBudgetLimit]);

    // ── ESC key to close modal ───────────────────────────
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') setDeleteTargetId(null); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <>
            {/* Background Glow Orbs */}
            <div className="bg-orbs" aria-hidden="true">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            <div className="app-container">
                <Header theme={theme} onToggleTheme={toggleTheme} />

                <SummaryCards transactions={transactions} />

                <section className="middle-section" id="middle-section">
                    <DonutChart transactions={transactions} theme={theme} />
                    <BudgetTracker
                        transactions={transactions}
                        budgetLimit={budgetLimit}
                        onSetBudget={handleSetBudget}
                        onResetBudget={handleResetBudget}
                    />
                </section>

                <section className="transaction-section" id="transaction-section">
                    <TransactionForm onAddTransaction={addTransaction} />
                    <TransactionList
                        transactions={transactions}
                        onDeleteTransaction={requestDelete}
                    />
                </section>

                <footer className="app-footer" id="app-footer">
                    <p>&copy; 2026 Fintrack. Dibuat dengan 💚</p>
                </footer>
            </div>

            <DeleteModal
                isOpen={deleteTargetId !== null}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />
        </>
    );
}
