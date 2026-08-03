# MagicBook 3.0 Development Guidelines

Version: 3.0

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-02

---

# Table of Contents

1. Purpose
2. Core Development Principles
3. Architecture Principles
4. Module Design
5. UI Development Guidelines
6. Performance Guidelines
7. Data Management Guidelines
8. Feature Development Guidelines
9. Coding Principles
10. Version Control
11. Change Log

---

# 1. Purpose

本文件定義 MagicBook 3.0 的開發規範（Development Guidelines）。

所有功能開發皆應遵守本文件。

本文件目的為：

- 建立一致的產品架構
- 建立一致的開發流程
- 建立一致的 UI 操作方式
- 建立一致的資料管理方式
- 降低模組耦合（Low Coupling）
- 提高可維護性（Maintainability）
- 提高可擴充性（Scalability）
- 避免新增功能時破壞既有架構

MagicBook 採 Complete Product Architecture（完整產品架構）。

MVP（Minimum Viable Product）為所有開發文件的唯一標準（Single Source of Truth）。

所有設計文件皆須與 MVP 保持一致。

---

# 2. Core Development Principles

MagicBook 所有開發皆須遵守以下核心原則。

---

## 2.1 Teaching Material First

教材（Teaching Material）永遠是產品核心。

MagicBook 提供互動工具，

不提供教材內容。

任何功能皆不得修改教材原始內容。

---

## 2.2 Complete Product Architecture

第一版即建立完整產品架構。

所有核心模組皆須建立：

- Data Model
- CRUD
- User Interface
- User Flow

第三方服務可逐步完善，

不得影響產品架構。

---

## 2.3 Architecture First

所有新功能皆建立於既有架構。

不得因新增功能重新設計產品架構。

---

## 2.4 Modular Architecture

所有功能皆應建立為獨立模組（Module）。

各模組應：

- 可獨立開發
- 可獨立測試
- 可獨立維護
- 可持續擴充

---

## 2.5 Replaceable Service

MagicBook 不綁定任何第三方服務。

包括：

- AI Provider
- Dictionary Provider
- Audio Provider

所有第三方服務皆可自由替換。

更換服務不得影響：

- 教材資料
- Workspace
- 系統架構
- 使用者操作流程

---

## 2.6 Consistent User Experience

所有功能皆應保持一致操作方式。

例如：

- Context Toolbar
- Global Search
- Popup
- CRUD
- Selection

新增功能不得建立另一套操作模式。

---

## 2.7 Specification Consistency

MVP 為所有設計文件共同依據。

任何需求變更後，

必須同步更新相關文件。

不得讓文件內容彼此矛盾。

# 3. Architecture Principles

## 3.1 Unified Architecture

MagicBook 採統一產品架構（Unified Product Architecture）。

所有功能皆建立於相同架構。

不得因單一功能建立第二套系統架構。

---

## 3.2 Core Architecture

MagicBook 採固定資料架構：

Workspace

↓

Book Library

↓

Folder

↓

Book

↓

Lesson

↓

Page

↓

Image Area

Text Area

↓

HTML Overlay

↓

Hotspot

↓

Popup

↓

Dictionary / AI / Audio

所有功能皆建立於上述架構。

不得改變資料層級。

---

## 3.3 Separation of Teaching Material and Interaction

教材（Teaching Material）與互動（Interaction）完全分離。

教材負責：

- 教材內容
- 教材版面
- 教材呈現

互動負責：

- HTML Overlay
- Hotspot
- Popup
- Dictionary
- AI
- Audio

任何互動功能皆不得修改教材原始內容。

---

## 3.4 HTML Overlay Principle

HTML Overlay 為獨立互動層（Interaction Layer）。

建立於教材之上。

可覆蓋：

- Image
- PDF
- Camera

所有互動皆建立於 HTML Overlay。

不得直接建立於教材本體。

---

## 3.5 Shared Services

共用功能應建立為 Shared Service（共用服務）。

例如：

- Authentication
- Context Toolbar
- Global Search
- Save
- Background Processing

不得於各模組重複開發相同功能。

---

## 3.6 Replaceable Services

所有第三方服務皆應建立抽象介面（Interface）。

不得直接綁定：

- AI
- Dictionary
- Audio

未來更換 Provider 時，

不得修改核心程式。

---

## 3.7 Low Coupling

各模組應保持低耦合（Low Coupling）。

不得直接存取其他模組內部程式。

若需共同功能，

應建立 Shared Service。

---

## 3.8 High Cohesion

每個模組僅負責自身工作。

例如：

Book Module

僅負責 Book。

不得直接管理：

- AI
- Dictionary
- Audio

保持模組職責單純。

---

# 4. Module Design

## 4.1 Module Principles

所有功能皆應建立為獨立模組（Independent Module）。

每個模組皆應：

- 可獨立開發
- 可獨立測試
- 可獨立維護
- 可持續擴充

不得依賴其他模組才能正常運作。

---

## 4.2 Core Modules

MagicBook 第一版建立以下核心模組：

- Authentication
- Workspace
- Book Library
- Folder
- Book
- Lesson
- Page
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Popup
- Dictionary
- AI
- Audio
- Reading Mode
- Global Search
- Context Toolbar
所有核心模組皆須完成基本資料架構。

