# MagicBook 3.0 Database Design - Version: 2.0

Version: 2.0

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-09

---

# Table of Contents

0. Database Design Purpose
1. Database Design Principles
2. Data Architecture Overview
3. Core Data Hierarchy
4. User Account and Access
5. Book Library
6. Folder
7. Book
8. Lesson
9. Page
10. Content Architecture
11. Image Area
12. Text Area
13. HTML Overlay
14. Hotspot
15. AI and Processing Data
16. Relationship Rules
17. Data Ownership and Isolation
18. Data Persistence Rules
19. Database Implementation Rules
20. Future Extension
21. Change Log

---

# 0. Database Design Purpose

本文件定義 MagicBook 3.0 的資料庫設計（Database Design）。

本文件的目的，是建立 MagicBook 3.0 的核心資料架構（Data Architecture）與資料關係（Data Relationships）。

本文件不負責重新定義產品功能。

產品功能以 Product Specification（產品規格）為準。

MVP 開發範圍以 MVP Development（MVP 開發規格）為準。

開發順序以 Roadmap（開發路線圖）為準。

工程共通原則以 Development Guidelines（開發規範）為準。

## 0.1 Database Design Scope

本文件主要定義：

- Data Hierarchy（資料階層）
- Entity Relationship（實體關係）
- Data Ownership（資料歸屬）
- Data Separation（資料分離）
- Core Data Boundaries（核心資料邊界）
- Persistence Rules（資料持久化規則）

本文件目前不提前鎖定所有：

- Database Field（資料庫欄位）
- Index（索引）
- SQL Implementation（SQL 實作）
- Performance Tuning（效能調校）
- Provider-specific Schema（特定服務供應商專用資料結構）

上述細節應依實際 MVP Development（MVP 開發）需求與已確認規格逐步決定。

---

# 1. Database Design Principles

## 1.1 Teaching Material First

教材（Teaching Material）是 MagicBook 的核心資料。

資料庫設計必須以教材架構為中心。

核心教材架構：

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

## 1.2 Complete Product Architecture

MagicBook 3.0 採用 Complete Product Architecture（完整產品架構）。

資料庫必須支援完整核心產品架構，而不是只為單一功能建立孤立資料表。

## 1.3 Modular Data Architecture

資料架構（Data Architecture）必須維持模組化。

不同模組的資料責任必須清楚分離，例如：

- Book Data（教材資料）
- Page Data（頁面資料）
- Image Data（圖片資料）
- Text Data（文字資料）
- Interaction Data（互動資料）
- AI Processing Data（AI 處理資料）

不得因單一功能將不同責任混合成不可維護的資料結構。

## 1.4 Data Separation

教材內容與互動資料必須分離。

Image Area（圖片區）與 HTML Overlay（HTML 疊加層）屬於不同資料責任。

HTML Overlay（HTML 疊加層）不應直接修改教材底圖資料。

## 1.5 User Account Data Ownership

所有使用者資料必須具有明確的 Data Ownership（資料歸屬）。

資料必須可以判斷屬於哪一個 User Account（使用者帳號）。

不同 User Account（使用者帳號）的資料不得互相混用。

## 1.6 Reuse Before Reinvent

Database Design（資料庫設計）亦遵循 Reuse Before Reinvent（先利用現有技術，再考慮自行開發）。

資料庫實作優先使用已確認的：

- Existing Database Capability（既有資料庫能力）
- Existing Authentication（既有身分驗證）
- Existing Storage（既有儲存能力）
- Existing Security Rules（既有安全規則）

不得為了單一功能建立不必要的自訂資料系統。

---

# 2. Data Architecture Overview

## 2.1 Core Data Hierarchy

MagicBook 3.0 的核心教材資料關係：

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

Folder（資料夾）為可選的組織層。

Book（教材）可以：

- 位於 Book Library（教材庫）根目錄
- 位於 Folder（資料夾）內

使用者不需要建立 Folder（資料夾）才能使用 Book（教材）。

## 2.2 Page Content Architecture

Page（頁面）是教材內容的主要容器。

Page（頁面）可以包含：

- Image Area（圖片區）
- Text Area（文字區）
- HTML Overlay（HTML 疊加層）

## 2.3 Interaction Architecture

HTML Overlay（HTML 疊加層）負責互動資料。

互動資料可以包含：

- Hotspot（熱點）
- Popup（彈出內容）
- 其他已確認的 Interactive Object（互動物件）

互動資料必須與教材底圖資料保持分離。

## 2.4 Processing Architecture

AI（人工智慧）與 Image Processing（影像處理）產生的中間資料，不應直接成為第二份教材資產。

Processing Data（處理資料）主要服務於：

- OCR（光學字元辨識）
- AI（人工智慧）
- Hotspot Generator（Hotspot 產生器）

