# MagicBook 3.0 AI Design

Version: 1.3

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-09

---

# 0. AI Design Purpose

本文件定義 MagicBook 3.0 的 AI Architecture（AI 架構）、AI Scope（AI 範圍）、AI Processing（AI 處理流程）、AI Data Access（AI 資料存取）、AI Provider（AI 服務供應商）、AI Security（AI 安全）與 AI Failure Handling（AI 失敗處理）。

本文件為工程實作依據。

AI 不得自行擴張產品功能。

AI 不得自行改變 Product Specification（產品規格）、Database Design（資料庫設計）或 API Design（API 設計）。

如本文件與 Product Specification（產品規格）衝突，以 Product Specification（產品規格）為最高依據。

---

# 1. Core AI Principles

## 1.1 AI Is a Tool

AI 是 MagicBook 的工具，不是產品資料的擁有者。

AI 的責任：

- 理解使用者要求
- 分析教材內容
- 執行已定義的 AI Processing（AI 處理）
- 產生 Processing Result（處理結果）
- 協助建立互動內容
- 協助搜尋、理解與整理教材

AI 不得：

- 自行建立未授權教材
- 自行改變教材結構
- 自行取得未授權資料
- 自行跨 User Account（使用者帳戶）取得資料
- 自行改變產品權限
- 自行改變 Database Model（資料模型）
- 自行改變 API Contract（API 契約）

---

## 1.2 User Account Boundary

MagicBook 的資料歸屬與權限邊界為：

User Account（使用者帳戶）
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
↓
Content（內容）

AI 必須遵循 User Account Boundary（使用者帳戶邊界）。

AI 不得跨 User Account（使用者帳戶）取得資料。

---

## 1.3 AI Permission

AI 所有資料存取必須經過：

Authentication（身份驗證）
↓
User Account Resolution（使用者帳戶解析）
↓
Permission Check（權限檢查）
↓
Data Access（資料存取）

未通過 Permission Check（權限檢查）的資料不得提供給 AI。

---

## 1.4 Reliable Failure

如果 AI 或自動化流程無法可靠完成：

> Reliable Failure（可控失敗）優於錯誤成功。

系統不得：

- 假裝 AI 已完成
- 產生未確認資料
- 覆蓋原始教材
- 自動建立錯誤教材內容
- 將 Processing Result（處理結果）直接視為正式教材資料

---

# 2. AI Scope

## 2.1 In Scope

MagicBook 3.0 MVP（最小可行產品）目前 AI 範圍包括：

- Image Quality Check（圖片品質檢查）
- Auto Correction（自動修正）
- OCR（光學字元辨識）
- Text Detection（文字偵測）
- Bounding Box Detection（文字區域偵測）
- Coordinate Transformation（座標轉換）
- Hotspot Generation（互動熱點產生）
- Document Text Detection（文件文字偵測）
- AI Context（AI 上下文）
- AI Conversation（AI 對話）
- AI History（AI 歷史紀錄）
- Processing Job（處理工作）
- AI Provider（AI 服務供應商）

---

## 2.2 Out of Scope

目前不建立：

- MagicBook Camera System（MagicBook 專用相機系統）
- 自製 OCR Algorithm（自製 OCR 演算法）
- 自製 AI Model（自製 AI 模型）
- 未確認的新 Image Editor（圖片編輯器）
- 未確認的新 Image Processing Algorithm（影像處理演算法）
- 未確認的新 AI Provider（AI 服務供應商）
- 未確認的新 AI Product
- AI 自動創作完整教材
- AI 自動改寫正式教材
- AI 自動建立未經使用者確認的 Teaching Material（教學教材）

---

# 3. AI Architecture

## 3.1 High-Level Architecture

MagicBook AI Architecture（AI 架構）：

User
↓
MagicBook UI（使用者介面）
↓
AI Request（AI 請求）
↓
Permission Check（權限檢查）
↓
Context Builder（上下文建立）
↓
AI Module（AI 模組）
↓
AI Provider Adapter（AI 服務供應商介面）
↓
AI Provider（AI 服務供應商）
↓
Processing Result（處理結果）
↓
MagicBook

