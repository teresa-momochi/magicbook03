# MagicBook 3.0 Development Guidelines — Version 4.6

Version: 4.6

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-14

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

* 建立一致的產品架構
* 建立一致的開發流程
* 建立一致的 UI 操作方式
* 建立一致的資料管理方式
* 降低模組耦合（Low Coupling）
* 提高可維護性（Maintainability）
* 提高可擴充性（Scalability）
* 避免新增功能時破壞既有架構

MagicBook 採 Complete Product Architecture（完整產品架構）。

MVP（Minimum Viable Product）為目前第一版開發範圍的主要依據。

所有設計文件皆須與已確認的 MVP 規格保持一致。

任何需求變更皆須先確認，再同步更新相關文件。

---

# 2. Core Development Principles

MagicBook 所有開發皆須遵守以下核心原則。

---

## 2.1 Teaching Material First

教材（Teaching Material）永遠是產品核心。

MagicBook 提供互動工具，

不提供教材內容。

任何功能皆不得修改教材原始內容。

教材內容與互動資料應保持分離。

---

## 2.2 Complete Product Architecture

第一版即建立完整產品架構。

所有核心模組皆須建立：

* Data Model
* CRUD
* User Interface
* User Flow

第三方服務可逐步完善，

不得影響產品架構。

---

## 2.3 Architecture First

所有新功能皆建立於既有架構。

不得因新增功能重新設計產品架構。

若需求需要新增能力，

應優先以模組擴充方式處理。

---

## 2.4 Modular Architecture

所有功能皆應建立為獨立模組（Module）。

各模組應：

* 可獨立開發
* 可獨立測試
* 可獨立維護
* 可持續擴充

模組之間應保持低耦合（Low Coupling）。

---

## 2.5 Replaceable Service

MagicBook 不綁定任何第三方服務。

包括：

* AI Provider
* Dictionary Provider
* Audio Provider
* Video Provider

所有第三方服務皆可自由替換。

更換服務不得影響：

* 教材資料
* User Account（使用者帳號）
* 系統架構
* 使用者操作流程

---

## 2.6 Consistent User Experience

所有功能皆應保持一致操作方式。

例如：

* Context Toolbar
* Global Search
* Popup
* CRUD
* Selection
* Navigation

新增功能不得建立另一套操作模式。

---

## 2.7 Specification Consistency

MVP 為第一版開發範圍的主要依據。

任何需求變更後，

必須同步更新受到影響的相關文件。

不得讓正式文件內容彼此矛盾。

文件應依各自職責同步，

不得將所有文件內容簡單複製成完全相同的內容。

---

## 2.8 Reuse Before Reinvent

MagicBook 3.0 所有功能開發皆應遵循：

**Reuse Before Reinvent（先利用，再重新發明）**

在開發任何新功能之前，

必須先確認是否已有成熟且可直接使用的技術能力。

優先評估順序：

1. Operating System（作業系統）既有能力
2. Browser（瀏覽器）既有能力
3. HTML / CSS / JavaScript 原生能力
4. Mature Open Source Library（成熟開源函式庫）
5. Mature Third-party Tool / Service（成熟第三方工具／服務）
6. 以上皆無法滿足需求時，才評估 Custom Development（自行開發）

### Engineering Rule

不要因為「可以自己做」，

就直接自行建立新的系統。

在提出 Custom Development（自行開發）之前，

必須先確認：

> 「這個功能是否已經有現成技術可以直接使用？」

如果已有成熟方案：

→ 優先 Reuse / Integration（重用／整合）

只有在現有技術確實無法滿足 MagicBook 的產品需求時：

→ 才進入 Custom Development（自行開發）評估。

### Example — Camera

Camera（相機）是本原則的代表案例。

MagicBook 不建立自己的 Camera System（相機系統）。

老師使用裝置原生相機取得照片，

MagicBook 只負責：

Image Import（圖片匯入）

MagicBook 不因為需要照片，

而自行建立：

* Camera System
* Camera Preview
* Exposure Control
* Focus Control
* ImageCapture
* getUserMedia

MagicBook 應優先使用裝置、作業系統與瀏覽器已提供的能力。

### Applicability

Reuse Before Reinvent 不只適用於 Camera。

所有新功能皆適用。

例如：

* Camera → 使用裝置原生相機
* File Import → 使用瀏覽器原生檔案選擇
* Image Editing → 優先使用成熟影像處理能力
* Image Processing → 優先使用成熟函式庫
* PDF Processing → 優先使用成熟 PDF 工具
* AI / OCR → 採 Replaceable Service Architecture（可替換服務架構）
* Browser Features → 優先使用瀏覽器既有能力

