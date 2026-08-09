# MagicBook 3.0 AI Design

Version: 1.1
Status: Draft
Document Owner: Teresa Su
Product Manager: ChatGPT
Technical Lead: 阿德
Last Update: 2026-08-09

---

# Table of Contents

0. AI Design Purpose
1. AI Design Principles
2. AI Scope
3. AI Architecture
4. AI Module
5. AI Provider Architecture
6. AI Conversation
7. Prompt Manager
8. AI History
9. AI Settings
10. AI Automation
11. Image Quality Check
12. Auto Correction
13. Re-Quality Check
14. OCR
15. OCR Provider
16. OCR Result
17. Hotspot Generator
18. Hotspot Coordinate Transformation
19. Reliable Failure
20. Image Processing Data
21. Processing Job
22. Background Processing
23. AI and Teaching Material Separation
24. AI and Text Area Boundary
25. AI and HTML Overlay
26. AI and Reading Mode
27. AI User Experience
28. AI Security
29. AI Performance
30. Provider Replacement
31. Reuse Before Reinvent
32. AI Development Boundaries
33. AI Testing and Validation
34. AI Completion Criteria
35. AI Change Control
36. Change Log

---

# 0. AI Design Purpose

## 0.1 Purpose

本文件定義 MagicBook 3.0 的 AI Design（AI 設計）。

AI 在 MagicBook 3.0 中包含兩個不同層次：

1. AI Module（AI 模組）
2. AI Automation（AI 自動化流程）

兩者都屬於產品工具（Tool），不是教材本身。

---

## 0.2 AI Module

AI Module 負責使用者主動使用的 AI 工具，包括：

- AI Panel（AI 面板）
- Prompt Manager（提示管理器）
- Conversation（對話）
- History（歷史）
- AI Settings（AI 設定）
- AI Provider Interface（AI 服務供應商介面）

---

## 0.3 AI Automation

AI Automation 負責教材匯入後的自動化處理流程。

目前已確認流程：

Image Import
↓
Image Quality Check
↓
必要時 Auto Correction
↓
Re-Quality Check
↓
OCR
↓
Hotspot Generator
↓
HTML Overlay
↓
Hotspot

這條流程屬於已確認的 MVP Engineering Architecture（MVP 工程架構）。

---

## 0.4 Source of Truth

AI Design 必須遵循以下正式文件：

1. Product Specification（產品規格）
2. MVP Development（MVP 開發規格）
3. Roadmap（開發路線圖）
4. Development Guidelines（開發規範）
5. Database Design（資料庫設計）
6. API Design（API 設計）

衝突處理優先順序：

> Product Specification → MVP Development → Roadmap → Development Guidelines → Database Design → API Design → AI Design

AI Design 不得自行覆寫較高優先級的正式文件。

---

# 1. AI Design Principles

## 1.1 Teaching Material First

Teaching Material（教材）永遠是產品核心。

AI：

- 不取代教材
- 不擁有教材
- 不應破壞教材
- 不應自行改變教材原始內容

AI 是協助教材使用的 Tool（工具）。

---

## 1.2 AI Is a Tool

AI 不應成為產品資料架構的最高層級。

核心資料仍然屬於：

Workspace
↓
Book
↓
Lesson
↓
Page
↓
Content

AI Processing Data（AI 處理資料）屬於處理流程中的資料。

---

## 1.3 Replaceable Provider

AI Provider（AI 服務供應商）必須可替換。

核心架構不得直接綁定：

- Claude
- GPT
- Gemini
- OpenRouter
- Future Providers

更換 Provider 不應改變：

- 教材資料
- Workspace
- 核心 API
- 使用者操作流程

---

## 1.4 Reliable Failure

如果 AI 或自動化流程無法可靠完成：

> Reliable Failure（可靠失敗）優於錯誤成功。

系統不得：

- 猜測內容
- 建立猜測性 Hotspot
- 把不可靠結果標記為 SUCCESS
- 用錯誤結果覆蓋正式教材

---

## 1.5 Minimum Necessary Processing

AI Automation 不應對所有圖片執行所有處理。

只執行必要處理。

目的：

- 降低 Processing Time（處理時間）
- 降低 Background Processing（背景處理）負擔
- 避免不必要影像處理
- 維持結果可靠性