---

## 3.2 AI Module

AI Module（AI 模組）負責：

- Request Routing（請求路由）
- Context Preparation（上下文準備）
- Prompt Management（提示管理）
- Provider Selection（服務供應商選擇）
- Provider Call（服務供應商呼叫）
- Result Validation（結果驗證）
- Error Handling（錯誤處理）
- History Recording（歷史紀錄）

AI Module 不直接負責資料庫結構設計。

---

## 3.3 Replaceable Provider

AI Provider（AI 服務供應商）必須可替換。

核心架構不得直接綁定單一 Provider。

可能的 Provider 包括：

- GPT
- Claude
- Gemini
- OpenRouter
- Future Providers（未來服務供應商）

更換 Provider 不應影響：

- Teaching Material（教學教材）
- User Account Data（使用者帳戶資料）
- Data Model（資料模型）
- API Contract（API 契約）
- UI
- User Flow（使用者流程）

---

# 4. AI Processing Pipeline

## 4.1 Image Processing Pipeline

正式流程：

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
Text + Bounding Box（文字與文字區域）
↓
Coordinate Transformation（座標轉換）
↓
Hotspot Generator（互動熱點產生）
↓
HTML Overlay（HTML 疊加層）
↓
Hotspot（互動熱點）

---

## 4.2 Image Quality Check

Image Quality Check（圖片品質檢查）負責確認：

- 圖片是否可處理
- 圖片解析度是否足夠
- 圖片方向是否正常
- 圖片是否需要修正
- 圖片是否適合 OCR

---

## 4.3 Auto Correction

Auto Correction（自動修正）只在必要時執行。

可能處理：

- Rotation（旋轉）
- Crop（裁切）
- Basic Image Correction（基本圖片修正）

Auto Correction 不得改變教材原始內容。

---

## 4.4 OCR

OCR（光學字元辨識）負責取得：

- Text（文字）
- Bounding Box（文字區域）
- Confidence（辨識信心值）

OCR Result（OCR 結果）屬於 Processing Result（處理結果）。

OCR Result 不直接等於正式教材內容。

---

## 4.5 Coordinate Transformation

Coordinate Transformation（座標轉換）負責將 OCR 座標轉換為 MagicBook Image Area（圖片區域）使用的座標系統。

座標轉換必須保留：

- 原始圖片尺寸
- OCR 座標
- 顯示尺寸
- Hotspot 座標

不得因 UI 尺寸改變而破壞原始座標資料。

---

## 4.6 Hotspot Generation

Hotspot Generation（互動熱點產生）依 OCR Result（OCR 結果）建立可互動區域。

Hotspot 不得直接修改原始圖片。

Hotspot 屬於 Image Area（圖片區域）的互動資料。

---

## 4.7 HTML Overlay

HTML Overlay（HTML 疊加層）負責將互動元素疊加在圖片上。

HTML Overlay 不得破壞：

- 原始圖片
- 原始座標
- Page（頁面）
- Image Asset（圖片資產）

---

# 5. AI Provider Architecture

## 5.1 Provider Independence

核心 AI Module 不得綁定單一 Provider。

Provider 可以被替換，而不應影響：

- 教材
- User Account Data（使用者帳戶資料）
- API
- UI
- Data Model（資料模型）

---

## 5.2 Provider Interface

Provider Interface（服務供應商介面）提供共同能力。

Provider-specific Implementation（供應商專用實作）集中於 Adapter Layer（介面轉接層）。

架構：

AI Module
↓
Provider Interface
↓
Provider Adapter
↓
Provider API

---

## 5.3 Provider Credential

Provider Credential（服務供應商憑證）不得暴露給一般使用者。

API Key（API 金鑰）不得：

- 寫入前端程式碼
- 暴露給瀏覽器
- 回傳給一般使用者
- 儲存在公開 Repository（儲存庫）

---

# 6. AI Context

## 6.1 Context Definition

Context（上下文）是 AI 執行任務時允許使用的資訊集合。