MagicBook 的責任不是重新發明已經存在的工具，

而是把成熟技術組合成：

簡單、穩定、容易使用的教師工具。

### Product Principle

MagicBook 應將複雜度藏在系統內部。

使用者不需要理解：

* Operating System
* Browser
* API
* Camera
* OCR
* AI
* Image Processing

使用者只需要完成自己的工作。

因此：

> **先使用世界已經發明好的東西，再決定 MagicBook 真正需要自己發明什麼。**

---

## 2.9 Use Existing Human Understanding First

MagicBook 3.0 所有產品與功能開發皆應遵循：

> **Use Existing Human Understanding First（優先利用使用者既有理解）**

MagicBook 不應要求使用者為了使用產品，而重新學習一套完全陌生的操作邏輯。

產品設計應優先利用使用者已經存在的：

* 生活經驗（Life Experience）
* 操作習慣（Interaction Habits）
* 心理模型（Mental Model）
* 常見符號認知（Common Symbol Understanding）
* 既有軟體使用經驗（Existing Software Experience）

這項原則稱為：

> **借力使力（Use Existing Human Understanding First）**

### Product Principle

MagicBook 的目標不是讓使用者「學會 MagicBook」。

而是：

> **讓使用者利用自己原本就懂的事情，自然地學會使用 MagicBook。**

例如：

* 🔒 Lock（鎖頭）→ Lock / Unlock（鎖定／解鎖）
* 🗑️ Trash（垃圾桶）→ Delete（刪除）
* 🔍 Search（放大鏡）→ Search（搜尋）
* ▶️ Play（播放符號）→ Play（播放）
* ← Back（返回）→ Back（返回）
* Drag（拖曳）→ 將物件移動到另一個位置

這些操作不需要重新教育使用者。

MagicBook 應優先借用使用者已經理解的概念，再將 MagicBook 的功能接在這些既有理解之上。

### Human Mental Model First

當設計一項新功能時，應先問：

> **「第一次看到這個功能的使用者，在沒有閱讀說明的情況下，能不能合理猜到下一步怎麼做？」**

如果可以：

→ 優先採用。

如果不可以：

→ 先確認是否存在可以借用的既有生活概念、操作習慣或常見 UI（使用者介面）模式。

只有在沒有適當既有模式可以使用時，才建立新的操作方式。

### UX Guidance: Show the Next Step

MagicBook 的 UX（使用者體驗）不只是「功能可以操作」，而是要讓使用者在操作過程中，**自然知道下一步可以做什麼、應該做什麼**。

UI（使用者介面）的設計應主動提供清楚的操作線索，而不是把功能藏在畫面中，讓使用者自己搜尋「可能在哪裡」「可能要按哪裡」或「這個圖示到底代表什麼」。

因此：

* **UI 應告訴使用者下一步怎麼做，而不是讓使用者猜。**
* **主要操作應具有清楚的視覺層級（Visual Hierarchy）。**
* **下一步可以做什麼，應在畫面中容易被發現（Discoverable）。**
* **重要功能不應依賴使用者到處尋找才能發現。**
* **操作流程應符合使用者原本的心理模型（Mental Model）。**
* **如果使用者經常需要問「我要按哪裡？」代表 UX 仍有改善空間。**

### UI and UX Relationship

UI 與 UX 必須一起考慮，但兩者不是同一件事：

**UI（使用者介面）**回答：

> **「畫面上要怎麼呈現，讓使用者看得懂下一步？」**

**UX（使用者體驗）**回答：

> **「整個使用過程是否自然、順暢、可預測，不需要使用者一直猜？」**

因此，MagicBook 的設計標準不是：

> 「使用者最後有沒有找到功能？」

而是：

> **「使用者是否能在正確的時間，自然發現正確的下一步？」**

讓使用者「找得到」只是最低標準；

讓使用者「知道下一步怎麼走」，才是 MagicBook 應追求的 UX。

### Do Not Create Unnecessary Learning Cost

不得因為工程上可以建立新的操作方式，就要求使用者學習新的操作方式。

應避免：

* 為相同功能建立新的操作模式
* 使用只有 MagicBook 自己理解的特殊符號
* 使用不符合一般使用者認知的操作方式
* 將工程實作概念直接暴露給使用者
* 要求使用者閱讀說明才能完成基本操作

MagicBook 的技術可以很複雜，

但：

> **使用者不應承擔不必要的技術學習成本。**

### Engineer and User Perspective

MagicBook 的產品開發必須同時考慮兩個不同層次：

**Engineering Perspective（工程視角）**

> 電腦如何完成這項功能？