---

## 4.3 UI Modules

所有 UI 模組皆應遵循一致設計。

例如：

- Context Toolbar
- Popup
- Search Toolbar

不得建立不同操作方式。

---

## 4.4 Service Modules

共用功能應建立為 Service Module。

包括：

- Authentication Service
- Global Search Service
- Save Service
- Background Processing Service

所有模組共用相同 Service。

不得重複開發。

---

## 4.5 Module Communication

模組之間應透過公開介面（Public Interface）溝通。

不得直接修改其他模組資料。

避免形成高度耦合。

---

## 4.6 Future Expansion

新增模組時，

不得修改既有架構。

應以擴充（Extension）方式加入。

例如：

新增 Dictionary Provider、

新增 AI Provider、

新增 Audio Provider，

皆應建立於既有模組。

不得重新設計產品架構。

---

## 4.7 Module Naming

所有模組命名皆應一致。

例如：

- Workspace Module
- Book Module
- Lesson Module
- Image Area Module
- HTML Overlay Module
- Hotspot Module

避免使用不同命名方式造成混淆。

---

## 4.8 Module Independence

任何模組移除後，

不得造成其他模組無法運作。

例如：

移除 AI，

教材仍可正常閱讀。

移除 Dictionary，

Hotspot 仍可正常運作。

模組之間應保持獨立性。

# 5. UI Development Guidelines

## 5.1 Design Principles

所有使用者介面（User Interface）皆應遵循一致的設計原則。

包括：

- 一致的版面配置
- 一致的操作流程
- 一致的命名方式
- 一致的互動模式

新增功能不得重新建立另一套 UI。

---

## 5.2 Consistent User Experience

所有畫面皆應保持相同操作邏輯。

例如：

- Select
- Move
- Resize
- Save
- Delete
- Search

不同模組不得使用不同操作方式完成相同工作。

---

## 5.3 Context Toolbar

Context Toolbar 為全系統共用工具列。

所有可編輯物件共用：

- Image
- Text
- HTML Overlay
- Hotspot

Context Toolbar 應支援：

- Floating
- Auto Show
- Auto Hide
- Draggable
- Dockable

Toolbar 不得遮蔽教材主要內容。

---

## 5.4 Global Search

Global Search 為全系統共用搜尋介面。

畫面右上角固定顯示 Search Icon（放大鏡）。

Search Icon 為搜尋入口，

不得隱藏，

方便使用者快速辨識搜尋功能位置。

點擊 Search Icon 後，

展開 Floating Search Toolbar。

Floating Search Toolbar 可整合系統常用導覽功能。

包括：

- Home（首頁）
- Back（上一頁）

以及搜尋功能：

- Keyword Search
- Search Scope
- Search Suggestions
- Recent Search
- Search Result Navigation

Search Scope：

- All
- Folder
- Book
- Lesson
- Page
- Text
- Image
- PDF
- Hotspot
- Dictionary

搜尋結果可直接開啟對應教材或內容。

點擊 Close（✕）後，

僅收合 Floating Search Toolbar。

Search Icon（放大鏡）仍固定顯示於畫面右上角。

Toolbar 每次皆由 Search Icon 展開。

所有畫面皆共用相同搜尋介面與操作流程，

保持一致的使用者體驗。

---

## 5.5 Popup

Popup 應採一致設計。

點擊 Hotspot：

立即顯示 Default Popup。

預設內容：

- Chinese
- KK
- Pronunciation

其他功能皆由 Context Toolbar 開啟。

不得建立不同 Popup 操作流程。

---

## 5.6 Responsive Editing

桌機／筆電：

支援拖曳分隔線，

自由調整：

- Image Area
- Text Area

工作區大小。

手機／平板：

支援雙指縮放（Pinch Zoom）。

系統應依不同裝置提供最佳操作方式。

---

## 5.7 Visual Consistency

所有 UI 元件皆應保持一致視覺風格。

包括：

- Icon
- Button
- Dialog
- Toolbar
- Popup

避免不同模組出現不同設計風格。

---

## 5.8 Accessibility

所有重要功能皆應容易被發現。

例如：

- Search Icon 固定顯示於畫面右上角。
- 主要功能應於適當位置提供明確入口。
- 不得將常用功能隱藏於多層選單。

降低使用者學習成本，

提升操作效率。
---

# 6. Performance Guidelines

## 6.1 Design Principles

所有耗時工作皆應於背景執行（Background Processing）。

不得造成介面凍結（UI Freeze）。

使用者應能清楚知道系統仍在工作。

---

## 6.2 Background Processing

以下工作應採 Background Processing：

- 匯入圖片
- 匯入 PDF
- Camera 拍照
- 圖片最佳化
- 圖片壓縮
- 儲存教材
- AI 處理
- 搜尋

不得阻塞使用者介面。

---

## 6.3 Image Optimization

所有圖片應自動最佳化。

包括：

- Resize
- Compression
- Format Optimization

不得要求使用者自行處理圖片。

---

## 6.4 Large File Handling