處理完成後，只有經確認需要保存的產品資料才進入正式資料結構。

---

# 3. Core Data Hierarchy

## 3.1 User Account

User Account（使用者帳號）是 MagicBook 個人教材資料的最上層歸屬單位。

User Account（使用者帳號）可以對應：

- Book Library（教材庫）
- Folder（資料夾）
- Book（教材）
- Lesson（課程）
- Page（頁面）
- Related Content（相關內容）
- Related Interaction Data（相關互動資料）

每一份正式教材資料都必須能追溯至所屬 User Account（使用者帳號）。

## 3.2 Book Library

Book Library（教材庫）是使用者管理教材的主要入口。

Book Library（教材庫）可以包含：

- Book（教材）
- Folder（資料夾）

## 3.3 Folder

Folder（資料夾）是教材組織工具。

Folder（資料夾）可以：

- 包含 Book（教材）
- 包含其他 Folder（資料夾）
- 進行排序
- 移動

Folder（資料夾）不應成為教材內容本身。

## 3.4 Book

Book（教材）是主要教材單位。

Book（教材）可以包含：

- Lesson（課程）
- Page（頁面）

## 3.5 Lesson

Lesson（課程）是 Book（教材）內的教學單位。

第一版可以使用 Default Lesson（預設課程）。

Book（教材）建立時可以建立 Default Lesson（預設課程）。

## 3.6 Page

Page（頁面）是實際教材內容的主要單位。

Page（頁面）可以包含：

- Image Area（圖片區）
- Text Area（文字區）
- HTML Overlay（HTML 疊加層）

---

# 4. User Account and Access

## 4.1 Purpose

User Account（使用者帳號）是 MagicBook 個人教材資料的資料歸屬邊界。

Supabase 負責 User Account（使用者帳號）、Authentication（身分驗證）、Session（工作階段）、User ID（使用者識別碼）與個人教材資料。

MagicBook 不使用 Workspace（工作空間）作為資料根層級。

## 4.2 User Account Ownership

核心教材資料必須直接歸屬於 User Account（使用者帳號）。

主要教材資料包括：

- Folder（資料夾）
- Book（教材）
- Lesson（課程）
- Page（頁面）
- Content（內容）
- Interaction（互動）

不同 User Account（使用者帳號）的教材資料不得互相混用。

## 4.3 Access Status

User Account（使用者帳號）需要具有 Access Status（使用權狀態）。

目前只確認：

- Active（有效）
- Inactive（無效）

Active（有效）時，使用者可以使用 MagicBook。

Inactive（無效）時，使用者不能使用 MagicBook。

本文件不建立 Read Only（唯讀模式）、Archive Mode（封存模式）或 Temporary Access（臨時使用權）等額外狀態。

## 4.4 Trial Used

每一個 User Account（使用者帳號）一生只能使用一次 Free Trial（免費試用）。

Trial Used（試用已使用）屬於 Supabase 管理的使用者資料。

Trial（試用）完成後，系統應能判斷該 User Account（使用者帳號）是否已使用過試用。

## 4.5 Billing Boundary

Billing System（計費系統）與 Supabase 的資料責任必須分離。

Supabase 不負責保存或管理：

- 個人／團體方案細節
- Group（團體）
- Group ID（團體識別碼）
- 團主
- 團員
- 邀請
- 價格
- 付款
- 付款週期
- 付款來源

Billing System（計費系統）負責上述商業規則，並透過 Webhook（網路回呼）通知 Supabase 使用權狀態。

Supabase 最終只需要知道 User ID（使用者識別碼）對應的 Active / Inactive（有效／無效）狀態。

同一 User Account（使用者帳號）不因個人方案或團體方案而建立新的資料根層級。

## 4.6 Data Retention After Expiration

Access（使用權）到期後，User Account（使用者帳號）進入 Inactive（無效）狀態。

正式教材資料自到期日起保留 90 天。

如果使用者在 90 天內重新取得使用權，原有資料仍然存在並可繼續使用。

90 天內未重新取得使用權，系統才可清除該使用者的正式教材資料。

本文件不建立 Temporary Access（臨時使用權）。

# 5. Book Library

## 5.1 Purpose

Book Library（教材庫）是教材管理入口。

主要責任：

- Book Discovery（教材尋找）
- Book Management（教材管理）
- Folder Management（資料夾管理）
- Book Navigation（教材導覽）

## 5.2 Root Books

Book（教材）可以直接存在於 Book Library Root（教材庫根目錄）。

不要求每一本 Book（教材）都必須位於 Folder（資料夾）。

## 5.3 Folder Relationship

Folder（資料夾）與 Book（教材）的關係必須允許：