**User Perspective（使用者視角）**

> 人看到這項功能時，會怎麼理解？

兩者都必須成立。

功能「可以運作」不代表使用者「知道怎麼使用」。

因此：

> **Functional Correctness（功能正確） ≠ Usability（可用性）**

工程師應負責讓系統正確運作。

產品設計則必須確保使用者能夠理解並自然操作。

### Design Decision Rule

任何新功能進入開發前，應依以下順序判斷：

1. **使用者原本是否已經知道這件事情？**
2. **是否可以借用既有生活經驗？**
3. **是否可以借用既有操作習慣？**
4. **是否可以使用常見 UI 模式？**
5. **如果不能，是否真的有必要建立新的操作方式？**

只有在前面的方法都無法滿足需求時，才建立新的操作邏輯。

### Relationship with Reuse Before Reinvent

**Reuse Before Reinvent（先利用，再重新發明）**主要處理：

> **技術層面的借力。**

例如：

* 作業系統（Operating System）
* 瀏覽器（Browser）
* HTML / CSS / JavaScript
* 成熟函式庫（Mature Library）
* 第三方服務（Third-party Service）

而：

**Use Existing Human Understanding First（優先利用使用者既有理解）**主要處理：

> **人與產品互動層面的借力。**

兩者共同形成 MagicBook 的「借力使力」原則：

> **技術上，優先使用世界已經發明好的能力。**
>
> **操作上，優先使用人已經理解的能力。**

MagicBook 不應重新發明已經存在的技術，

也不應不必要地重新教育已經存在的人類認知。

### Final Principle

> **Behind the interface, technology may be complex.**
> **In front of the interface, understanding should be simple.**

> **介面背後的技術可以很複雜，**
> **但介面前面的理解應該很簡單。**

MagicBook 的責任，是將複雜技術與複雜系統整合在背後，

讓使用者可以依照自己原本的理解，自然完成工作。

**借用人已經會的，而不是要求人重新學會。**

---

# 3. Architecture Principles

## 3.1 Unified Architecture

MagicBook 採統一產品架構（Unified Product Architecture）。

所有功能皆建立於相同架構。

不得因單一功能建立第二套系統架構。

---

## 3.2 Core Architecture

MagicBook 採以下核心資料架構：

User Account（使用者帳號）

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

*

Text Area

*

HTML Overlay

↓

Hotspot

↓

Popup

↓

Dictionary / AI / Audio / Video / Navigation

Folder 為 Book Library 的分類工具。

Book 可以：

* 直接存在於 Book Library 根目錄
* 放入 Folder

使用者可自行決定是否使用 Folder。

Folder 不得被視為 Book 存在的必要條件。

---

## 3.3 Separation of Teaching Material and Interaction

教材（Teaching Material）與互動（Interaction）完全分離。

教材負責：

* 教材內容
* 教材版面
* 教材呈現

互動負責：

* HTML Overlay
* Hotspot
* Popup
* Dictionary
* AI
* Audio
* Video
* Navigation

任何互動功能皆不得修改教材原始內容。

---

## 3.4 HTML Overlay Principle

HTML Overlay 為獨立互動層（Interaction Layer）。

建立於教材之上。

可覆蓋：

* Image
* PDF

所有互動皆建立於 HTML Overlay。

不得直接建立於教材本體。

---

## 3.5 Shared Services

共用功能應建立為 Shared Service（共用服務）。

例如：

* Authentication
* Context Toolbar
* Global Search
* Save
* Background Processing

不得於各模組重複開發相同功能。

---

## 3.6 Replaceable Services

所有第三方服務皆應建立抽象介面（Interface）。

包括：

* AI
* Dictionary
* Audio
* Video

不得直接綁定特定 Provider。

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

* AI
* Dictionary
* Audio
* Video

保持模組職責單純。

---

# 4. Module Design

## 4.1 Module Principles

所有功能皆應建立為獨立模組（Independent Module）。

每個模組皆應：

* 可獨立開發
* 可獨立測試
* 可獨立維護
* 可持續擴充

模組不得因依賴另一個模組的內部實作而失去獨立性。

---

## 4.2 Core Modules

MagicBook 第一版建立以下核心模組：

* Authentication
* User Account
* Book Library
* Folder
* Book
* Lesson
* Page
* Image Area
* Text Area
* HTML Overlay
* Hotspot
* Popup
* Dictionary
* AI
* Audio
* Video
* Navigation
* Reading Mode
* Global Search
* Context Toolbar
* Save
* Background Processing
* Brand Loading Animation

所有核心模組皆須完成基本資料架構。

---

## 4.3 UI Modules

