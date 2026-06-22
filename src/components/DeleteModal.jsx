export default function DeleteModal({ isOpen, onCancel, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay visible"
            id="delete-modal"
            onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
            <div className="modal card" id="delete-modal-card">
                <h3 className="modal-title">Hapus Transaksi?</h3>
                <p className="modal-text">Transaksi ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.</p>
                <div className="modal-actions">
                    <button className="btn btn-outline" id="cancel-delete-btn" onClick={onCancel}>Batal</button>
                    <button className="btn btn-danger" id="confirm-delete-btn" onClick={onConfirm}>Hapus</button>
                </div>
            </div>
        </div>
    );
}