Book（教材）在 Root（根目錄）與 Folder（資料夾）之間移動。

資料結構必須能支援 Move Book（移動教材）。

## 5.4 Book Library Data Boundary

Book Library（教材庫）負責教材組織。

不負責：

- OCR Processing（OCR 處理）
- AI Processing（AI 處理）
- Image Processing（影像處理）

---

# 6. Folder

## 6.1 Purpose

Folder（資料夾）用於組織教材。

Folder（資料夾）是 Organization Structure（組織結構），不是教材內容。

## 6.2 Folder Capabilities

資料架構必須支援：

- Create Folder（建立資料夾）
- Rename Folder（重新命名資料夾）
- Delete Folder（刪除資料夾）
- Move Folder（移動資料夾）
- Reorder Folder（排序資料夾）
- Nested Folder（巢狀資料夾）
- Drag & Drop Sorting（拖放排序）

## 6.3 Nested Folder

Folder（資料夾）可以包含其他 Folder（資料夾）。

因此資料關係必須支援：

Parent Folder（父資料夾）
與
Child Folder（子資料夾）。

Nested Folder（巢狀資料夾）的深度不在本文件提前限制。

## 6.4 Folder and Book

Folder（資料夾）可以包含 Book（教材）。

Book（教材）也可以不屬於任何 Folder（資料夾）。

因此 Folder → Book（資料夾→教材）不是必須存在的關係。

## 6.5 Folder Deletion

Folder（資料夾）與 Book（教材）的資料責任必須分離。

刪除 Folder（資料夾）不等同於刪除其中的 Book（教材）。

### Confirmed Folder Delete Rule（已確認資料夾刪除規則）

- Folder（資料夾）只有在完全為空時才能刪除。
- 如果 Folder（資料夾）內仍有 Book（教材）或 Child Folder（子資料夾），禁止刪除。
- 不得使用 Cascade Delete（級聯刪除）。
- 不得因刪除 Folder（資料夾）自動搬移其中的 Book（教材）或 Child Folder（子資料夾）。
- Delete API（刪除 API）與 UI（使用者介面）必須先檢查 Folder（資料夾）是否為空，再決定是否允許刪除。

本規則屬於既有已確認產品行為，不再視為待確認。

UI（使用者介面）提示文字沿用既有 PM Decision（產品決策）／已確認實作內容；本 Database Design（資料庫設計）不重新定義 UI（使用者介面）文案。

---

# 7. Book

## 7.1 Purpose

Book（教材）是 MagicBook 的主要教材單位。

Book（教材）是使用者管理與開啟教材的主要資料容器。

## 7.2 Book Structure

Book（教材）可以包含：

Lesson（課程）
↓
Page（頁面）

## 7.3 Book Capabilities

資料架構必須支援：

- Create Book（建立教材）
- Rename Book（重新命名教材）
- Duplicate Book（複製教材）
- Delete Book（刪除教材）
- Open Book（開啟教材）
- Move Book（移動教材）

## 7.4 Book and Lesson

一個 Book（教材）可以包含一個或多個 Lesson（課程）。

第一版可以使用 Default Lesson（預設課程）。

Book（教材）建立後可以立即具有可使用的 Lesson（課程）。

## 7.5 Book and User Account

每一個 Book（教材）必須屬於一個 User Account（使用者帳號）。

Book（教材）不得跨 User Account（使用者帳號）共用同一筆核心資料。

## 7.6 Book and Folder

Book（教材）可以：

- 位於 Root（根目錄）
- 位於 Folder（資料夾）

Book（教材）的內容本身不應依賴 Folder（資料夾）才能存在。

---

# 8. Lesson

## 8.1 Purpose

Lesson（課程）是 Book（教材）內的教學單位。

Lesson（課程）用於組織 Page（頁面）。

## 8.2 Lesson Structure

Lesson（課程）
↓
Page（頁面）

## 8.3 Lesson Capabilities

資料架構必須支援：

- Create Lesson（建立課程）
- Rename Lesson（重新命名課程）
- Delete Lesson（刪除課程）
- Reorder Lesson（排序課程）

## 8.4 Default Lesson

第一版可使用 Default Lesson（預設課程）。

建立 Book（教材）時可以自動建立 Default Lesson（預設課程）。

## 8.5 Lesson Ownership

每一個 Lesson（課程）必須屬於：

- 一個 Book（教材）

Lesson（課程）的 User Account（使用者帳號）歸屬可由其 Book（教材）關聯取得。

Lesson（課程）不應脫離 Book（教材）獨立存在。

---

# 9. Page

## 9.1 Purpose

Page（頁面）是教材實際內容的核心資料單位。

Page（頁面）是 Editor Mode（編輯模式）與 Reading Mode（閱讀模式）共同使用的資料基礎。