---

## 1.6 Background Processing

耗時工作應使用 Background Processing。

包括：

- Denoise（去雜訊）
- OCR
- AI
- Image Processing（影像處理）
- Compression（壓縮）
- Optimization（最佳化）

不得因耗時 AI / Image Processing 工作造成主要 UI Flow（使用者流程）阻塞。

---

## 1.7 Reuse Before Reinvent

AI 相關工程同樣遵循：

Reuse Before Reinvent（先利用現有技術，再考慮自行開發）。

優先順序：

1. OS / Device Existing Capability（作業系統／裝置既有能力）
2. Browser Existing Capability（瀏覽器既有能力）
3. HTML / CSS / JavaScript Native Capability（原生能力）
4. Mature Open Source Library（成熟開源函式庫）
5. Mature Third-party Tool / Service（成熟第三方工具／服務）
6. 最後才評估 Custom Development（自行開發）

不得因 AI 功能而自行重新發明已存在的成熟技術。

---

# 2. AI Scope

## 2.1 MVP AI Scope

MVP 包含：

- AI Module
- AI Provider Interface
- AI Conversation
- Prompt Manager
- AI History
- AI Settings
- AI Automation
- Image Quality Check
- Auto Correction
- Re-Quality Check
- OCR
- OCR Provider Adapter
- Hotspot Generator
- Background Processing
- Reliable Failure
- Processing Image Rule
- Hotspot Coordinate Transformation

---

## 2.2 AI Provider Types

目前產品規格已確認的 AI Provider 類型：

- Claude
- GPT
- Gemini
- OpenRouter
- Future Providers

本文件不提前鎖定：

- API Key implementation（API 金鑰實作）
- Provider-specific request schema（Provider 專用請求結構）
- Model-specific prompt format（模型專用提示格式）
- Provider-specific database schema（Provider 專用資料庫結構）

---

## 2.3 OCR Scope

OCR 是 AI Automation Pipeline 的正式部分。

MVP 已核定：

Google Cloud Vision API
+
DOCUMENT_TEXT_DETECTION

OCR 必須透過 Replaceable Provider Adapter（可替換服務供應商介面層）。

---

## 2.4 Out of Scope

目前不建立：

- MagicBook Camera System（MagicBook 專用相機系統）
- 自製 OCR Algorithm（自製 OCR 演算法）
- 自製 AI Model（自製 AI 模型）
- 未核定的新 Image Editor（圖片編輯器）
- 未核定的新 Image Processing Algorithm（影像處理演算法）
- 未核定的新 Threshold（門檻）
- 未核定的新 AI Provider
- 未核定的新 AI Product Feature（AI 產品功能）

---

# 3. AI Architecture

## 3.1 Two AI Layers

MagicBook AI Architecture（AI 架構）分成：

### Layer A — User AI

使用者主動呼叫：

AI Panel
↓
Prompt Manager
↓
AI Provider
↓
Response

### Layer B — AI Automation

系統自動處理：

Image Import
↓
Quality Check
↓
Auto Correction
↓
Re-Quality Check
↓
OCR
↓
Hotspot Generator
↓
HTML Overlay
↓
Hotspot

兩者共享 Provider Architecture（服務供應商架構），但責任不同。

---

## 3.2 Core Architecture

AI Architecture 不得成為教材資料架構。

核心關係：

Teaching Material
+
AI Tool
+
AI Processing

三者保持責任分離。

---

## 3.3 AI Provider Adapter

架構：

Core AI API
↓
Provider Adapter
↓
Provider

Provider Adapter 負責：

- Provider Request Mapping（請求轉換）
- Provider Response Mapping（回應轉換）
- Provider Error Mapping（錯誤轉換）

Core AI API 不直接依賴 Provider-specific implementation。

---

# 4. AI Module

## 4.1 Responsibility

AI Module 負責：

- AI Panel
- Conversation
- Prompt
- History
- Settings
- Provider Interface

---

## 4.2 AI Panel

AI Panel 是使用者主動使用 AI 的主要入口。

AI Panel 不應直接修改教材。

---

## 4.3 Conversation

Conversation（對話）保存使用者與 AI 的對話上下文。

Conversation 不等於 Teaching Material。

