// ── Utility Functions ──────────────────────────────
// Migrated from Vanilla JS app.js

export function formatRupiah(num) {
    const abs = Math.abs(num);
    const formatted = abs.toLocaleString('id-ID');
    return (num < 0 ? '-' : '') + 'Rp ' + formatted;
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function getTodayString() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
}