所有 UI 模組皆應遵循一致設計。

例如：

* Context Toolbar
* Popup
* Search Toolbar
* Search Icon
* Loading Animation

不得建立不同操作方式。

---

## 4.4 Service Modules

共用功能應建立為 Service Module。

包括：

* Authentication Service
* Global Search Service
* Save Service
* Background Processing Service
* Loading Animation Service

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

不得修改既有核心架構。

應以擴充（Extension）方式加入。

例如：

新增：

* Dictionary Provider
* AI Provider
* Audio Provider
* Video Provider

皆應建立於既有模組。

不得重新設計產品架構。

---

## 4.7 Module Naming

所有模組命名皆應一致。

例如：

* User Account Module
* Book Library Module
* Folder Module
* Book Module
* Lesson Module
* Page Module
* Image Area Module
* Text Area Module
* HTML Overlay Module
* Hotspot Module
* Popup Module
* Dictionary Module
* AI Module
* Audio Module
* Video Module
* Navigation Module
* Reading Module
* Global Search Module

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

移除 Video，

教材其他核心功能仍應正常運作。

模組之間應保持獨立性。

---

# 5. UI Development Guidelines

## 5.1 Design Principles

所有使用者介面（User Interface）皆應遵循一致的設計原則。

包括：

* 一致的版面配置
* 一致的操作流程
* 一致的命名方式
* 一致的互動模式

新增功能不得重新建立另一套 UI。

### 5.1.1 Next-Step Guidance

UI（使用者介面）應讓使用者容易理解下一步，而不是要求使用者在畫面中搜尋可能的操作位置。

設計時應優先確認：

* 使用者目前是否知道自己所在的狀態
* 使用者是否看得到下一步可以做什麼
* 主要操作是否具有清楚的視覺層級（Visual Hierarchy）
* 常用功能是否容易被發現（Discoverable）
* 使用者是否需要依靠猜測才能完成基本操作

> **讓使用者「找得到」只是最低標準；讓使用者「知道下一步怎麼走」，才是 MagicBook 應追求的 UX（使用者體驗）。**

---

## 5.2 Consistent User Experience

所有畫面皆應保持相同操作邏輯。

例如：

* Select
* Move
* Resize
* Save
* Delete
* Search
* Navigation

不同模組不得使用不同操作方式完成相同工作。

---

## 5.3 Context Toolbar

Context Toolbar 為全系統共用工具列。

所有可編輯物件共用：

* Image
* Text
* HTML Overlay
* Hotspot

Context Toolbar 應支援：

* Floating
* Auto Show
* Auto Hide
* Draggable
* Dockable

Toolbar 不得遮蔽教材主要內容。

---

## 5.4 Global Search

Global Search 為全系統共用搜尋介面。

畫面右上角固定顯示 Search Icon（放大鏡）。

Search Icon 為搜尋入口。

Search Icon 不得隱藏。

使用者不需要猜測搜尋功能的位置。

點擊 Search Icon 後，

展開 Floating Search Toolbar。

Floating Search Toolbar 可整合系統常用導覽功能。

包括：

* Home（首頁）
* Back（上一頁）

以及搜尋功能：

* Keyword Search
* Search Scope
* Search Suggestions
* Recent Search
* Search Result Navigation

其中：

* Home
* Back

屬於 Navigation（導覽）功能，

不是 Search 功能。

Search Scope：

* All
* Folder
* Book
* Lesson
* Page
* Text
* Image
* PDF
* Hotspot
* Dictionary

搜尋結果可直接開啟對應教材或內容。

搜尋可從使用者目前所在畫面開始。

搜尋結果可導向實際相關內容。

不限制使用者只能看到單一資料層級的結果。

點擊 Close（✕）後，

僅收合 Floating Search Toolbar。

Search Icon（放大鏡）仍固定顯示於畫面右上角。

Toolbar 每次皆由 Search Icon 展開。

不記錄 Toolbar 上次位置。

所有畫面皆共用相同搜尋介面與操作流程。

---

## 5.5 Popup

Popup 應採一致設計。

點擊 Hotspot：

立即顯示 Default Popup。

預設內容：

* Chinese
* KK
* Pronunciation

其他功能皆由 Context Toolbar 開啟。

不得建立不同 Popup 操作流程。

---

## 5.6 Responsive Editing

桌機／筆電：

支援拖曳分隔線，

自由調整：

* Image Area
* Text Area

工作區大小。

手機／平板：

支援雙指縮放（Pinch Zoom）。

系統應依不同裝置提供適當操作方式。

---

## 5.7 Visual Consistency

所有 UI 元件皆應保持一致視覺風格。

