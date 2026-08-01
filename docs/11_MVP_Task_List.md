# MagicBook 3.0 MVP Task List

Version: Draft

Status: In Progress

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-01

---

# Purpose

本文件為 MagicBook 3.0 MVP 執行清單。

阿德請依照順序完成。

不要自行新增功能。

若規格未定義，請停止並提出問題。

---

# Before Development

開發前請先閱讀：

- ✅ 00_Brand_Philosophy.md
- ✅ 01_Product_Specification.md
- ✅ 02_MVP_Development.md
- ✅ 04_Development_Guidelines.md

不要自行修改產品規格。

---

# Task 1 — Project Setup

- [ ] 建立 React + Vite 專案
- [ ] 建立 GitHub 專案
- [ ] 建立基本資料夾結構
- [ ] 建立共用 Layout

---

# Task 2 — Home

完成首頁。

- [ ] MagicBook 首頁
- [ ] Start Editing Button
- [ ] 進入 Book Editor

---

# Task 3 — Book Editor

注意：

Image Area 與 Text Area 同屬於同一個 Page。

兩者共同組成一頁教材。

兩個工作區可各自獨立作業（Independent Operation）。

彼此：

- 功能獨立
- 資料獨立
- 操作獨立

第一版 MVP 不建立任何互動邏輯（Interaction Logic）。

不得自行假設：

- 一張圖片對應一段文字
- 圖片控制文字
- 文字控制圖片
- 自動同步
- 自動切換
- 其他未定義流程

除共同隸屬於同一個 Page 外，

Image Area 與 Text Area 應保持互不干擾，可各自獨立開發與獨立運作。

# Task 4 — Image Area

完成：

- [ ] Add Image
- [ ] Delete Image
- [ ] Drag Sorting

不要加入：

- Hotspot
- AI
- Dictionary
- Popup

---

# Task 5 — Text Area

完成：

- [ ] 建立文字區
- [ ] 基本文字輸入

不要加入：

- Rich Text
- HTML Overlay
- AI

---

# Task 6 — Save Book

完成：

- [ ] Save Dialog
- [ ] Book Name
- [ ] Save

---

# Task 7 — Book Library

完成：

- [ ] Book List
- [ ] Create Book
- [ ] Edit Book
- [ ] Delete Book
- [ ] Search Book

不要加入：

- Folder
- Favorite
- Tag

---

# Task 8 — Reading Mode

完成：

- [ ] Reading Mode
- [ ] Hide Header
- [ ] Hide Toolbar
- [ ] Back to Edit

---

# MVP Complete Checklist

完成以下流程：

- [ ] Home

↓

- [ ] Book Editor

↓

- [ ] Add Image

↓

- [ ] Save Book

↓

- [ ] Book Library

↓

- [ ] Open Book

↓

- [ ] Reading Mode

↓

- [ ] Back to Edit

---

# Development Rules

若規格未定義：

停止開發。

不要自行設計。

請提出問題。

---

# Progress

| Task | Status |
|------|--------|
| Project Setup | ⬜ |
| Home | ⬜ |
| Book Editor | ⬜ |
| Image Area | ⬜ |
| Text Area | ⬜ |
| Save Book | ⬜ |
| Book Library | ⬜ |
| Reading Mode | ⬜ |
| MVP Complete | ⬜ |

---

# Change Log

| Version | Date | Description |
|----------|------------|-----------------------------|
| Draft | 2026-08-01 | Initial MVP Task List |