大型圖片或 PDF：

應提供：

- Loading Status
- Large File Warning

不得直接造成系統停止回應。

---

## 6.5 Save Performance

教材儲存期間，

系統應保持可回應。

不得因儲存造成程式凍結。

---

## 6.6 Brand Loading Animation

MagicBook 使用品牌角色動畫（Brand Loading Animation）。

不使用傳統 Loading Bar。

Loading Animation：

- 顯示於畫面中央
- 採持續動作動畫
- 約佔畫面 15%
- 工作完成後自動消失

品牌角色可依版本更新替換。

動畫僅提供工作狀態回饋。

不得影響系統功能。

---

## 6.7 Performance Principles

所有背景工作皆應遵循：

- Non-blocking UI
- Background Processing
- Fast Response
- Stable Performance

不得因新增功能降低整體系統效能。

# 7. Data Management Guidelines

## 7.1 Data Principles

所有資料皆應遵循一致的資料管理原則。

包括：

- Unique ID（唯一識別）
- Data Ownership（資料歸屬）
- Data Isolation（資料隔離）
- Data Integrity（資料完整性）

所有資料皆須具有明確 Owner。

---

## 7.2 Workspace Ownership

所有教材皆歸屬於 Workspace。

Workspace 分為：

- Personal Workspace
- Organization Workspace

教材所有權不得因登入裝置或登入地點而改變。

---

## 7.3 Module Independence

各模組應管理自己的資料。

例如：

Book Module

不得直接修改：

- AI Data
- Dictionary Data
- Audio Data

模組之間應透過公開介面交換資料。

---

## 7.4 Teaching Material Protection

教材為使用者資產。

任何功能不得直接修改教材原始內容。

所有互動皆建立於 HTML Overlay。

教材內容保持原貌。

---

## 7.5 Data Expansion

所有新增資料皆應建立於既有資料架構。

不得重新建立第二套資料結構。

保持資料一致性。

---

# 8. Feature Development Guidelines

## 8.1 Development Principles

新增功能皆應符合：

- Teaching Material First
- Complete Product Architecture
- Modular Architecture
- Replaceable Service

不得破壞既有架構。

---

## 8.2 Feature Integration

所有新增功能皆應整合至既有流程。

例如：

Teaching Material

↓

HTML Overlay

↓

Interactive Object

↓

Popup

↓

Dictionary / AI / Audio

不得建立第二套互動流程。

---

## 8.3 Shared Components

若多個模組使用相同功能，

應建立共用元件（Shared Component）。

例如：

- Context Toolbar
- Popup
- Search Toolbar

不得重複開發。

---

## 8.4 Shared Services

若多個模組使用相同服務，

應建立 Shared Service。

例如：

- Authentication
- Save
- Global Search
- Background Processing

避免重複實作。

---

## 8.5 Future Features

新增功能應採擴充（Extension）方式加入。

不得修改產品核心架構。

保持向下相容（Backward Compatibility）。

---

# 9. Coding Principles

## 9.1 Code Quality

所有程式皆應：

- Clear Naming
- Readability
- Reusability
- Maintainability

程式應容易閱讀。

---

## 9.2 Component Design

所有元件皆應：

- Single Responsibility
- Reusable
- Independent

避免大型元件。

---

## 9.3 Hard Coding

避免 Hard Coding。

所有可設定內容皆應配置化（Configuration）。

例如：

- AI Provider
- Dictionary Provider
- Audio Provider

不得直接寫死於程式。

---

## 9.4 Error Handling

所有功能皆應提供：

- Error Message
- Retry
- Recovery

不得因錯誤造成教材遺失。

---

## 9.5 Code Review

所有重大功能完成後，

應完成：

- Self Review
- Functional Testing
- Specification Consistency Review

確認程式與規格一致。

---

# 10. Version Control

## 10.1 Development Process

所有功能皆應採逐步開發。

每次修改皆應保持：

- 可編譯
- 可執行
- 可測試

---

## 10.2 Branch Strategy

重大功能建議使用 Branch 開發。

完成測試後再合併（Merge）。

保持主分支穩定。

---

## 10.3 Documentation Update

任何需求變更後，

應同步更新：

- Product Specification
- MVP Development
- Development Guidelines
- Database Design
- API Design
- AI Design
- Editor Design
- UI Design

所有文件皆須保持一致。

---

## 10.4 Specification Consistency Review

每次完成重大功能後，

皆應進行：

Specification Consistency Review。

確認：

- MVP
- Product Specification
- Development Guidelines
- 其他設計文件

內容一致。

不得互相矛盾。

---

# 11. Change Log

| Version | Date | Description |
|----------|------------|------------------------------------------------|
| 3.0 Draft | 2026-08-02 | Rebuilt Development Guidelines based on MVP 3.0 |
| | | Added Complete Product Architecture principles |
| | | Added Teaching Material First |
| | | Added Replaceable Service architecture |
| | | Added Performance Guidelines |
| | | Added Global Search development rules |
| | | Added Context Toolbar development rules |
| | | Added Background Processing guidelines |
| | | Added Brand Loading Animation guidelines |
| | | Added Specification Consistency Review workflow |