包括：

* Icon
* Button
* Dialog
* Toolbar
* Popup

避免不同模組出現不同設計風格。

---

## 5.8 Accessibility

所有重要功能皆應容易被發現。

例如：

* Search Icon 固定顯示於畫面右上角
* Reading Mode 提供單一 Edit Button（編輯按鈕）作為進入 Editor Mode（編輯模式）的明確入口
* 主要功能應於適當位置提供明確入口
* 常用功能不得被完全隱藏而無明確入口

降低使用者學習成本。

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

* 匯入圖片
* 匯入 PDF
* 圖片最佳化
* 圖片壓縮
* 儲存教材
* AI 處理
* 搜尋
* 其他耗時工作

不得阻塞使用者介面。

---

## 6.3 Image Optimization

所有圖片應自動最佳化。

包括：

* Resize
* Compression
* Format Optimization

不得要求使用者自行處理圖片。

---

## 6.4 Large File Handling

大型圖片或 PDF：

應提供：

* Loading Status
* Large File Warning

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

* 顯示於畫面中央
* 採持續動作動畫
* 約佔畫面 15%
* 工作完成後自動消失

品牌角色可依工作內容播放不同動畫。

例如：

* 小松鼠奔跑
* 小狐狸奔跑
* 小企鵝搬教材
* 貓頭鷹飛行

品牌角色可依節日、活動或版本更新替換。

可採 Random Character（隨機角色）機制。

品牌角色以動作呈現系統工作狀態。

不得以大量文字取代動畫。

---

## 6.7 Performance Principles

所有背景工作皆應遵循：

* Non-blocking UI
* Background Processing
* Fast Response
* Stable Performance

不得因新增功能降低整體系統效能。

---

# 7. Data Management Guidelines

## 7.1 Data Principles

所有資料皆應遵循一致的資料管理原則。

包括：

* Unique ID（唯一識別）
* Data Ownership（資料歸屬）
* Data Isolation（資料隔離）
* Data Integrity（資料完整性）

所有資料皆須具有明確 Owner。

---

## 7.2 User Account Ownership

所有個人教材資料皆直接歸屬於 User Account（使用者帳號）。

核心資料關係：

User Account（使用者帳號）
↓
Book Library（教材庫）
↓
Folder（資料夾）
↓
Book（教材）
↓
Lesson（課程）
↓
Page（頁面）

MagicBook 3.0 不使用 Workspace（工作空間）作為教材資料根層級。

教材資料不得因：

* 登入裝置
* 登入地點
* 使用者更換裝置

而改變其 User Account（使用者帳號）歸屬。

User Account（使用者帳號）由 Authentication（驗證）與 Supabase 管理。

## 7.3 Billing and Access Boundary

Billing System（計費系統）與 Supabase 的職責必須分離。

Billing System 負責：

* 個人方案
* 團體方案
* Payment（付款）
* Renewal（續約）
* Expiration（到期）
* 團體邀請
* 團體人數
* Pricing（價格）
* Payment Cycle（付款週期）
* 商業規則

Supabase 負責：

* User Account（使用者帳號）
* Authentication（驗證）
* Session（工作階段）
* User ID（使用者識別）
* 個人教材資料
* Access Status（使用權狀態）
* Trial Used（試用是否已使用）

Supabase 不建立或管理：

* Workspace Entity
* Group Entity（團體實體）
* Group ID
* 團主
* 團員
* 邀請關係
* 價格
* 付款資料
* 付款週期
* 付款來源

Billing System 透過 Webhook（網路回呼）通知 Supabase 使用權狀態：

User ID → Active / Inactive

價格不得寫死於程式或本開發規範。

---

## 7.4 Account Access Lifecycle

Access Status（使用權狀態）僅使用：

* Active
* Inactive

Inactive 不建立唯讀模式（Read Only Mode）、Archive Mode 或 Temporary Access。

Trial（免費試用）：

* 每個 User Account 一生一次
* Trial Used 用於記錄是否已使用

使用權到期後：

* 到期日起保留資料 90 天
* 90 天內重新取得使用權：原資料保留並可繼續使用
* 90 天後仍未重新取得使用權：清除資料

Webhook（網路回呼）同步失敗時：

1. 第一次失敗後 10 分鐘重試
2. 第二次仍無回應，通知管理者／PM
3. 使用者顯示「工程忙線中，系統正在處理中，請稍候再試。」

Database Internal Error（資料庫內部錯誤）不得要求使用者重新付款。

User 自行更換 Email 或重新註冊時，視為新的 User Account；系統不自動合併帳號或搬移資料。

## 7.5 Module Independence