---

## 4.4 History

History（歷史）保存已確認的 AI Conversation History（AI 對話歷史）。

History 不應自動變成教材內容。

---

# 5. AI Provider Architecture

## 5.1 Provider Independence

核心 AI Module 不得綁定單一 Provider。

Provider 可以被替換，而不應影響：

- 教材
- Workspace
- API
- UI
- Data Model

---

## 5.2 Provider Interface

Provider Interface（服務供應商介面）提供共同能力。

實際 Provider-specific implementation 於工程階段處理。

---

## 5.3 Provider Failure

Provider 發生：

- Timeout（逾時）
- Network Failure（網路失敗）
- Rate Limit（速率限制）
- Service Failure（服務失敗）

不得造成正式教材資料損壞。

---

# 6. AI Conversation

## 6.1 Conversation Flow

User
↓
AI Panel
↓
Prompt Manager
↓
Provider Adapter
↓
AI Provider
↓
Response
↓
Conversation History

---

## 6.2 Context

AI 可以取得已授權的 Context（上下文）。

Context 必須遵循 Workspace Permission（工作空間權限）。

不得跨 Workspace 取得資料。

---

## 6.3 Response

AI Response（AI 回應）首先屬於 Tool Output（工具輸出）。

除非使用者明確將內容加入教材，否則不得自動成為 Teaching Material。

---

# 7. Prompt Manager

## 7.1 Responsibility

Prompt Manager 負責：

- Prompt Management（提示管理）
- Prompt Organization（提示整理）
- Prompt Execution Context（提示執行上下文）

---

## 7.2 Prompt Separation

Prompt 不等於教材資料。

Prompt 可以引用教材 Context，但不得改變教材原始資料。

---

## 7.3 Provider Independence

Prompt Manager 不應把 Prompt 永久綁定單一 Provider。

Provider 更換後，核心 Prompt Management 架構仍應存在。

---

# 8. AI History

## 8.1 Responsibility

AI History 負責：

- Conversation History
- AI Interaction Record（AI 互動紀錄）

---

## 8.2 Data Ownership

AI History 屬於目前 Workspace 的 AI 使用資料。

不得跨 Workspace 讀取。

---

## 8.3 Teaching Material Separation

AI History 不應自動成為：

- Book
- Lesson
- Page
- Text Block
- Image Asset

---

# 9. AI Settings

## 9.1 Responsibility

AI Settings（AI 設定）負責已確認的 AI 使用設定。

包括：

- AI Provider
- AI-related Preferences（AI 相關偏好）
- AI Usage Configuration（AI 使用設定）

---

## 9.2 Provider Setting

使用者可以依產品規格使用已支援的 Provider。

實際 Provider Credential（服務憑證）管理依 Authentication / Security Architecture 執行。

---

# 10. AI Automation

## 10.1 Purpose

AI Automation 的目的：

將使用者提供的教材圖片，轉換為：

- 可讀取
- 可辨識
- 可建立互動內容

的教材處理結果。

---

## 10.2 Official Pipeline

正式流程：

Image Import
↓
Image Quality Check
↓
必要時 Auto Correction
↓
Re-Quality Check
↓
OCR
↓
Hotspot Generator
↓
HTML Overlay
↓
Hotspot

這條 Pipeline 是已確認的產品行為。

---

## 10.3 Quality Check Is Not Reject-only

Quality Check 不只是 Reject System（拒絕系統）。

如果圖片可以透過 Auto Correction 改善：

Quality Check
↓
Auto Correction
↓
Re-Quality Check

而不是直接：

Quality Check
↓
Reject

---

## 10.4 Full Pipeline Principle

Technical Benchmark 已確認：

| Pipeline | SUCCESS | PARTIAL | FAIL |
| --- | ---: | ---: | ---: |
| Baseline | 40.0% | 33.3% | 26.7% |
| Quality Check Only | 33.3% | 26.7% | 40.0% |
| Full Pipeline | 73.3% | 13.3% | 13.3% |

因此正式產品方向為：

> Quality Check 與 Auto Correction 應視為同一套自動化 Pipeline。

Benchmark 數字是 Technical Evidence（技術證據），不得直接被當成正式 Threshold。

---

# 11. Image Quality Check