## 9.2 Page Structure

Page（頁面）可以包含：

- Image Area（圖片區）
- Text Area（文字區）
- HTML Overlay（HTML 疊加層）

## 9.3 Page Capabilities

資料架構必須支援：

- Add Page（新增頁面）
- Delete Page（刪除頁面）
- Duplicate Page（複製頁面）
- Reorder Page（排序頁面）
- Page Navigation（頁面導覽）

## 9.4 Page Ownership

每一個 Page（頁面）必須屬於：

- 一個 Lesson（課程）
- 一個 Book（教材）

Page（頁面）的 User Account（使用者帳號）歸屬可由其 Book（教材）關聯取得。

這些關係可以由資料關聯取得。

## 9.5 Page Ordering

Page（頁面）必須具有 Ordering Information（排序資訊），用於支援 Page Reorder（頁面排序）。

實際欄位名稱與資料型別不在本文件提前鎖定。

---

# 10. Content Architecture

## 10.1 Content Separation

Page（頁面）內的內容必須維持責任分離：

- Image Area（圖片區）
- Text Area（文字區）
- HTML Overlay（HTML 疊加層）

## 10.2 Image Area

Image Area（圖片區）負責：

- Image Import（圖片匯入）
- Image Display（圖片顯示）
- Image Replace（圖片替換）
- Image Delete（圖片刪除）
- PDF Display（PDF 顯示）
- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）

## 10.3 Image Input

Image Import（圖片匯入）可以接收：

- PNG
- JPG
- JPEG
- PDF
- 使用者已拍攝之照片
- 使用者截圖
- 使用者從裝置選取之圖片／檔案

MagicBook 不建立專用 Camera System（相機系統）。

使用者拍照由裝置既有相機完成。

MagicBook 從 Image Import（圖片匯入）開始處理。

## 10.4 Text Area

Text Area（文字區）是 Text-only Editing Area（純文字編輯區）。

Text Area（文字區）負責：

- Add Text Block（新增文字區塊）
- Edit Text Block（編輯文字區塊）
- Delete Text Block（刪除文字區塊）
- Reorder Text Block（排序文字區塊）

## 10.5 Text Area Boundary

Text Area（文字區）不負責：

- OCR（光學字元辨識）
- PDF Processing（PDF 處理）
- Image Processing（影像處理）

這些功能屬於其他模組。

## 10.6 HTML Overlay

HTML Overlay（HTML 疊加層）是 Interactive Layer（互動層）。

HTML Overlay（HTML 疊加層）用於承載：

- Interactive Object（互動物件）
- Hotspot（熱點）
- Popup（彈出內容）
- 其他已確認互動資料

## 10.7 Overlay and Background

HTML Overlay（HTML 疊加層）不應直接修改 Original Teaching Material（原始教材內容）。

教材底圖與互動資料保持分離。

## 10.8 Same Data Model

Editor Mode（編輯模式）與 Reading Mode（閱讀模式）應使用 Same Data Model（同一份資料模型）。

不得建立兩套互相獨立的教材資料。

---

# 11. Image Area

## 11.1 Image Area Responsibility

Image Area（圖片區）負責圖片與 PDF 內容。

主要責任：

- Import（匯入）
- Display（顯示）
- Replace（替換）
- Delete（刪除）
- Optimization（最佳化）
- Compression（壓縮）

## 11.2 Image Asset

Image Asset（圖片資產）是教材內容的一部分。

只有正式進入教材的圖片才屬於 Teaching Material Asset（教材資產）。

## 11.3 Processing Image

Processing Image（處理圖片）是 AI（人工智慧）／OCR（光學字元辨識）／Image Processing（影像處理）使用的中間資料。

Processing Image（處理圖片）不應自動形成第二份教材圖片資產。

## 11.4 Rejected Image

如果 Quality Check（品質檢查）判定圖片：

- FAIL
- 不可可靠處理

不得因為處理流程而自動建立第二份正式教材資產。

MagicBook 不是使用者照片倉庫。

## 11.5 Image Optimization

Image Optimization（圖片最佳化）與 Image Compression（圖片壓縮）屬於圖片處理服務。

不得改變使用者實際教材意圖。

## 11.6 Original Teaching Material

正式教材資料必須與：

- AI Processing（AI 處理）
- OCR Processing（OCR 處理）
- Image Processing（影像處理）

分離。

處理流程不得直接破壞正式教材資料。

---

# 12. Text Area

## 12.1 Text Block

Text Block（文字區塊）是 Text Area（文字區）的主要資料單位。

Text Block（文字區塊）可以：

- Create（建立）
- Edit（編輯）
- Delete（刪除）
- Reorder（排序）

## 12.2 Text Ownership

Text Block（文字區塊）必須屬於特定 Page（頁面）。