Context 可能包含：

- User Account Context（使用者帳戶上下文）
- Book Context（教材上下文）
- Lesson Context（課程上下文）
- Page Context（頁面上下文）
- Content Context（內容上下文）
- User Request（使用者要求）

---

## 6.2 Context Permission

AI 可以取得已授權的 Context（上下文）。

Context 必須遵循 User Account Permission（使用者帳戶權限）。

不得跨 User Account（使用者帳戶）取得資料。

---

## 6.3 Context Minimization

AI 只應取得完成目前任務所必要的 Context（上下文）。

不得因方便而取得整個 User Account（使用者帳戶）的全部資料。

---

# 7. AI Conversation

## 7.1 Conversation

AI Conversation（AI 對話）用於：

- 使用者提問
- AI 回應
- 教材理解
- AI 輔助操作

---

## 7.2 Conversation Context

每次 AI Conversation 必須使用目前已授權的 Context（上下文）。

不得自動加入：

- 未授權教材
- 其他 User Account（使用者帳戶）資料
- 未確認的 Teaching Material（教學教材）

---

## 7.3 Response

AI Response（AI 回應）首先屬於 Tool Output（工具輸出）。

除非使用者明確確認內容加入教材，否則不得自動成為 Teaching Material（教學教材）。

---

# 8. AI History

## 8.1 History Purpose

AI History（AI 歷史紀錄）用於記錄 AI 使用相關資訊。

可包含：

- User Request（使用者要求）
- AI Request（AI 請求）
- AI Response（AI 回應）
- Provider（服務供應商）
- Processing Result（處理結果）
- Error（錯誤）
- Timestamp（時間）

---

## 8.2 Data Ownership

AI History（AI 歷史紀錄）屬於 User Account（使用者帳戶）的 AI 使用資料。

不得讓其他 User Account（使用者帳戶）讀取。

---

## 8.3 Teaching Material Separation

AI History 不應自動成為：

- Book（教材）
- Lesson（課程）
- Page（頁面）
- Text Block（文字區塊）
- Image Asset（圖片資產）

AI History 與 Teaching Material（教學教材）必須分離。

---

# 9. Prompt Management

## 9.1 Prompt Manager

Prompt Manager（提示管理器）負責管理 AI Prompt（AI 提示）。

Prompt 不得直接散落於各個 UI Component（介面元件）中。

---

## 9.2 Prompt Version

Prompt 可以具有 Version（版本）。

Prompt Version 不得改變：

- User Account Permission（使用者帳戶權限）
- Data Ownership（資料歸屬）
- API Contract（API 契約）
- Database Schema（資料庫結構）

---

## 9.3 Prompt Input

Prompt Input（提示輸入）必須經過：

- Permission Check（權限檢查）
- Context Validation（上下文驗證）
- Input Validation（輸入驗證）

---

# 10. AI Tool Architecture

## 10.1 Tool

AI Tool（AI 工具）是 AI 可以呼叫的明確能力。

Tool 必須具有：

- Tool Name（工具名稱）
- Input Schema（輸入結構）
- Permission Rule（權限規則）
- Processing Rule（處理規則）
- Output Schema（輸出結構）
- Error Handling（錯誤處理）

---

## 10.2 Tool Output

Tool Output（工具輸出）必須經過 Result Validation（結果驗證）。

Tool Output 不得直接視為正式教材資料。

---

## 10.3 Tool Permission

每個 Tool 都必須檢查：

- User Account（使用者帳戶）
- Permission（權限）
- Resource Ownership（資源歸屬）
- Resource Scope（資源範圍）

---

# 11. Processing Job

## 11.1 Processing Job

Processing Job（處理工作）用於執行可能需要時間的 AI Processing（AI 處理）。

例如：

- OCR
- Image Processing（圖片處理）
- AI Analysis（AI 分析）
- Document Text Detection（文件文字偵測）

---

## 11.2 Job Context

Processing Job 必須具有：

- User Account Context（使用者帳戶上下文）
- Source Resource（來源資源）
- Processing Type（處理類型）

---