## 11.1 Responsibility

Image Quality Check（圖片品質檢查）負責判斷：

- 是否需要修正
- 是否可以繼續
- 是否需要重新檢查
- 是否已經無法可靠處理

---

## 11.2 Quality States

目前使用：

- SUCCESS
- PARTIAL
- FAIL

Quality State 不得被誤解為單純的 UI 狀態。

---

## 11.3 Blur

Severe Blur（嚴重模糊）目前視為：

不可可靠救援。

因此：

> 嚴重模糊可以成為 FAIL 情境。

Sharpen 不能被宣稱可以恢復嚴重模糊。

---

## 11.4 Skew

Skew（傾斜）應進入：

Skew Detection
↓
Deskew
↓
Re-Quality Check

目前實測 Deskew 可以救回部分中高角度傾斜情境。

---

## 11.5 Noise

Noise（雜訊）判斷不得只依賴 Contrast（對比度）。

Denoise Trigger 必須同時具備：

Low Quality Evidence
+
Independent Noise Evidence

才可觸發。

---

## 11.6 Brightness and Contrast

Brightness（亮度）與 Contrast（對比度）不得單獨作為 Reject Condition（拒絕條件）。

Contrast 偏低不得單獨觸發 Denoise。

---

## 11.7 Quality Check Output

Quality Check Result（品質檢查結果）應能支持後續決策：

- Continue
- Auto Correction
- Re-Quality Check
- Partial
- Fail

Threshold 的正式數值若尚未核定，不得在 AI Design 中自行決定。

---

# 12. Auto Correction

## 12.1 Responsibility

Auto Correction（自動修正）負責必要的影像修正。

目前正式保留：

- Deskew
- Denoise
- Sharpen

---

## 12.2 Deskew

Deskew 用於修正影像傾斜。

流程：

Skew Detection
↓
Deskew
↓
Re-Quality Check

如果修正後仍不可靠：

FAIL。

---

## 12.3 Denoise

Denoise 用於改善雜訊。

實測：

- 低光源＋雜訊情境可顯著改善
- 約 1360ms / 張

因此：

> Denoise 必須使用 Background Processing。

---

## 12.4 Sharpen

Sharpen：

- 可改善輕微模糊
- 無法恢復嚴重模糊
- 成本低
- 約 16ms 的技術測試結果

不得宣稱 Sharpen 已證實能提升整體 End-to-End Success。

---

## 12.5 CLAHE

CLAHE（對比度受限自適應直方圖均衡化）目前不列入主要 Auto Correction Pipeline。

原因：

本次低光源＋雜訊測試沒有實質改善。

---

## 12.6 Minimum Necessary Correction

不得對所有圖片固定執行：

Deskew
+
Denoise
+
Sharpen

應根據 Quality Check 結果只執行必要修正。

---

# 13. Re-Quality Check

## 13.1 Mandatory

Auto Correction 完成後：

> 必須執行 Re-Quality Check（重新品質檢查）。

不得：

Auto Correction
↓
直接假設 SUCCESS。

---

## 13.2 Decision

Re-Quality Check 結果：

### SUCCESS

可以進入下一階段。

### PARTIAL

可以回傳部分結果，但不得假裝完全可靠。

### FAIL

不得繼續建立猜測性 Hotspot。

---

## 13.3 User Adjustment

如果使用者：

- 調整圖片
- 重新拍攝
- 重新選擇圖片

完成後必須重新進入完整 Quality Check Pipeline。

---

# 14. OCR

## 14.1 Responsibility

OCR（Optical Character Recognition，光學字元辨識）負責：

- Text Recognition（文字辨識）
- Bounding Box（文字邊界框）

---

## 14.2 OCR Position in Pipeline

OCR 必須發生在：

Quality Check
↓
Auto Correction（必要時）
↓
Re-Quality Check
↓
OCR

不得在圖片品質仍不可靠時直接進入正式 OCR 流程。

---

## 14.3 OCR Does Not Replace Text Area

OCR Result 不得自動寫入 Text Area。

Text Area 是獨立的 Text-only Editing Area（純文字編輯區）。

---

## 14.4 OCR Result

OCR Result 至少提供：

- Text
- Bounding Box

後續 Hotspot Generator 使用 OCR Result 建立互動內容。

