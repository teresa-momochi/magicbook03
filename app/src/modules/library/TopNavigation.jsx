// MagicBook 3.0 — Book Library Top Navigation
//
// 依 09_UI_Design.md §5.4：頂部固定四項（我的魔法書／Storage Usage Bar／
// 創作魔法書／Search），Desktop 橫排、Mobile 四排直排（由 library.css 處理）。
// 「創作魔法書」為永久固定入口，不論使用者目前有沒有教材都可以點擊。

import StorageUsageBar from './StorageUsageBar'
import SearchBar from './SearchBar'

function TopNavigation({ onGoRoot, onCreateBook, onSearchResultsChange }) {
  return (
    <div className="mb-library-topnav">
      <button type="button" className="mb-library-topnav-home" onClick={onGoRoot}>
        我的魔法書
      </button>
      <StorageUsageBar />
      <button type="button" className="mb-library-topnav-create" onClick={onCreateBook}>
        創作魔法書
      </button>
      <SearchBar onResultsChange={onSearchResultsChange} />
    </div>
  )
}

export default TopNavigation