各模組應管理自己的資料。

例如：

Book Module

不得直接修改：

* AI Data
* Dictionary Data
* Audio Data
* Video Data

模組之間應透過公開介面交換資料。

---

## 7.6 Teaching Material Protection

教材為使用者資產。

任何功能不得直接修改教材原始內容。

所有互動皆建立於 HTML Overlay。

教材內容保持原貌。

---

## 7.7 Folder and Book Data

Folder 為 Book Library 的分類資料。

Folder 可包含：

* Folder
* Book

Folder 支援：

* Create
* Rename
* Delete
* Move
* Reorder

Book 可：

* 存在於 Book Library 根目錄
* 放入 Folder
* 在 Folder 之間移動

Folder 不儲存教材內容。

Book 儲存教材本身。

Folder 僅負責分類與管理。

---

## 7.8 Data Expansion

所有新增資料皆應建立於既有資料架構。

不得重新建立第二套資料結構。

保持資料一致性。

---

## 7.9 Storage Lifecycle Management

MagicBook 應考慮教材圖片與其他使用者檔案長期累積所造成的 Storage（儲存空間）管理問題。

老師可能會持續匯入、下載或產生圖片，但其中部分檔案在使用一段時間後可能不再使用。

因此，儲存空間管理不得只在容量即將用滿時才處理，而應建立完整的 Storage Lifecycle（儲存生命週期）管理原則。

### Storage Principles

* 系統應能辨識長期未使用的檔案。
* 系統可在適當時機提醒使用者整理長期未使用的檔案。
* 使用者應能查看即將被整理的檔案，再自行決定是否刪除。
* 不得因檔案長期未使用而直接自動刪除教材或使用者資產。
* 刪除操作應具備可恢復機制（Recovery / Trash），避免誤刪造成教材遺失。
* 暫存資料（Temporary Data）、Cache（快取）與使用者教材資產應分開管理，不得混為同一類資料。
* 儲存空間使用量與容量狀態應可被使用者理解。
* 若產品未來採容量型方案，容量規則應由正式商業規格定義，不得在本開發規範中寫死價格或未確認的容量數值。

### User Experience Principle

Storage Management（儲存管理）不應要求老師理解技術性的 Storage、Cache 或 File Lifecycle 概念。

使用者看到的應是容易理解的訊息，例如：

> 「有一些圖片已經很久沒有使用，可以整理。」

而不是要求使用者自行判斷技術資料。

儲存空間管理應遵循：

> **系統負責發現與整理建議，使用者負責最後的刪除決定。**

### Automatic Deletion Rule

MagicBook 不得僅因檔案長期未使用、儲存空間接近上限或方案到期，而直接自動刪除仍屬於使用者資產的教材檔案。

任何永久刪除規則皆須先經正式產品規格確認。

---

# 8. Feature Development Guidelines

## 8.1 Development Principles

新增功能皆應符合：

* Teaching Material First
* Complete Product Architecture
* Modular Architecture
* Replaceable Service
* Consistent User Experience
* Reuse Before Reinvent
* Use Existing Human Understanding First
* Performance

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

Dictionary / AI / Audio / Video / Navigation

不得建立第二套互動流程。

---

## 8.3 Shared Components

若多個模組使用相同功能，

應建立共用元件（Shared Component）。

例如：

* Context Toolbar
* Popup
* Search Toolbar
* Search Icon

不得重複開發。

---

## 8.4 Shared Services

若多個模組使用相同服務，

應建立 Shared Service。

例如：

* Authentication
* Save
* Global Search
* Background Processing
* Loading Animation

避免重複實作。

---

## 8.5 Search Integration

所有需要搜尋能力的模組，

應使用 Global Search。

不得建立另一套獨立搜尋介面。

搜尋入口統一使用：

Search Icon

↓

Floating Search Toolbar

Search Icon 固定位於畫面右上方。

關閉 Toolbar 後，

Search Icon 仍保持顯示。

---

## 8.6 Navigation Integration

Home、Back 等系統導覽功能屬於 Navigation。

若與 Global Search 共用同一個 Toolbar，

不得將 Home、Back 定義為 Search 功能。

共用 Toolbar 不代表功能職責相同。

---

## 8.7 Teaching Material Protection

新增互動功能：

不得直接修改：

* Image Area
* Text Area
* PDF
* Imported Image（已匯入圖片）

應建立於 HTML Overlay 或既有互動架構。

---

## 8.8 Future Features

新增功能應採擴充（Extension）方式加入。

不得修改產品核心架構。

保持向下相容（Backward Compatibility）。

未經確認的新功能不得直接加入 MVP。

---