---

# 15. OCR Provider

## 15.1 Confirmed Provider

MVP 已核定：

Google Cloud Vision API

使用：

DOCUMENT_TEXT_DETECTION

---

## 15.2 Provider Adapter

架構：

OCR Core
↓
OCR Provider Adapter
↓
Google Cloud Vision API

未來可以替換 Provider。

---

## 15.3 Provider Independence

核心資料不得直接綁死：

Google API

Provider 更換不得造成：

- 教材資料損壞
- Workspace 資料損壞
- Hotspot 資料損壞
- API Architecture 破壞

---

# 16. OCR Result

## 16.1 Intermediate Result

OCR Result 屬於 Processing Result（處理結果）。

不是正式教材資產。

---

## 16.2 Text

Text 是 OCR 辨識結果。

---

## 16.3 Bounding Box

Bounding Box 是 OCR 辨識出的文字位置。

它主要提供給：

Hotspot Generator

使用。

---

## 16.4 Reliability

OCR 如果無法可靠辨識：

- 不得猜測
- 不得產生錯誤 Hotspot
- 應回傳 PARTIAL 或 FAIL

---

# 17. Hotspot Generator

## 17.1 Responsibility

Hotspot Generator（熱點產生器）負責：

根據：

- OCR Text
- Bounding Box
- Page / Image Context

建立 Hotspot。

---

## 17.2 Generator Flow

OCR
↓
Text + Bounding Box
↓
Coordinate Transformation（必要時）
↓
Hotspot Generator
↓
HTML Overlay
↓
Hotspot

---

## 17.3 Reliable Generation

Hotspot Generator 只有在結果可靠時才能建立正式 Hotspot。

不可靠時：

> Reliable Failure 優於錯誤成功。

---

## 17.4 No Guessing

不得：

- 猜測文字位置
- 猜測文字內容
- 猜測 Hotspot
- 以不可靠結果標記 SUCCESS

---

# 18. Hotspot Coordinate Transformation

## 18.1 Problem

Auto Correction 可能改變圖片幾何。

例如：

Deskew。

OCR 在 Processed Image（處理後圖片）上取得的座標，不一定等於：

Final Display Coordinates（最終顯示座標）。

---

## 18.2 Required Flow

Processed Coordinates
↓
Coordinate Transform
↓
Final Display Coordinates
↓
Hotspot

---

## 18.3 Requirement

Hotspot 必須正確對應使用者實際看到的教材圖片。

不得出現：

圖片已修正
+
Hotspot 位置錯誤

---

# 19. Reliable Failure

## 19.1 Principle

MagicBook 的 AI Automation 採：

> Reliable Failure 優於錯誤成功。

---

## 19.2 Failure Conditions

如果：

- OCR 不可靠
- Image Quality 不可靠
- Auto Correction 後仍不可靠
- Hotspot Coordinate 無法可靠轉換
- Provider 發生不可恢復錯誤

不得產生猜測性結果。

---

## 19.3 Result States

可以使用：

- SUCCESS
- PARTIAL
- FAIL

實際 API Error Code（錯誤代碼）依 API Design。

---

## 19.4 Manual Fallback

自動化失敗時：

使用者可以：

- 重新拍攝
- 重新選擇圖片
- 手動建立互動內容

MagicBook 不因 AI Automation 失敗而阻止使用者手動完成教材。

---

# 20. Image Processing Data

## 20.1 Processing Image

Processed Image（處理後圖片）是中間資料。

用途：

- OCR
- AI
- Hotspot Generator

---

## 20.2 No Second Teaching Asset

Processed Image：

不得形成第二份教材圖片資產。

不得自動建立新的 Page Image。

---

## 20.3 Rejected Image

如果 Quality Check 判定：

FAIL
+
不可可靠處理

不得因處理流程建立永久教材資產。

MagicBook 不是使用者照片倉庫。

---

## 20.4 Teaching Material Asset

只有使用者真正確認為教材內容的圖片：

才成為 Page 的 Teaching Material Asset（教材資產）。

---

# 21. Processing Job

## 21.1 Responsibility

AI Processing Job（AI 處理工作）負責追蹤耗時自動化工作。

---

## 21.2 Job States

目前使用：

