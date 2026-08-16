// MagicBook 3.0 — Book Open Choice Modal
//
// 依既有交接文件第二節：已有教材 → 打開魔法書 → 提供「閱讀」／「編輯」兩個入口。

import Modal from './Modal'
import { displayBookTitle } from './BookCard'

function BookOpenChoiceModal({ book, onClose, onRead, onEdit }) {
  return (
    <Modal title={displayBookTitle(book)} onClose={onClose}>
      <div className="mb-onboarding-actions">
        <button type="button" className="mb-onboarding-primary" onClick={onRead}>
          閱讀
        </button>
        <button type="button" className="mb-onboarding-ghost" onClick={onEdit}>
          編輯
        </button>
      </div>
    </Modal>
  )
}

export default BookOpenChoiceModal
