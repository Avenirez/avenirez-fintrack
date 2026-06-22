import { useState } from 'react';
import { generateId, getTodayString } from '../utils/helpers';

export default function TransactionForm({ onAddTransaction }) {
    const [type, setType] = useState('income');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('gaji');
    const [date, setDate] = useState(getTodayString());

    const handleTypeChange = (newType) => {
        setType(newType);
        setCategory(newType === 'income' ? 'gaji' : 'makanan');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const amountNum = parseFloat(amount);
        if (!description.trim() || !amountNum || amountNum <= 0 || !category || !date) return;

        onAddTransaction({
            id: generateId(),
            type,
            description: description.trim(),
            amount: amountNum,
            category,
            date,
            createdAt: Date.now(),
        });

        // Reset form
        setDescription('');
        setAmount('');
        setDate(getTodayString());
        setCategory(type === 'income' ? 'gaji' : 'makanan');
    };

    return (
        <div className="card form-card" id="form-card">
            <h3 className="card-heading">Tambah Transaksi</h3>
            <form id="transaction-form" autoComplete="off" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Tipe</label>
                    <div className="type-toggle" id="type-toggle">
                        <button
                            type="button"
                            className={`type-btn ${type === 'income' ? 'active' : ''}`}
                            data-type="income"
                            id="type-income-btn"
                            onClick={() => handleTypeChange('income')}
                        >
                            <span className="type-icon">📈</span> Pemasukan
                        </button>
                        <button
                            type="button"
                            className={`type-btn ${type === 'expense' ? 'active' : ''}`}
                            data-type="expense"
                            id="type-expense-btn"
                            onClick={() => handleTypeChange('expense')}
                        >
                            <span className="type-icon">📉</span> Pengeluaran
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="tx-description" className="form-label">Deskripsi</label>
                    <input
                        type="text"
                        id="tx-description"
                        className="input-field"
                        placeholder="Contoh: Gaji Bulanan"
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tx-amount" className="form-label">Jumlah (Rp)</label>
                    <input
                        type="number"
                        id="tx-amount"
                        className="input-field"
                        placeholder="Contoh: 1500000"
                        min="1"
                        required
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tx-category" className="form-label">Kategori</label>
                    <select
                        id="tx-category"
                        className="input-field"
                        required
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        {type === 'income' ? (
                            <optgroup label="Pemasukan">
                                <option value="gaji">💰 Gaji</option>
                                <option value="freelance">💸 Freelance</option>
                                <option value="investasi">📊 Investasi</option>
                                <option value="lainnya-masuk">🎁 Lainnya</option>
                            </optgroup>
                        ) : (
                            <optgroup label="Pengeluaran">
                                <option value="makanan">🍔 Makanan</option>
                                <option value="transportasi">🚌 Transportasi</option>
                                <option value="hiburan">🎮 Hiburan</option>
                                <option value="belanja">🛒 Belanja</option>
                                <option value="tagihan">💡 Tagihan</option>
                                <option value="kesehatan">🏥 Kesehatan</option>
                                <option value="pendidikan">📚 Pendidikan</option>
                                <option value="lainnya-keluar">📦 Lainnya</option>
                            </optgroup>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="tx-date" className="form-label">Tanggal</label>
                    <input
                        type="date"
                        id="tx-date"
                        className="input-field"
                        required
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-full" id="submit-tx-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Tambah Transaksi
                </button>
            </form>
        </div>
    );
}