## 11.3 Processing Type

已確認的處理類型包括：

- Image Quality Check（圖片品質檢查）
- Auto Correction（自動修正）
- OCR（光學字元辨識）
- AI Processing（AI 處理）
- Document Text Detection（文件文字偵測）

---

## 11.4 Job Status

Processing Job 可以具有：

- Pending（等待中）
- Processing（處理中）
- Completed（完成）
- Failed（失敗）

---

## 11.5 Job Isolation

Processing Job 必須遵循 User Account Data Isolation（使用者帳戶資料隔離）。

Job 不得讀取其他 User Account（使用者帳戶）的資料。

---

# 12. OCR Architecture

## 12.1 OCR Provider

OCR Provider（OCR 服務供應商）必須可替換。

OCR Architecture（OCR 架構）不得綁定單一 OCR Provider。

---

## 12.2 OCR Input

OCR Input（OCR 輸入）可能包含：

- Image Asset（圖片資產）
- PDF Page（PDF 頁面）
- Document Image（文件圖片）

---

## 12.3 OCR Result

OCR Result（OCR 結果）屬於 Processing Result（處理結果）。

OCR Result 包含：

- Text（文字）
- Bounding Box（文字區域）
- Confidence（辨識信心值）

OCR Result 不等於正式教材資料。

---

## 12.4 OCR Failure

OCR 失敗時：

- 不得覆蓋原始圖片
- 不得建立錯誤 Hotspot（互動熱點）
- 必須保留 Error State（錯誤狀態）
- 必須允許重新處理

---

# 13. Document Text Detection

## 13.1 Purpose

Document Text Detection（文件文字偵測）用於從文件內容取得可處理的文字資訊。

---

## 13.2 Provider

Document Text Detection 必須透過 Replaceable Provider Adapter（可替換服務供應商介面）處理。

---

## 13.3 Result

Document Text Detection Result（文件文字偵測結果）屬於 Processing Result（處理結果）。

不得直接覆蓋正式教材。

---

# 14. AI Data Access

## 14.1 Access Rule

AI 只能取得：

- 已授權資料
- 屬於目前 User Account（使用者帳戶）的資料
- 已確認供 AI 使用的 Context（上下文）

---

## 14.2 No Cross Account Access

AI 不得：

- 取得其他 User Account（使用者帳戶）資料
- 搜尋其他 User Account（使用者帳戶）教材
- 取得其他 User Account（使用者帳戶）AI History（AI 歷史紀錄）
- 取得未授權 Resource（資源）

---

## 14.3 Resource Ownership

AI 讀取 Resource（資源）前必須確認 Resource Ownership（資源歸屬）。

---

# 15. AI Security

## 15.1 User Account Data Isolation

AI Request（AI 請求）必須遵守 User Account Data Isolation（使用者帳戶資料隔離）。

---

## 15.2 Provider Credential

Provider Credential（服務供應商憑證）不得暴露給一般使用者。

---

## 15.3 AI Data Access

AI Data Access（AI 資料存取）必須受到 Permission Check（權限檢查）控制。

---

## 15.4 Error Security

錯誤資訊不得洩漏：

- Provider Credential（服務供應商憑證）
- API Key（API 金鑰）
- Database Credential（資料庫憑證）
- Other User Account Data（其他使用者帳戶資料）

---

# 16. AI Failure Handling

## 16.1 Provider Failure

Provider Failure（服務供應商失敗）時：

- 保留原始資料
- 保留 Job Status（工作狀態）
- 記錄 Error（錯誤）
- 不產生假成功結果

---

## 16.2 OCR Failure

OCR Failure（OCR 失敗）時：

- 不建立錯誤 Hotspot（互動熱點）
- 不覆蓋原始資料
- 保留原始 Image Asset（圖片資產）
- 允許重新處理

---

## 16.3 AI Failure

AI Failure（AI 失敗）時：

- 保留 User Data（使用者資料）
- 保留原始 Teaching Material（教學教材）
- 回傳可理解的 Error State（錯誤狀態）
- 不自動建立錯誤教材

---

