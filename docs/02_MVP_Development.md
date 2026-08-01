# MagicBook 3.0 MVP Development

Version: Draft

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-01

---

# Table of Contents

1. MVP Purpose
2. MVP Principles
3. Development Scope
4. User Flow
5. Screen Specifications
6. Functional Modules
7. Out of Scope
8. Acceptance Criteria
9. Development Sequence
10. Change Log

---

# 1. MVP Purpose

MagicBook 3.0 採分階段（Phased Development）方式開發。

本文件定義第一版 MVP（Minimum Viable Product，最小可行產品）的開發範圍。

MVP 的目標不是完成所有功能，而是建立完整且可操作的教材編輯流程（Teaching Material Editing Workflow），驗證產品架構（Architecture）與使用者操作流程（User Flow）。

所有功能皆須符合《01_Product_Specification.md》所定義的產品定位與核心設計理念。

---

# 2. MVP Principles

第一版 MVP 必須遵守以下原則：

- 建立完整操作流程（Complete User Flow）
- 建立核心畫面（Core UI）
- 驗證操作體驗（User Experience）
- 保持模組化架構（Modular Architecture）
- 不提前實作未定義功能
- 不因方便開發而改變產品架構

若規格未定義，禁止自行新增功能。

若需求不明確，應提出問題，不得自行推論產品流程。

---

# 3. Development Scope

本階段開發重點如下：
## MVP Technical Boundary

本文件定義 MVP 的功能範圍（Functional Scope）與使用者流程（User Flow）。

本文件不限制技術實作方式（Technical Implementation）。

除非 Product Specification 有明確規定，下列技術細節由 Technical Lead 自行決定：

- State Management
- Local Storage Implementation
- Project Folder Structure
- Component Structure
- Internal Code Organization
- Third-party Library Selection

技術實作必須符合以下原則：

- 不改變產品功能
- 不改變使用者操作流程
- 不違反 Product Specification
- 不超出 MVP Scope

---

## Included

### Home（首頁）

建立產品首頁。

提供進入教材編輯器入口。

---

### Book Editor（教材編輯）

建立教材編輯畫面。

完成基本畫面配置。

---

### Image Area（圖片區）

提供：

- Add Image（新增圖片）
- Delete Image（刪除圖片）
- Drag & Drop Sorting（拖曳排序）

第一版僅管理圖片。

不包含圖片互動。

---

### Text Area（文字區）

建立文字工作區。

第一版僅建立畫面架構。

文字編輯功能將於後續版本定義。

---

### Save Book（教材儲存）

提供教材儲存流程。

包含：

- 教材名稱輸入
- 儲存
- 進入閱讀模式

---
---

### Lesson Handling（Lesson 處理）

為保持與 Product Specification 一致的系統架構，

MVP 第一版保留：

Book → Lesson → Page

資料結構。

但 Lesson 不提供使用者操作介面（UI）。

系統於建立新 Book 時，

自動建立一個預設 Lesson。

第一版所有 Page 均建立於此預設 Lesson 內。

後續版本再開放 Lesson 管理功能。


### Book Library（教材櫃）

提供教材管理畫面。

支援：

- 建立教材
- 編輯教材
- 刪除教材
- 搜尋教材
- 最近使用教材

教材依建立時間排序。

最新教材優先顯示。

---

### Reading Mode（閱讀模式）

提供教材閱讀畫面。

閱讀模式僅顯示教材內容。

保留唯一操作：

- Back to Edit（返回編輯）

---

# 4. User Flow

第一版 MVP 必須完成以下操作流程：

```
Home

↓

Start Editing

↓

Book Editor

↓

Save Book

↓

Input Book Name

↓

Book Library

↓

Open Book

↓

Reading Mode

↓

Back to Edit
```

此流程為 MVP 最小可驗證流程（Minimum Verifiable Workflow）。

---

# 5. Screen Specifications

## Screen 01 — Home

目的：

產品入口畫面。

需求：

- 顯示 MagicBook 主視覺
- 顯示「開始編輯（Start Editing）」按鈕
- 點擊後進入教材編輯畫面

---

## Screen 02 — Book Editor

畫面固定分為兩個工作區：

左側：

Image Area（圖片區）

右側：

Text Area（文字區）

兩個工作區：

- 完全獨立
- 不建立資料關聯
- 不同步內容
- 不假設一對一關係

任何圖片與文字之間的對應方式，待後續版本定義。

---

## Screen 03 — Save Dialog

按下「儲存」後顯示：

輸入：

- Book Name（教材名稱）

按鈕：

- Save（儲存）
- Start Reading（開始閱讀）

---

## Screen 04 — Book Library

提供：

- 新增教材
- 編輯教材
- 刪除教材
- 搜尋教材
- 最近使用

第一版不提供：

- Folder（資料夾）
- Favorites（收藏）
- Tags（標籤）
- Sorting Options（排序條件）
- Course Management（課程管理）

---

## Screen 05 — Reading Mode

閱讀模式僅顯示教材內容。

以下介面不得顯示：

- Header
- Toolbar
- Management Buttons

保留唯一操作：

- Back to Edit（返回編輯）

---

## Unsaved Changes

若教材尚未儲存，離開畫面前應提示：

> 尚未儲存教材，離開後資料將遺失。

提供：

- Continue Editing（繼續編輯）
- Leave Without Saving（離開）

---

# 6. Functional Modules

本階段建立以下模組：

- Home Module
- Book Editor Module
- Image Area Module
- Text Area Module
- Save Dialog Module
- Book Library Module
- Reading Mode Module

各模組需保持獨立，可於後續版本持續擴充。

---

# 7. Out of Scope

以下功能不屬於第一版 MVP：

- AI
- Text-to-Speech（TTS）
- Interactive Hotspot
- Dictionary
- Popup System
- HTML Overlay
- Google Search
- Learning Analytics
- Data Synchronization
- Workspace Management
- Multi-user Collaboration
- Organization Mode

上述功能保留於後續版本，不得於 MVP 階段提前實作。

---

# 8. Acceptance Criteria

完成 MVP 後，使用者應可：

- 建立教材
- 新增圖片
- 管理教材
- 儲存教材
- 開啟教材
- 進入閱讀模式
- 返回編輯模式

整體流程可完整操作，且無需依賴 AI、資料庫或其他進階功能。

---

# 9. Development Sequence

建議開發順序如下：

Phase 1

- Home
- Book Editor Layout
- Image Area
- Text Area

Phase 2

- Save Dialog
- Book Library
- Reading Mode

Phase 3

- UI Refinement
- User Flow Validation
- Bug Fixing

完成上述內容後，即可進入下一階段功能開發。

---

# 10. Change Log

| Version | Date | Description |
|----------|------------|-------------------------------|
| Draft | 2026-08-01 | Initial MVP Development document |
