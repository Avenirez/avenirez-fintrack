// ── Category Configuration ──────────────────────────────
// Migrated from Vanilla JS app.js — same data, now exported as a module

const CATEGORIES = {
    // Income
    gaji:             { label: 'Gaji',          emoji: '💰', type: 'income' },
    freelance:        { label: 'Freelance',     emoji: '💸', type: 'income' },
    investasi:        { label: 'Investasi',     emoji: '📊', type: 'income' },
    'lainnya-masuk':  { label: 'Lainnya',       emoji: '🎁', type: 'income' },
    // Expense
    makanan:          { label: 'Makanan',       emoji: '🍔', type: 'expense', color: '#10b981' },
    transportasi:     { label: 'Transportasi',  emoji: '🚌', type: 'expense', color: '#0ea5e9' },
    hiburan:          { label: 'Hiburan',       emoji: '🎮', type: 'expense', color: '#8b5cf6' },
    belanja:          { label: 'Belanja',       emoji: '🛒', type: 'expense', color: '#f59e0b' },
    tagihan:          { label: 'Tagihan',       emoji: '💡', type: 'expense', color: '#ef4444' },
    kesehatan:        { label: 'Kesehatan',     emoji: '🏥', type: 'expense', color: '#ec4899' },
    pendidikan:       { label: 'Pendidikan',    emoji: '📚', type: 'expense', color: '#06b6d4' },
    'lainnya-keluar': { label: 'Lainnya',       emoji: '📦', type: 'expense', color: '#94a3b8' },
};

export default CATEGORIES;