- Pending
- Processing
- Completed
- Failed

---

## 21.3 Job Context

Processing Job 必須具有：

- Workspace Context
- Source Resource
- Processing Type

---

## 21.4 Processing Type

已確認的處理類型包括：

- Image Quality Check
- Auto Correction
- OCR
- AI
- Image Optimization
- Image Compression

實際 Job Type 於 API Implementation（API 實作）階段統一。

---

# 22. Background Processing

## 22.1 Required Background Work

以下工作應使用 Background Processing：

- Denoise
- OCR
- AI
- Image Processing
- Compression
- Optimization

---

## 22.2 UI

長時間工作應提供：

- Pending
- Processing
- Completed
- Failed

等可理解的狀態。

---

## 22.3 No UI Blocking

AI Automation 不得讓主要 Editor / Reading Flow 長時間 Freeze（凍結）。

---

# 23. AI and Teaching Material Separation

## 23.1 Separation

AI Processing Data 與 Teaching Material Data 必須分離。

---

## 23.2 AI Cannot Rewrite Material

AI 不得直接：

- 修改 Original Teaching Material
- 覆蓋 Image Asset
- 覆蓋 Text Block
- 修改 Page Structure

除非未來另有正式 PM Decision。

---

## 23.3 User Confirmation

AI Result 如果要成為正式教材內容：

必須經過已確認的使用者操作流程。

---

# 24. AI and Text Area Boundary

## 24.1 Text Area

Text Area 是：

Text-only Editing Area（純文字編輯區）。

---

## 24.2 OCR Boundary

OCR 不屬於 Text Area。

OCR 由 AI Automation / OCR Module 處理。

---

## 24.3 No Automatic Replacement

OCR / AI Result 不得自動取代正式 Text Block。

---

# 25. AI and HTML Overlay

## 25.1 Overlay Responsibility

HTML Overlay 是：

Interactive Layer（互動層）。

---

## 25.2 AI Result

AI Automation 可以產生：

Hotspot

Hotspot 最終建立於：

HTML Overlay Layer。

---

## 25.3 Material Protection

HTML Overlay 不得直接修改：

Original Teaching Material。

AI 產生互動內容必須保持：

Material
≠
Interaction Data

---

# 26. AI and Reading Mode

## 26.1 Reading Mode

Reading Mode（閱讀模式）可以使用：

- Hotspot
- Dictionary
- AI
- Audio
- Video
- Navigation

---

## 26.2 AI Does Not Modify Material

Reading Mode 中的 AI 使用：

不得直接修改正式教材。

---

## 26.3 Same Data Model

Editor Mode 與 Reading Mode 使用同一份教材資料。

AI 不得建立第二套教材資料模型。

---

# 27. AI User Experience

## 27.1 User Should Not Need Technical Knowledge

使用者不需要知道：

- AI
- OCR
- Confidence
- Bounding Box
- Model
- Provider
- Quality Check

等技術細節。

---

## 27.2 Photo Quality Failure

已確認 UX 文案：

「⚠️ 照片品質不足」

「請重新拍攝清晰、光線充足的照片」

「[知道了]」

---

## 27.3 Automatic Interaction Failure

已確認 UX 文案：

「⚠️ 無法自動建立互動內容」

「你可以重新拍攝，或直接手動建立互動內容」

「[重新拍攝] [手動建立]」

---

## 27.4 Simple Experience

AI Automation 的複雜度應留在系統內部。

使用者看到的是：

Import
↓
Processing
↓
Result

而不是：

Quality Metric
↓
Model
↓
Provider
↓
Confidence
↓
Algorithm

---

# 28. AI Security

## 28.1 Workspace Isolation

AI Request（AI 請求）必須遵守 Workspace Isolation（工作空間隔離）。

---

## 28.2 Provider Credential

Provider Credential 不得暴露給一般使用者。

---

## 28.3 AI Data Access

AI 只能取得：

- 已授權資料
- 當前 Workspace 資料
- 已確認可供 AI 使用的 Context

---

## 28.4 Error Security

錯誤不得洩漏：

- API Key
- Secret
- Internal Stack Trace
- Provider Secret
- Internal Database Structure

---

# 29. AI Performance

## 29.1 Background Processing

