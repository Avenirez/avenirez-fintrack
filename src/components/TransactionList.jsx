import { useState, useMemo } from 'react';
import CATEGORIES from '../data/categories';
import { formatRupiah } from '../utils/helpers';

export default function TransactionList({ transactions, onDeleteTransaction }) {
    const [filter, setFilter] = useState('all');

    const filtered = useMemo(() => {
        let result = transactions;
        if (filter !== 'all') {
            result = result.filter(t => t.type === filter);
        }
        // Sort by date desc, then by createdAt desc
        return [...result].sort((a, b) => {
            const dateDiff = new Date(b.date) - new Date(a.date);
            return dateDiff !== 0 ? dateDiff : b.createdAt - a.createdAt;
        });
    }, [transactions, filter]);

    return (
        <div className="card list-card" id="list-card">
            <div className="list-header">
                <h3 className="card-heading">Riwayat Transaksi</h3>
                <div className="filter-group" id="filter-group">
                    {['all', 'income', 'expense'].map(f => (
                        <button
                            key={f}
                            className={`filter-btn ${filter === f ? 'active' : ''}`}
                            data-filter={f}
                            id={`filter-${f}`}
                            onClick={() => setFilter(f)}
                        >
                            {f === 'all' ? 'Semua' : f === 'income' ? 'Masuk' : 'Keluar'}
                        </button>
                    ))}
                </div>
            </div>
            <div className="transaction-list" id="transaction-list">
                {filtered.length === 0 ? (
                    <div className="empty-state" id="empty-state">
                        <div className="empty-icon">📋</div>
                        <p className="empty-text">Belum ada transaksi</p>
                        <p className="empty-subtext">Tambahkan transaksi pertamamu di sebelah kiri</p>
                    </div>
                ) : (
                    filtered.map(t => {
                        const cat = CATEGORIES[t.category] || { emoji: '📄', label: t.category };
                        const dateFormatted = new Date(t.date).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'short', year: 'numeric'
                        });

                        return (
                            <div className="tx-item" key={t.id} data-id={t.id}>
                                <div className="tx-icon">{cat.emoji}</div>
                                <div className="tx-info">
                                    <div className="tx-desc">{t.description}</div>
                                    <div className="tx-meta">
                                        <span>{dateFormatted}</span>
                                        <span className="tx-category-badge">{cat.label}</span>
                                    </div>
                                </div>
                                <div className={`tx-amount ${t.type}`}>
                                    {t.type === 'income' ? '+' : '-'}{formatRupiah(t.amount)}
                                </div>
                                <button
                                    className="tx-delete-btn"
                                    title="Hapus Transaksi"
                                    onClick={() => onDeleteTransaction(t.id)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