## 8.9 Storage Management Integration

任何涉及圖片、PDF、教材資產或其他使用者檔案的新增功能，都必須考慮 Storage Lifecycle Management（儲存生命週期管理）。

開發前應確認：

1. 此資料是否屬於使用者資產？
2. 此資料是否為暫存資料或 Cache？
3. 使用者是否能在未來找到並重新使用此資料？
4. 長期未使用時，系統是否需要提供整理提醒？
5. 刪除後是否需要 Recovery / Trash（恢復／垃圾桶）機制？
6. 是否會影響使用者的 Storage Capacity（儲存容量）？

不得因新增功能而無限制累積不必要的檔案。

儲存管理功能本身也必須遵循 Use Existing Human Understanding First（優先利用使用者既有理解）：

> **不要讓老師自己管理垃圾；讓系統幫老師發現可能不再需要的資料，再由老師決定。**

---

# 9. Coding Principles

## 9.1 Code Quality

所有程式皆應：

* Clear Naming
* Readability
* Reusability
* Maintainability

程式應容易閱讀。

---

## 9.2 Component Design

所有元件皆應：

* Single Responsibility
* Reusable
* Independent

避免大型元件。

---

## 9.3 Hard Coding

避免 Hard Coding。

所有可設定內容皆應配置化（Configuration）。

例如：

* AI Provider
* Dictionary Provider
* Audio Provider
* Video Provider

不得直接寫死於程式。

---

## 9.4 Error Handling

所有功能皆應提供：

* Error Message
* Retry
* Recovery

不得因錯誤造成教材遺失。

若發生：

* Upload Failure
* Save Failure
* Network Failure
* Processing Failure

系統應盡可能保留目前使用者操作內容。

---

## 9.5 Code Review

所有重大功能完成後，

應完成：

* Self Review
* Functional Testing
* Specification Consistency Review

確認程式與正式規格一致。

---

# 10. Version Control

## 10.1 Development Process

所有功能皆應採逐步開發。

每次修改皆應保持：

* 可編譯
* 可執行
* 可測試

---

## 10.2 Branch Strategy

重大功能建議使用 Branch 開發。

完成測試後再合併（Merge）。

保持主分支穩定。

---

## 10.3 Documentation Update

任何需求變更後，

應同步更新受到影響的正式文件。

包括視需求涉及：

* Product Specification
* MVP Development
* Development Guidelines
* Database Design
* API Design
* AI Design
* Editor Design
* UI Design

尚未進入實際設計或開發階段的文件，

不需要為了同步而提前建立完整技術規格。

尤其 Database Design（資料庫設計）與 API Design（API 設計），

應依 MVP 實際開發進度建立。

所有已建立文件皆須保持一致。

---

## 10.4 Specification Consistency Review

每次完成重大功能後，

皆應進行：

Specification Consistency Review。

確認：

* MVP
* Product Specification
* Development Guidelines
* 其他已建立設計文件

內容一致。

不得互相矛盾。

---

## 10.5 GitHub as Official Source

GitHub Repository 為 MagicBook 3.0 正式文件來源。

正式開發文件以：

main branch

上的最新版本為準。

聊天室中的舊版本、舊檔案或先前傳送的文件，

不得作為正式開發依據。

若工程師發現文件版本不一致，

應：

1. 停止依自己的推測修改規格。
2. 指出文件名稱。
3. 指出章節。
4. 提供衝突內容。
5. 等待 Product Manager 確認。

確認後再繼續開發。

---

## 10.6 Document Version

每次正式文件重大更新皆應更新：

* Version
* Last Update
* Change Log

避免工程師無法判斷目前使用版本。

---

# 11. Change Log

| Version | Date | Description |
| ------- | ---- | ----------- |

| 4.6 Draft | 2026-08-14 | Added Storage Lifecycle Management（儲存生命週期管理） principles for long-term unused files, user-controlled cleanup, recovery, and separation of user assets from temporary data and cache |
| 4.5 Draft | 2026-08-14 | Added Use Existing Human Understanding First（優先利用使用者既有理解） as a Core Development Principle; integrated the 借力使力 principle, Mental Model, UI/UX next-step guidance, and reduced learning-cost requirements |
| 4.4 Draft | 2026-08-09 | Synchronized User Account, Billing, Access Status, Trial, 90-day retention, and Webhook boundaries with Product Specification 3.4 and MVP Development 3.0; removed Workspace as the core data root |
| 4.3 Draft | 2026-08-09 | Synchronized the confirmed Reading Mode → Editor Mode single Edit Button entry; no new feature, data model, or scope added |
| 4.2 Draft | 2026-08-09 | Synchronized Camera terminology with the confirmed Image Import architecture; retained Reuse Before Reinvent and existing development principles |
| 4.1 Draft | 2026-08-08 | Added Reuse Before Reinvent as a Core Development Principle |
| 4.0 Draft | 2026-08-08 | Synchronized Development Guidelines with MVP 2.1 and Product Specification 3.1 |

