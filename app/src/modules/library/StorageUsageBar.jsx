// MagicBook 3.0 — Storage Usage Bar
//
// 依 01_Product_Specification.md §7.4／09_UI_Design.md §5.7：
// 遊戲式長條血量棒，不使用愛心。Task 4 階段只做 UI 骨架，不接真實容量計算，
// 不顯示假的「0 GB」，基本容量／價格皆尚未定案，不得寫死於此。

function StorageUsageBar() {
  return (
    <div className="mb-storage-bar" role="img" aria-label="容量使用狀態">
      <div className="mb-storage-bar-track">
        <div className="mb-storage-bar-fill" style={{ width: '0%' }} />
      </div>
      <span className="mb-storage-bar-label">容量資訊將於教材建立後顯示</span>
    </div>
  )
}

export default StorageUsageBar