Text Block（文字區塊）不應脫離 Page（頁面）獨立存在。

## 12.3 Text and OCR

OCR（光學字元辨識）產生的文字結果，不應直接等同於使用者建立的正式 Text Block（文字區塊）。

OCR Result（OCR 結果）與正式教材文字資料必須保持責任分離。

## 12.4 Text and AI

AI（人工智慧）產生的內容也不應自動取代正式教材文字。

任何正式教材資料的變更必須遵循產品已確認的使用者流程。

---

# 13. HTML Overlay

## 13.1 Purpose

HTML Overlay（HTML 疊加層）是教材上方的 Interactive Layer（互動層）。

主要目的，是讓教材可以加入互動，而不需要直接修改教材底圖。

## 13.2 Overlay Ownership

HTML Overlay（HTML 疊加層）必須與特定 Page（頁面）關聯。

Overlay（疊加層）不應脫離 Page（頁面）獨立存在。

## 13.3 Overlay Objects

HTML Overlay（HTML 疊加層）可以承載：

- Hotspot（熱點）
- Popup（彈出內容）
- Interactive Object（互動物件）

## 13.4 Overlay Position

互動物件需要具有 Position Data（位置資料）。

實際座標格式與欄位名稱於實作階段確認。

## 13.5 Overlay Size

需要支援物件尺寸資料，以支援 Resize（調整大小）。

實際欄位名稱與資料型別於實作階段確認。

## 13.6 Overlay Layer

如果同一 Page（頁面）存在多個互動物件，資料架構需要支援 Layer Ordering（圖層排序）。

實際實作方式於開發階段確認。

---

# 14. Hotspot

## 14.1 Purpose

Hotspot（熱點）是 MagicBook 最主要的互動資料之一。

Hotspot（熱點）用於：

使用者點擊教材指定區域
↓
觸發互動內容。

## 14.2 Hotspot Ownership

Hotspot（熱點）屬於 HTML Overlay（HTML 疊加層），並且最終關聯至 Page（頁面）。

## 14.3 Hotspot Data

Hotspot（熱點）至少需要能表達：

- Position（位置）
- Size（尺寸）
- Interaction Target（互動目標）
- Display / Interaction State（顯示／互動狀態）

## 14.4 Hotspot CRUD

資料架構必須支援：

- Create Hotspot（建立熱點）
- Read Hotspot（讀取熱點）
- Update Hotspot（更新熱點）
- Delete Hotspot（刪除熱點）

## 14.5 Hotspot and OCR

OCR（光學字元辨識）產生：

Text + Bounding Box（文字＋邊界框）。

Hotspot Generator（Hotspot 產生器）可以利用 OCR Result（OCR 結果）建立 Hotspot（熱點）。

但 OCR Result（OCR 結果）不等於正式 Hotspot（熱點）。

兩者必須保持資料責任分離。

## 14.6 Hotspot Coordinate Transformation

如果 Image Processing（影像處理）改變影像幾何，例如：

Deskew（校正傾斜）

則 OCR 座標必須經過 Coordinate Transformation（座標轉換），再建立最終 Hotspot（熱點）。

避免 Hotspot（熱點）與使用者實際看到的位置產生偏移。

## 14.7 Reliable Failure

如果系統無法可靠建立 Hotspot（熱點）：

不得建立猜測性 Hotspot（熱點）。

系統應回報：

- PARTIAL（部分完成）
- FAIL（失敗）

而不是錯誤地建立 SUCCESS（成功）狀態。

---

# 15. AI and Processing Data

## 15.1 Purpose

AI Processing Data（AI 處理資料）與 Teaching Material Data（教材資料）必須分離。

## 15.2 Processing Pipeline

目前已確認的主要處理流程：

Image Import（圖片匯入）
↓
Image Quality Check（圖片品質檢查）
↓
必要時 Auto Correction（自動修正）
↓
Re-Quality Check（重新品質檢查）
↓
OCR（光學字元辨識）
↓
Text + Bounding Box（文字＋邊界框）
↓
Coordinate Transformation（座標轉換）
↓
Hotspot Generator（Hotspot 產生器）
↓
HTML Overlay（HTML 疊加層）
↓
Hotspot（熱點）

Coordinate Transformation（座標轉換）必須發生於 Hotspot Generator（Hotspot 產生器）建立最終 Hotspot（熱點）之前。

本順序與 AI Design（AI 設計）及 Editor Design（Editor 設計）目前已確認的流程一致。

## 15.3 Quality Check Data

Quality Check（品質檢查）可以產生：

- Quality Result（品質結果）
- Processing Decision（處理決策）
- Correction Requirement（修正需求）
- Re-Quality Result（重新品質結果）

實際資料欄位於實作階段確認。