# 17. Result Validation

## 17.1 Validation

AI Result（AI 結果）必須經過 Result Validation（結果驗證）。

驗證包括：

- Schema Validation（結構驗證）
- Permission Validation（權限驗證）
- Resource Validation（資源驗證）
- Data Integrity Check（資料完整性檢查）

---

## 17.2 Invalid Result

如果 AI Result 不符合規格：

- 不寫入正式教材
- 不覆蓋原始資料
- 標記 Processing Failed（處理失敗）
- 保留錯誤資訊

---

# 18. Teaching Material Protection

## 18.1 Original Material

Original Teaching Material（原始教材）必須受到保護。

AI 不得直接覆蓋：

- Book（教材）
- Lesson（課程）
- Page（頁面）
- Text Block（文字區塊）
- Image Asset（圖片資產）

---

## 18.2 AI Generated Result

AI Generated Result（AI 產生結果）與正式 Teaching Material（教學教材）必須分離。

只有符合產品流程的結果才能進入正式教材。

---

# 19. Image Area Boundary

## 19.1 Image Area

Image Area（圖片區域）負責：

- Image（圖片）
- PDF（PDF）
- Hotspot（互動熱點）
- Image Asset（圖片資產）
- Image Processing（圖片處理）
- Coordinate Transformation（座標轉換）

---

## 19.2 Text Area Boundary

Text Area（文字區域）是文字編輯區域。

Text Area 不負責：

- PDF Processing（PDF 處理）
- Image Processing（圖片處理）
- Hotspot Processing（互動熱點處理）

AI 不得混合 Image Area 與 Text Area 的責任。

---

# 20. PDF Boundary

## 20.1 PDF Role

PDF 的主要責任是 Fixed Presentation（固定呈現）。

PDF 不應被 AI 任意改寫。

---

## 20.2 AI Processing

如果 PDF 需要 OCR 或文字偵測：

PDF
↓
Processing Layer（處理層）
↓
OCR / Document Text Detection
↓
Processing Result

不得直接破壞原始 PDF。

---

# 21. AI and TTS

## 21.1 Speech Responsibility

MagicBook MVP（最小可行產品）不建立自製 TTS Engine（文字轉語音引擎）。

---

## 21.2 Device TTS

Pronunciation（發音）使用 Device / Browser TTS（裝置／瀏覽器文字轉語音）。

MagicBook AI 不負責自行建立完整語音生成系統。

---

# 22. AI and Hotspot

## 22.1 Hotspot

Hotspot（互動熱點）是 Image Area（圖片區域）的互動資料。

---

## 22.2 AI Hotspot Generation

AI 可以協助：

- 找出文字
- 找出文字區域
- 建立候選 Hotspot
- 建立相關 Context

但正式 Hotspot Data（互動熱點資料）仍必須符合系統資料規則。

---

# 23. AI and Navigation

## 23.1 Navigation Context

AI 可以在已授權 Context（上下文）內協助：

- 搜尋教材
- 搜尋 Lesson（課程）
- 搜尋 Page（頁面）
- 搜尋 Content（內容）

---

## 23.2 Navigation Boundary

AI Navigation（AI 導航）不得跨 User Account（使用者帳戶）。

---

# 24. AI and User Request

## 24.1 Request

User Request（使用者要求）必須先判斷：

- 使用者身份
- User Account（使用者帳戶）
- Resource（資源）
- Permission（權限）
- Task Type（任務類型）

---

## 24.2 Ambiguous Request

如果要求無法確認：

AI 不得自行猜測並修改正式資料。

應要求使用者確認。

---

# 25. AI Automation

## 25.1 Automation Rule

AI Automation（AI 自動化）只能執行已定義的 Processing Type（處理類型）。

不得自行新增產品功能。

---

## 25.2 Background Processing

需要較長時間的 AI Processing（AI 處理）可以使用 Background Processing（背景處理）。

Background Processing 不得阻塞主要 UI Flow（使用者介面流程）。

---

## 25.3 Processing Result

Background Processing 完成後：

Processing Result
↓
Validation
↓
可用結果

