// MagicBook 3.0 — New Book Type Modal
//
// 依既有交接文件第二節：尚未建立教材 → 創作魔法書 →
// 選擇先編輯圖片／文字 → 進入新教材 Editor（Placeholder）。
// 兩個選擇目前都導向同一個 Editor Placeholder（依 Task4 規劃第 8 節），
// 選擇本身在 Task 4 階段不影響 Book 的資料，留給 Task 5 使用。

import Modal from './Modal'

function NewBookTypeModal({ onClose, onSelectImage, onSelectText }) {
  return (
    <Modal title="從哪裡開始？" onClose={onClose}>
      <div className="mb-onboarding-actions">
        <button type="button" className="mb-onboarding-primary" onClick={onSelectImage}>
          圖片
        </button>
        <button type="button" className="mb-onboarding-primary" onClick={onSelectText}>
          文字
        </button>
      </div>
    </Modal>
  )
}

export default NewBookTypeModal