## 15.4 Auto Correction Data

Auto Correction（自動修正）目前保留：

- Deskew（校正傾斜）
- Denoise（去雜訊）
- Sharpen（銳化）

CLAHE 不列入目前主要 Auto Correction Pipeline（自動修正流程）。

## 15.5 Re-Quality Check

Auto Correction（自動修正）完成後，必須重新進行 Re-Quality Check（重新品質檢查）。

資料流程不得將「已經修正」直接視為「已經合格」。

## 15.6 OCR Data

MVP 已核定：

Google Cloud Vision API

DOCUMENT_TEXT_DETECTION

OCR Provider（OCR 服務供應商）必須透過 Provider Adapter（服務供應商介面層）整合。

## 15.7 Provider Independence

核心教材資料不得直接依賴特定 OCR Provider（OCR 服務供應商）。

未來更換 Provider（服務供應商）時，核心教材資料模型不應被迫重新設計。

## 15.8 Background Processing

耗時的：

- Denoise（去雜訊）
- OCR（光學字元辨識）
- AI（人工智慧）
- Image Processing（影像處理）

可以使用 Background Processing（背景處理）。

Processing Status（處理狀態）需要能讓系統知道：

- Pending（等待）
- Processing（處理中）
- Completed（完成）
- Failed（失敗）

實際狀態模型於實作階段確認。

---

# 16. Relationship Rules

## 16.1 User Account → Folder

一個 User Account（使用者帳號）可以包含多個 Folder（資料夾）。

Folder（資料夾）必須屬於一個 User Account（使用者帳號）。

## 16.2 User Account → Book

一個 User Account（使用者帳號）可以包含多個 Book（教材）。

Book（教材）必須屬於一個 User Account（使用者帳號）。

## 16.3 Folder → Folder

Folder（資料夾）可以具有 Parent Folder（父資料夾），以支援 Nested Folder（巢狀資料夾）。

## 16.4 Folder → Book

Folder（資料夾）可以包含多個 Book（教材）。

Book（教材）可以沒有 Folder（資料夾）。

因此 Folder 對 Book（資料夾對教材）是 Optional Relationship（可選關係）。

## 16.5 Book → Lesson

Book（教材）可以包含多個 Lesson（課程）。

Lesson（課程）必須屬於 Book（教材）。

## 16.6 Lesson → Page

Lesson（課程）可以包含多個 Page（頁面）。

Page（頁面）必須屬於 Lesson（課程）。

## 16.7 Page → Content

Page（頁面）可以包含：

- Image Area（圖片區）
- Text Area（文字區）
- HTML Overlay（HTML 疊加層）

## 16.8 Page → Overlay

一個 Page（頁面）可以包含多個 HTML Overlay Object（HTML 疊加物件）。

每一個 Overlay Object（疊加物件）必須能追溯至其所屬 Page（頁面）。

## 16.9 Overlay → Hotspot

Hotspot（熱點）屬於 HTML Overlay Layer（HTML 疊加層）。

Hotspot（熱點）必須能追溯至其所屬 Page（頁面）。

## 16.10 Page → Text Block

Text Block（文字區塊）屬於 Page（頁面）。

Text Block（文字區塊）不應脫離 Page（頁面）成為獨立教材內容。

---

# 17. Data Ownership and Isolation

## 17.1 User Account Ownership

核心教材資料必須具有 User Account Ownership（使用者帳號資料歸屬）。

包括：

- Folder（資料夾）
- Book（教材）
- Lesson（課程）
- Page（頁面）
- Content（內容）
- Interaction（互動）

## 17.2 User Access

Authentication（身分驗證）確認使用者身分。

Authorization（授權）確認使用者是否可以存取自己的 User Account（使用者帳號）與其資料。

## 17.3 Data Isolation

不同 User Account（使用者帳號）的資料必須保持 Data Isolation（資料隔離）。

使用者不得透過一般產品操作取得其他 User Account（使用者帳號）的資料。

Billing System（計費系統）中的團體關係不建立 MagicBook Database（MagicBook 資料庫）的 Group Entity（團體實體）。

---

# 18. Data Persistence Rules

## 18.1 Persistent Data

正式教材資料必須 Persistent（持久化）。

包括：

- Book（教材）
- Lesson（課程）
- Page（頁面）
- Text Block（文字區塊）
- Image Asset（圖片資產）
- HTML Overlay（HTML 疊加層）
- Hotspot（熱點）
- 其他已確認的正式教材資料

## 18.2 Temporary Processing Data

Temporary Processing Data（暫時處理資料）只用於：

- OCR（光學字元辨識）
- AI（人工智慧）
- Image Processing（影像處理）
- Quality Check（品質檢查）
- Auto Correction（自動修正）

不得自動變成第二份正式教材資產。