AI / OCR / Denoise 等耗時工作應在背景執行。

---

## 29.2 Minimum Necessary Processing

不要對所有圖片執行所有 Auto Correction。

---

## 29.3 Processing Time

已知技術測試：

- Denoise 約 1360ms / 張
- Sharpen 約 16ms

這些數字屬於 Technical Evidence。

不得直接視為未來正式 SLA（服務等級協議）。

---

## 29.4 Performance Optimization

優化方向：

- 避免不必要處理
- Background Processing
- Provider Adapter
- Processing Job
- Cache / Reuse 已存在結果時的能力

任何新的 Cache Behavior（快取行為）若涉及產品資料或資料生命週期，仍需依正式規格確認。

---

# 30. Provider Replacement

## 30.1 General Architecture

Core AI
↓
Provider Adapter
↓
Provider

---

## 30.2 AI Provider

目前支援類型：

- Claude
- GPT
- Gemini
- OpenRouter
- Future Providers

---

## 30.3 OCR Provider

目前 MVP 已核定：

Google Cloud Vision API
+
DOCUMENT_TEXT_DETECTION

---

## 30.4 Replacement Requirement

Provider 更換不得影響：

- Teaching Material
- Workspace
- Data Model
- API Contract
- User Flow

---

# 31. Reuse Before Reinvent

## 31.1 Engineering Rule

遇到 AI 相關新需求：

先確認現有技術。

優先順序：

1. OS / Device Existing Capability
2. Browser Existing Capability
3. HTML / CSS / JavaScript Native Capability
4. Mature Open Source Library
5. Mature Third-party Tool / Service
6. Custom Development

---

## 31.2 Image Example

如果需求是：

- 拍照
- 圖片調整
- 圖片裁切
- 圖片處理

不得直接建立新的：

- Camera System
- Image Editor
- Image Processing Algorithm

必須先確認現有能力。

---

## 31.3 AI Example

如果需求已存在成熟：

- OCR Service
- AI Provider
- Image Processing Library

不得先自行重建同類能力。

---

# 32. AI Development Boundaries

## 32.1 No Camera System

AI Design 不授權建立：

- getUserMedia()
- ImageCapture
- Exposure Control
- Focus Control
- HDR Control
- Camera Preview
- MagicBook Camera System

使用者拍照由裝置既有相機完成。

MagicBook 從 Image Import 開始。

---

## 32.2 No Custom OCR Algorithm

MVP 使用：

Google Cloud Vision API

不得因為 OCR 需求自行建立完整 OCR Engine（OCR 引擎）。

---

## 32.3 No Unapproved Threshold

不得自行決定：

- Blur Threshold
- Skew Threshold
- Noise Threshold
- Contrast Threshold
- Auto Correction Trigger Threshold

正式數值必須經 PM Decision 核定。

---

## 32.4 No Scope Expansion

不得因 AI Design 自行新增：

- 新 AI Feature
- 新 Provider
- 新 Processing Pipeline
- 新 Database Schema
- 新 UI Flow
- 新 Image Editor
- 新 Camera System

---

## 32.5 No Production Assumption From Benchmark

Benchmark 可以提供 Technical Evidence。

但：

Benchmark Result
≠
Production Threshold

Benchmark Result
≠
Production SLA

Benchmark Result
≠
未經核定的產品規則。

---

# 33. AI Testing and Validation

## 33.1 Testing Principle

AI Testing（AI 測試）必須驗證：

- Correctness（正確性）
- Reliability（可靠性）
- Failure Handling（失敗處理）
- Processing Flow（處理流程）
- Provider Failure
- Data Protection
- Coordinate Accuracy

---

## 33.2 Pipeline Testing

至少驗證：

Image Import
↓
Quality Check
↓
Auto Correction
↓
Re-Quality Check
↓
OCR
↓
Hotspot Generator

---

## 33.3 Quality Testing

測試情境包括已實測的：

- Skew
- Blur
- Noise
- Low Light
- Mixed Chinese / English
- Table + Text
- Shadow Occlusion

---

## 33.4 Failure Testing

必須確認：

- Severe Blur 不被錯誤救援
- 不可靠 OCR 不建立猜測性 Hotspot
- Provider Failure 不破壞教材
- Re-Quality Check 失敗不標記 SUCCESS
- Processing Image 不形成第二份教材資產