失敗：

Processing Result
↓
Error State

---

# 26. AI Performance

## 26.1 Background Processing

較長時間的 AI Processing 應優先使用 Background Processing（背景處理）。

---

## 26.2 Caching

可重複使用且安全的 AI Processing Result（AI 處理結果）可以使用 Cache（快取）。

Cache 不得造成：

- User Account Data Leakage（使用者帳戶資料洩漏）
- Cross Account Access（跨帳戶存取）
- Stale Result（過期結果）誤用

---

## 26.3 Optimization

AI Processing 應優先：

- Optimize Input（最佳化輸入）
- Reduce Duplicate Processing（減少重複處理）
- Cache Safe Results（快取安全結果）
- Background Processing（背景處理）

---

# 27. AI Cost Control

## 27.1 Provider Usage

AI Provider 使用應避免：

- 不必要的重複請求
- 重複 OCR
- 重複 AI Analysis（AI 分析）
- 不必要的大型 Context（上下文）

---

## 27.2 Context Size

Context（上下文）應保持在完成任務所需的最小範圍。

---

# 28. AI Change Control

## 28.1 PM Review

任何 AI Architecture Change（AI 架構變更）若影響：

- Product Function（產品功能）
- User Flow（使用者流程）
- Data Model（資料模型）
- API
- Permission
- Teaching Material

必須先經 PM Review（產品經理審查）。

---

## 28.2 Provider Replacement

更換 Provider 不得影響：

- Teaching Material（教學教材）
- User Account Data（使用者帳戶資料）
- Data Model（資料模型）
- API Contract（API 契約）
- User Flow（使用者流程）

---

# 29. Reuse Before Reinvent

## 29.1 Engineering Rule

遇到 AI 相關新需求：

先確認現有技術。

優先使用：

- Existing Provider（現有服務供應商）
- Existing API（現有 API）
- Existing Processing Pipeline（現有處理流程）
- Existing Component（現有元件）
- Existing Data Model（現有資料模型）

不得因為新需求就直接建立新的 AI System（AI 系統）。

---

# 30. Integration Checklist

## 30.1 AI Integration

- [ ] User Account Permission（使用者帳戶權限）
- [ ] Context Validation（上下文驗證）
- [ ] Provider Adapter（服務供應商介面）
- [ ] Provider Credential Security（服務供應商憑證安全）
- [ ] Result Validation（結果驗證）
- [ ] Error Handling（錯誤處理）
- [ ] Background Processing（背景處理）
- [ ] Cache Safety（快取安全）
- [ ] User Account Data Isolation（使用者帳戶資料隔離）

---

## 30.2 Image Processing Integration

- [ ] Image Quality Check
- [ ] Auto Correction
- [ ] OCR
- [ ] Text + Bounding Box
- [ ] Coordinate Transformation
- [ ] Hotspot Generation
- [ ] HTML Overlay
- [ ] Image Storage Rule
- [ ] Error Handling

---

# 31. AI Security Checklist

- [ ] User Account Boundary（使用者帳戶邊界）
- [ ] Permission Check（權限檢查）
- [ ] Resource Ownership（資源歸屬）
- [ ] No Cross Account Access（禁止跨帳戶存取）
- [ ] Provider Credential Protection（服務供應商憑證保護）
- [ ] API Key Protection（API 金鑰保護）
- [ ] AI History Isolation（AI 歷史紀錄隔離）
- [ ] Processing Job Isolation（處理工作隔離）
- [ ] Error Information Protection（錯誤資訊保護）

---

# 32. AI Data Ownership Rules

## 32.1 User Data

User Data（使用者資料）屬於 User Account（使用者帳戶）。

---

## 32.2 Teaching Material

Teaching Material（教學教材）屬於其資料擁有者。

AI 不得因為處理教材而取得教材所有權。

---

## 32.3 AI History

AI History（AI 歷史紀錄）屬於對應 User Account（使用者帳戶）的 AI 使用資料。

---

## 32.4 Processing Result

Processing Result（處理結果）在通過驗證與正式流程前，不得視為正式教材。