## 18.3 Processing Failure

Processing Failure（處理失敗）不得破壞既有正式教材資料。

如果：

- OCR FAIL（OCR 失敗）
- AI FAIL（AI 失敗）
- Image Processing FAIL（影像處理失敗）

系統應保留原有教材資料。

## 18.4 Reliable Failure

任何無法可靠完成的處理，不得以猜測資料取代。

例如：

- 不猜測 OCR（光學字元辨識）文字
- 不猜測座標
- 不建立錯誤 Hotspot（熱點）
- 不覆蓋原有教材資料

## 18.5 Save Boundary

正式資料寫入資料庫前，系統必須確認資料符合目前產品規格。

Save（儲存）行為不得因單一 AI Processing（AI 處理）結果而破壞既有資料。

---

# 19. Database Implementation Rules

## 19.1 Implementation Timing

Database Implementation（資料庫實作）應依 Roadmap（開發路線圖）與 MVP Development（MVP 開發規格）逐階段進行。

不應在尚未進入相關 Phase（階段）前，提前建立大量未確認資料結構。

## 19.2 Schema Responsibility

Database Schema（資料庫結構）必須反映已確認產品需求。

不得由資料庫結構反向決定產品功能。

## 19.3 Field Naming

實際：

- Table Name（資料表名稱）
- Column Name（欄位名稱）
- Data Type（資料型別）
- Constraint（限制條件）

於實作階段確認。

命名必須遵循 Development Guidelines（開發規範）。

不得在本文件未經 PM（產品經理）確認的情況下自行擴大資料欄位。

## 19.4 Relationship Integrity

資料關係必須保持 Relationship Integrity（關聯完整性）。

例如：

- Page（頁面）不應存在於不存在的 Lesson（課程）。
- Lesson（課程）不應存在於不存在的 Book（教材）。
- Book（教材）不應存在於不存在的 User Account（使用者帳號）。

## 19.5 Delete Behavior

不同資料層級的 Delete Behavior（刪除行為）原則上於實作階段依已確認產品規格確認。

但既有 PM Decision（產品決策）已確認的刪除規則，不得重新視為未核定。

目前已確認的 Folder Delete Rule（資料夾刪除規則）：

- Folder（資料夾）只有在完全為空時才能刪除。
- 非空 Folder（資料夾）禁止刪除。
- 不得 Cascade Delete（級聯刪除）。
- 不得自動搬移 Folder（資料夾）內的 Book（教材）或 Child Folder（子資料夾）。

不得因資料庫預設行為，自動刪除大量教材資料而未經產品規格確認。

## 19.6 Migration

Database Migration（資料庫遷移）若會影響既有正式資料，必須先確認：

- Data Impact（資料影響）
- Backward Compatibility（向後相容）
- Recovery Strategy（復原策略）

不得直接修改正式資料而未進行影響評估。

## 19.7 RLS

Row Level Security（資料列層級安全性）應用於需要 User Account Data Isolation（使用者帳號資料隔離）的資料。

實際 Policy（政策）於 Database Implementation（資料庫實作）階段依實際 Schema（資料庫結構）確認。

不得在本文件提前寫死尚未確認的 Policy（政策）細節。

---

# 20. Future Extension

## 20.1 Extension Principle

Database Architecture（資料庫架構）必須具有 Extensibility（可擴充性）。

未來新增功能時，不得破壞目前核心教材架構。

## 20.2 Possible Extension Direction

未來可能增加新的：

- Content Type（內容類型）
- Interactive Object（互動物件）
- AI Service（AI 服務）
- Media Type（媒體類型）
- Learning Data（學習資料）

但這些不代表目前 MVP 已核定功能。

未經 PM Decision（產品決策）確認，不得直接加入正式 MVP Schema（MVP 資料庫結構）。

## 20.3 Core Data Stability

未來新增功能應盡可能：

Reuse Existing Data Model（重用既有資料模型）。

只有當既有架構確實無法支援時，才評估新增資料結構。

## 20.4 Provider Replacement

第三方 Provider（服務供應商）更換：

不得要求重新建立核心教材資料。

Provider-specific Data（Provider 專用資料）應與核心教材資料保持分離。

---

# 21. Change Log

## Version 2.0

### Account / Billing Architecture Synchronization

本版本同步 01_Product_Specification v3.4、02_MVP_Development v3.0 與 04_Development_Guidelines v4.4 已正式確認的 Account（帳號）與 Billing（計費）架構。

本版本正式確認：