---

## 33.5 Coordinate Testing

如果 Deskew 改變影像幾何：

必須測試：

Processed Coordinates
→
Coordinate Transform
→
Final Display Coordinates
→
Hotspot

---

# 34. AI Completion Criteria

## 34.1 AI Module

- [ ] AI Panel
- [ ] Prompt Manager
- [ ] Conversation
- [ ] History
- [ ] AI Settings
- [ ] AI Provider Interface

---

## 34.2 AI Automation

- [ ] Image Quality Check
- [ ] Auto Correction
- [ ] Re-Quality Check
- [ ] OCR
- [ ] Hotspot Generator
- [ ] Reliable Failure
- [ ] Background Processing

---

## 34.3 Image Processing

- [ ] Deskew
- [ ] Denoise
- [ ] Sharpen
- [ ] CLAHE excluded from main pipeline
- [ ] Minimum Necessary Processing
- [ ] Processing Image separation

---

## 34.4 OCR

- [ ] Google Cloud Vision API
- [ ] DOCUMENT_TEXT_DETECTION
- [ ] Replaceable Provider Adapter
- [ ] Text Result
- [ ] Bounding Box

---

## 34.5 Integration

- [ ] HTML Overlay integration
- [ ] Hotspot Coordinate Transformation
- [ ] Image Storage Rule
- [ ] Workspace Isolation
- [ ] Error Handling
- [ ] Provider Failure Handling

---

# 35. AI Change Control

## 35.1 PM Review

任何 AI Architecture Change（AI 架構變更）若影響：

- Product Function
- User Flow
- Data Model
- Processing Flow
- Provider
- Permission
- Storage

必須先進行 PM Review。

---

## 35.2 Specification First

正式流程：

PM Decision
↓
Update Specification
↓
Update AI Design
↓
Update API Design
↓
Update Database Design（若需要）
↓
Development
↓
Testing

---

## 35.3 No Engineer-first AI Development

不得：

Development
↓
再補 AI Specification

工程師發現需要新 AI 技術時，必須先依：

Reuse Before Reinvent
+
PM Review
+
Specification Consistency

處理。

---

## 35.4 Consistency Review

AI Design 更新後，必須檢查：

- Product Specification
- MVP Development
- Roadmap
- Development Guidelines
- Database Design
- API Design

不得讓正式文件互相矛盾。

---

# 36. Change Log
## Version 1.1

Status: Draft

同步 Hotspot Coordinate Transformation（熱點座標轉換）與 Hotspot Generator（熱點產生器）的正式流程順序，使其與 Database Design、API Design 及已確認的 AI Automation Architecture（AI 自動化架構）一致。

本版本：
- 修正 §17.2 Generator Flow 的流程順序
- Coordinate Transformation 位於 Hotspot Generator 之前
- HTML Overlay 建立於 Hotspot Generator 之後
- 不新增產品功能
- 不新增 AI Scope
- 不新增 API Scope
- 不新增 Database Schema

---


## Version 1.0

Status: Draft

建立 MagicBook 3.0 AI Design 基礎文件。

本版本整理已確認的：

- AI Module
- AI Provider Architecture
- AI Conversation
- Prompt Manager
- AI History
- AI Settings
- AI Automation
- Image Quality Check
- Auto Correction
- Re-Quality Check
- OCR
- Google Cloud Vision API
- DOCUMENT_TEXT_DETECTION
- Replaceable Provider Adapter
- OCR Result
- Hotspot Generator
- Hotspot Coordinate Transformation
- Reliable Failure
- Processing Image Rule
- Background Processing
- Teaching Material Separation
- Text Area Boundary
- HTML Overlay Boundary
- Reading Mode Boundary
- AI UX
- AI Security
- AI Performance
- Reuse Before Reinvent
- Development Boundaries
- Testing and Validation
- Completion Criteria
- Change Control

本版本不新增未核定產品功能。

本版本不鎖定：

- 未核定 AI Provider
- 未核定 Threshold
- 未核定 Database Schema
- Provider-specific Database Schema
- 未核定 AI Model
- 未核定新的 Image Processing Algorithm
- 未核定新的 Camera System

---

END OF DOCUMENT