---

# 33. AI Architecture Boundaries

AI 不負責：

- User Account Authentication（使用者帳戶身份驗證）的核心實作
- Database Schema（資料庫結構）的自行設計
- Product Permission Model（產品權限模型）的自行修改
- UI Design（介面設計）的自行決定
- Teaching Material Ownership（教材所有權）的自行決定
- API Contract（API 契約）的自行修改

AI 必須透過既有 Architecture Boundary（架構邊界）工作。

---

# 34. AI Development Rules

## 34.1 No Scope Expansion

AI Developer 不得自行新增：

- 新產品功能
- 新 AI Feature（AI 功能）
- 新資料表
- 新 API
- 新權限
- 新 User Flow（使用者流程）

除非已經由 PM 確認。

---

## 34.2 Existing Technology First

任何新 AI 需求：

先確認現有技術
↓
確認是否可以重用
↓
確認是否需要新增 Adapter
↓
確認是否需要新增 Processing Type
↓
PM Review

---

## 34.3 Architecture Consistency

AI Design 必須與以下文件保持一致：

- Product Specification（產品規格）
- MVP Development（MVP 開發規格）
- Database Design（資料庫設計）
- API Design（API 設計）
- Editor Design（編輯器設計）
- UI Design（UI 設計）

---

## 34.4 Integration

AI Integration（AI 整合）必須確認：

- [ ] User Account Data Isolation
- [ ] Permission Check
- [ ] Provider Adapter
- [ ] Processing Job
- [ ] Result Validation
- [ ] Error Handling
- [ ] Background Processing
- [ ] Cache Safety
- [ ] Teaching Material Protection

---

# 35. AI Change Control

## 35.1 PM Review

任何 AI Architecture Change（AI 架構變更）若影響：

- Product Function（產品功能）
- User Flow（使用者流程）
- Data Model（資料模型）
- API
- Permission
- Teaching Material

必須先經 PM Review（產品經理審查）。

---

## 35.2 Documentation Update

AI Architecture 發生正式變更時，必須同步更新：

- AI Design
- API Design
- Database Design
- MVP Development
- Change Log

不得只修改程式碼而不更新文件。

---

# 36. Change Log

## Version 1.3

Date: 2026-08-09

本版本重新整理 AI Design（AI 設計）全文，統一目前 MagicBook 3.0 架構。

主要變更：

- 移除 Workspace 作為 AI 資料歸屬與權限邊界的舊架構
- 統一 User Account（使用者帳戶）為資料歸屬與隔離邊界
- 統一 User Account Permission（使用者帳戶權限）
- 統一 AI Context（AI 上下文）規則
- 統一 AI History（AI 歷史紀錄）資料歸屬
- 統一 Processing Job（處理工作）資料隔離
- 統一 AI Data Access（AI 資料存取）
- 統一 AI Security（AI 安全）
- 統一 Provider Replacement（服務供應商替換）規則
- 統一 OCR Processing（OCR 處理）流程
- 加入 Text + Bounding Box（文字與文字區域）
- 加入 Coordinate Transformation（座標轉換）
- 統一 Hotspot Generation（互動熱點產生）
- 明確區分 Processing Result（處理結果）與 Teaching Material（教學教材）
- 明確區分 Image Area（圖片區域）與 Text Area（文字區域）
- 明確定義 PDF（固定呈現）與 AI Processing（AI 處理）的責任邊界
- 明確定義 AI Failure（AI 失敗）與 Reliable Failure（可控失敗）
- 明確定義 Background Processing（背景處理）與 Cache（快取）
- 明確禁止 AI 自行擴張產品 Scope（範圍）
- 明確加入 PM Review（產品經理審查）
- 移除舊版本中重複、矛盾及過時的 Workspace 規則

本版本不新增產品功能。

本版本不新增 Database Schema（資料庫結構）。

本版本不新增 API Scope（API 範圍）。

本版本主要目的為：

**使 AI Design 與 MagicBook 3.0 現行產品、資料庫、API 及使用者權限架構保持一致。**