- 移除 Workspace（工作空間）作為資料根層級。
- 核心教材資料改由 User Account（使用者帳號）直接歸屬。
- 核心教材階層為 User Account（使用者帳號） → Book Library（教材庫） → Folder（資料夾） → Book（教材） → Lesson（課程） → Page（頁面）。
- Supabase 負責 User Account（使用者帳號）、Authentication（身分驗證）、Session（工作階段）、User ID（使用者識別碼）、個人教材資料、Access Status（使用權狀態）與 Trial Used（試用已使用）。
- Supabase 不建立 Group Entity（團體實體）、Group ID（團體識別碼）、團主、團員、邀請、價格、付款或付款週期等 Billing（計費）資料。
- Billing System（計費系統）負責個人／團體方案與商業規則，並透過 Webhook（網路回呼）通知 Supabase 使用權狀態。
- Access Status（使用權狀態）只確認 Active（有效）與 Inactive（無效）。
- Free Trial（免費試用）每一個 User Account（使用者帳號）一生一次。
- 使用權到期後，正式教材資料保留 90 天；90 天內重新取得使用權則保留原資料，超過 90 天未恢復才清除資料。
- 不建立 Temporary Access（臨時使用權）、Read Only（唯讀模式）或 Archive Mode（封存模式）。

本次只同步既有已確認規則，不新增產品功能，不提前鎖定未確認的 Database Schema（資料庫結構）。

---



## Version 1.2

### Hotspot Coordinate Transformation Synchronization

同步目前已確認的 AI Automation（AI 自動化）流程順序。

本版本正式確認：

Image Import（圖片匯入）
↓
Image Quality Check（圖片品質檢查）
↓
必要時 Auto Correction（自動修正）
↓
Re-Quality Check（重新品質檢查）
↓
OCR（光學字元辨識）
↓
Text + Bounding Box（文字＋邊界框）
↓
Coordinate Transformation（座標轉換）
↓
Hotspot Generator（Hotspot 產生器）
↓
HTML Overlay（HTML 疊加層）
↓
Hotspot（熱點）

Coordinate Transformation（座標轉換）必須在 Hotspot Generator（Hotspot 產生器）建立最終 Hotspot（熱點）之前完成。

本次只同步既有已確認規則，不新增產品功能，不新增未確認 Database Schema（資料庫結構）。

---

## Version 1.1

### Folder Delete Rule Synchronization

同步既有 PM Decision（產品決策）已確認的 Folder Delete Rule（資料夾刪除規則）。

本版本正式確認：

- Folder（資料夾）只有在完全為空時才能刪除。
- 非空 Folder（資料夾）禁止刪除。
- 不得 Cascade Delete（級聯刪除）。
- 不得自動搬移 Book（教材）或 Child Folder（子資料夾）。
- Delete（刪除）行為必須先檢查 Folder（資料夾）是否為空。

本次只同步既有已確認規則，不新增產品功能，不新增 Database Schema（資料庫結構）。

---

## Version 1.0

### Initial Database Design

建立 MagicBook 3.0 第一版 Database Design（資料庫設計）。

本版本確認：

### Core Hierarchy

Workspace（工作空間）
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

### Content Architecture

Page（頁面）包含：

- Image Area（圖片區）
- Text Area（文字區）
- HTML Overlay（HTML 疊加層）

### Interaction Architecture

HTML Overlay（HTML 疊加層）負責：

- Hotspot（熱點）
- Popup（彈出內容）
- Interactive Object（互動物件）

### AI Processing Separation

AI（人工智慧）、OCR（光學字元辨識）、Image Processing（影像處理）與正式教材資料保持分離。

### Image Processing

目前確認：

- Quality Check（品質檢查）
- Auto Correction（自動修正）
- Re-Quality Check（重新品質檢查）
- OCR（光學字元辨識）
- Coordinate Transformation（座標轉換）
- Hotspot Generator（Hotspot 產生器）

形成主要 AI Automation Processing Pipeline（AI 自動化處理流程）。

### Image Storage

MagicBook 不是使用者照片倉庫。

Temporary Processing Data（暫時處理資料）不應自動形成第二份正式教材資產。

### Workspace Isolation

核心教材資料必須具有 Workspace Ownership（Workspace 資料歸屬）。

不同 Workspace（工作空間）必須保持 Data Isolation（資料隔離）。

### Provider Architecture

第三方 Provider（服務供應商）必須採 Replaceable Provider Architecture（可替換服務供應商架構）。

核心教材資料不得直接綁定單一 Provider（服務供應商）。

### Implementation Boundary

本版本刻意不提前鎖定所有：

- Table Name（資料表名稱）
- Column Name（欄位名稱）
- Data Type（資料型別）
- Index（索引）
- SQL（結構化查詢語言）
- RLS Policy（資料列層級安全性政策）
- Migration Strategy（資料庫遷移策略）

上述內容於實際 MVP Development（MVP 開發）階段，依已確認需求逐步完成。

---

# END OF DOCUMENT
