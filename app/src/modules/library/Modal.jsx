// MagicBook 3.0 — Task 4 / 共用 Modal 外框
//
// Book Library 內多個地方需要彈出視窗（打開魔法書的閱讀/編輯選擇、
// 新書的圖片/文字選擇、Book↔Folder 勾選、Rename），這裡先建立一個
// 最小共用外框，避免每個彈窗各自重複同一套 overlay 邏輯。

function Modal({ title, onClose, children }) {
  return (
    <div className="mb-modal-overlay" onClick={onClose}>
      <div className="mb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mb-modal-header">
          <h3 className="mb-modal-title">{title}</h3>
          <button type="button" className="mb-modal-close" aria-label="關閉" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="mb-modal-body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