---

### Core Modules

正式納入：

* Video
* Navigation
* Save
* Background Processing
* Brand Loading Animation

---

### Folder / Book Library

確認：

* Folder 為 Book Library 正式分類功能
* Folder 支援 Create
* Folder 支援 Rename
* Folder 支援 Delete
* Folder 支援 Move
* Folder 支援 Reorder
* Folder 支援 Nested Folder
* Folder 支援 Drag & Drop Sorting

確認：

Book 可以直接存在於 Book Library 根目錄。

Book 也可以放入 Folder。

使用者可自行決定是否使用 Folder。

---

### Global Search

重新確認：

* Search Icon 固定於畫面右上方
* Search Icon 不隱藏
* 點擊 Search Icon 展開 Floating Search Toolbar
* Close 後 Search Icon 仍保留
* Home、Back 屬於 Navigation
* Home、Back 不是 Search 功能
* Search Scope 包含 All、Folder、Book、Lesson、Page、Text、Image、PDF、Hotspot、Dictionary
* 搜尋結果可導向實際相關內容
* 不記錄 Toolbar 上次位置

---

### Performance

確認：

* Background Processing
* Non-blocking UI
* Image Optimization
* Image Compression
* Large File Handling

為共同開發要求。

---

### Brand Loading Animation

確認：

* 顯示於畫面中央
* 約佔畫面 15%
* 採持續動作動畫
* 工作完成後自動消失
* 不使用傳統 Loading Bar
* 可使用品牌動物角色
* 可依工作內容、節日或版本更新替換

---

### Exercise

Exercise 不屬於 MagicBook 3.0 MVP。

Development Guidelines 不建立：

* Exercise Module
* Exercise CRUD
* Exercise Popup
* Exercise Rendering
* Exercise User Flow

MagicBook 3.0 定位為：

Interactive Teaching Material Tool（互動教材工具）。

不包含：

Exercise / Exam Authoring System（練習／考卷製作系統）。

---

### Documentation Synchronization

正式規格變更後，

應進行 Specification Consistency Review。

GitHub main branch 上的最新正式文件，

為工程師開發依據。

聊天室中的舊文件不得作為正式開發依據。

Database Design、API Design 等技術文件，

依 MVP 實際開發進度建立，

不提前為了文件同步而建立。

---

### Reuse Before Reinvent

新增：

**Reuse Before Reinvent（先利用，再重新發明）**

正式成為 MagicBook 3.0 Core Development Principles（核心開發原則）。

確認：

* 優先使用 Operating System（作業系統）既有能力
* 優先使用 Browser（瀏覽器）既有能力
* 優先使用 HTML / CSS / JavaScript 原生能力
* 優先使用成熟 Open Source Library（開源函式庫）
* 優先使用成熟 Third-party Tool / Service（第三方工具／服務）
* 以上皆無法滿足需求時，才評估 Custom Development（自行開發）

Camera（相機）案例確認：

MagicBook 不建立自己的 Camera System（相機系統）。

使用者使用裝置原生相機取得照片。

MagicBook 負責 Image Import（圖片匯入）。

此原則適用於所有新功能，不限於 Camera。

---

### Use Existing Human Understanding First

新增：

**Use Existing Human Understanding First（優先利用使用者既有理解）**

正式成為 MagicBook 3.0 Core Development Principles（核心開發原則）。

確認：

* 優先利用使用者既有的生活經驗、操作習慣與心理模型
* 優先使用使用者已熟悉的符號與操作模式
* 新功能開發前先確認使用者能否在沒有說明的情況下合理猜到下一步
* UI 應提供清楚的下一步操作線索，不讓使用者在畫面中搜尋可能的操作位置
* UX 應降低使用者猜測、尋找與重新學習的成本
* Functional Correctness（功能正確）不等同於 Usability（可用性）
* 技術複雜度應藏在系統內部，不應轉嫁成使用者的學習成本

「借力使力」正式定義為兩個層面：

**技術層面：** Reuse Before Reinvent（先利用，再重新發明）

**人機互動層面：** Use Existing Human Understanding First（優先利用使用者既有理解）

最終原則：

> **介面背後的技術可以很複雜，但介面前面的理解應該很簡單。**

> **借用人已經會的，而不是要求人重新學會。**
