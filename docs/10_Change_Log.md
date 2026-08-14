# MagicBook 3.0 Change Log

Version: 1.1
Status: Active
Document Owner: Teresa Su
Product Manager: ChatGPT
Technical Lead: 阿德
Last Update: 2026-08-14

---

# 0. Change Log Purpose

本文件為 MagicBook 3.0 的 Change Log（變更紀錄）。

用途：

- 記錄產品規格與開發文件的重要變更。
- 記錄文件版本更新。
- 記錄已確認的架構與功能變更。
- 協助 Product Manager（產品經理）與 Technical Lead（技術負責人）追蹤開發狀態。
- 避免已確認的需求被遺漏、重複修改或錯誤覆蓋。

本文件不負責定義產品功能。

產品功能以：

Product Specification（產品規格）

為最高依據。

---

# 1. Change Control Principles

## 1.1 Confirmed Change Only

Change Log 只記錄已確認的變更。

不得將：

- brainstorming（腦力激盪）
- proposal（提案）
- speculation（推測）
- 未確認功能

當成正式產品變更。

---

## 1.2 Product Specification Priority

若文件之間發生衝突：

Product Specification（產品規格）

優先於其他設計文件。

其他文件不得自行改變已確認的產品需求。

---

## 1.3 No Scope Creep

文件更新不得自行加入未確認功能。

任何新功能必須先經過 Product Manager（產品經理）確認。

---

## 1.4 Full Rewrite When Necessary

當文件內容已經過多次局部修改，造成：

- duplicated content（重複內容）
- contradictory content（互相矛盾）
- outdated content（過時內容）
- unclear structure（結構不清）

應優先進行完整重寫，而不是持續 patch（局部修補）。

---

# 2. Document Baseline

目前 MagicBook 3.0 文件結構：

- 00_Brand_Philosophy.md
- 01_Product_Specification.md
- 02_MVP_Development.md
- 03_Roadmap.md
- 04_Development_Guidelines.md
- 05_Database_Design.md
- 06_API_Design.md
- 07_AI_Design.md
- 08_Editor_Design.md
- 09_UI_Design.md
- 10_Change_Log.md
- 11_MVP_Task_List.md

---

# 3. Architecture Transition — Workspace-based → User Account-based（2026-08-14 新增）

## 3.0 Purpose

本節記錄 MagicBook 3.0 一次重大架構轉換，並補齊本文件先前未記錄的變更。

## 3.0.1 Transition Summary

```text
舊架構
Workspace-based Architecture

        ↓

新架構
User Account-based Architecture
```

正式確認：

- Workspace 不再作為目前產品資料根層級（不再有 Personal Workspace / Organization Workspace / Workspace Identity / Workspace Membership / Workspace Role / Workspace Data Ownership）。
- User Account（使用者帳號）成為使用者資料歸屬核心層級。
- 核心教材階層改為：User Account → Book Library → Folder → Book → Lesson → Page。

同步確認：

```text
Personal / Group
        ↓
Billing Plan
```

- Personal（個人）／Group（團體）為 Billing System（計費系統）管理的 Billing Plan（計費方案），不是不同的 User Account 類型，也不是不同的資料架構。

同步確認 Billing 與 Supabase 的責任邊界：

```text
User Email
    ↓
Billing
    ↓
Payment
    ↓
Access Activation
    ↓
Supabase
    ↓
User Access
```

- Billing System 負責付款、續約、到期、團體邀請、團體人數、價格、付款週期等商業邏輯。
- Supabase 負責 User Account、Authentication、Session、User ID、個人教材資料、Access Status。
- Billing 與 Supabase Access 保持責任分離，透過 Webhook 同步 Access Status。

同步確認 Content Ownership：

- 教材內容所有權（Content Ownership）與 MagicBook Tool / Service 使用權（Tool / Service Access）保持清楚區分。

## 3.0.2 Document Sync Status

本次架構轉換已於下列文件正式確認並定案（本次 Gate 2 之前即已完成）：

| 文件 | 版本 | 狀態 |
|---|---|---|
| 00_Brand_Philosophy.md | 1.0 | 已同步 |
| 01_Product_Specification.md | 3.4 | 已同步（基準文件） |
| 02_MVP_Development.md | 3.0 | 已同步 |
| 04_Development_Guidelines.md | 4.6 | 已同步 |
| 05_Database_Design.md | 2.0 | 已同步 |
| 06_API_Design.md | 2.0 | 已同步 |
| 09_UI_Design.md | 2.0 | 已同步 |
| 11_MVP_Task_List.md | 2.3 | 已同步 |

本次 Gate 2 另完成以下文件的同步（詳見下方 §4）：

| 文件 | 舊版本 | 新版本 | 狀態 |
|---|---|---|---|
| 03_Roadmap.md | 1.1 | 1.2 | 已同步 |
| 08_Editor_Design.md | 1.3 | 1.4 | 已同步 |
| 07_AI_Design.md | 1.3 | 1.3（不變，內容原已同步） | 已確認 |
| 10_Change_Log.md（本文件） | 1.0 | 1.1 | 本次更新 |

## 3.0.3 Version Tracking Correction — 07_AI_Design.md

Gate 0 Audit 發現，本文件下方 §3.1（歷史紀錄，Version 1.0 時期撰寫）記載 07_AI_Design.md v1.3 的主要變更為「明確定義 Workspace Isolation」，與 07_AI_Design.md 自身 Change Log（§36 Version 1.3）記載的「移除 Workspace 作為 AI 資料歸屬與權限邊界的舊架構」方向相反。

經核對 07_AI_Design.md 全文，該文件自身的 Change Log 僅存在一筆 Version 1.3 紀錄，且與目前正文內容一致（已完成 Workspace 移除）。因此判定：

> 07_AI_Design.md 的內容本身正確、無需修改；本文件（10_Change_Log.md）§3.1 的舊記載為過期資訊，非現行事實。

依「保留歷史、不刪除」原則，§3.1 原文不予刪除，但標記為歷史記錄（非現行事實），並以本節內容為準。

---

# 4. Confirmed Document Updates

## 4.0 歷史記錄說明

以下 §4.1、§4.2、§4.3 為 Version 1.0 時期的原始記錄，予以保留。§4.1 所述「明確定義 Workspace Isolation」一項，經 §3.0.3 確認為過期記載，現行事實請參照 §3。

## 4.1 07_AI_Design.md（歷史記錄）

Version: 1.3

Last Update: 2026-08-09

主要變更：

- 重整 AI Architecture（AI 架構）。
- 明確定義 AI Scope（AI 範圍）。
- 明確定義 AI Processing（AI 處理流程）。
- 明確定義 AI Data Access（AI 資料存取）。
- 明確定義 AI Provider（AI 服務供應商）可替換架構。
- 明確定義 Workspace Isolation（工作空間隔離）。
- 明確定義 User Account Permission（使用者帳戶權限）。
- 明確定義 AI History（AI 歷史紀錄）的資料權限。
- 明確定義 Provider Credential（服務供應商憑證）不得暴露給一般使用者。
- 明確定義 AI Failure Handling（AI 失敗處理）。
- 明確定義 AI Security（AI 安全）。
- 明確定義 Processing Job（處理工作）的 Context（上下文）與 Workspace（工作空間）限制。
- 明確定義 Provider Replacement（服務供應商替換）不得破壞既有 Product Function（產品功能）、Data Model（資料模型）與 User Flow（使用者流程）。

---

## 4.2 08_Editor_Design.md（歷史記錄）

Version: 1.3

Last Update: 2026-08-09

主要變更：

- 完整重整 Editor Architecture（編輯器架構）。
- 明確定義 Editor Scope（編輯器範圍）。
- 明確定義 Editor Responsibility（編輯器責任）。
- 明確定義 Content Editing（內容編輯）與其他系統責任的分離。
- 明確定義 Image Area（圖片區域）與 Text Area（文字區域）的責任。
- 明確定義 Editor 與 AI Processing（AI 處理流程）的關係。
- 明確定義 Editor 與 Workspace（工作空間）的關係。
- 明確定義 Editor Data Flow（編輯器資料流程）。
- 整理 Editor UI（編輯器介面）與資料模型之間的責任邊界。
- 重新整理文件結構，避免重複與互相矛盾內容。

---

## 4.3 11_MVP_Task_List.md

Version: 2.3

Status: In Progress

Last Update: 2026-08-09

主要變更：

- 更新 MVP Task List（MVP 執行清單）。
- 增加 HTML Overlay（HTML 覆蓋層）相關工作項目。
- 增加 Context Toolbar（上下文工具列）相關工作項目。
- 增加 Dictionary（字典）相關工作項目。
- 增加 AI 相關工作項目。
- 增加 Audio（音訊）相關工作項目。
- 增加 Video（影片）相關工作項目。
- 增加 Navigation（導覽）相關工作項目。
- 增加 Billing（計費）與 Order（訂單）相關工作項目。
- 重新整理既有 MVP Task（MVP 任務）與執行順序。

---

# 5. Current Development Status

目前已確認之正式文件版本基準：

- 00_Brand_Philosophy.md → Version 1.0
- 01_Product_Specification.md → Version 3.4
- 02_MVP_Development.md → Version 3.0
- 03_Roadmap.md → Version 1.2
- 04_Development_Guidelines.md → Version 4.6
- 05_Database_Design.md → Version 2.0
- 06_API_Design.md → Version 2.0
- 07_AI_Design.md → Version 1.3
- 08_Editor_Design.md → Version 1.4
- 09_UI_Design.md → Version 2.0
- 10_Change_Log.md → Version 1.1
- 11_MVP_Task_List.md → Version 2.3

全部文件現行架構已一致採用 User Account-based Architecture，Workspace 僅存在於歷史 Change Log 紀錄中，不代表現行產品架構。

---

# 6. Change Log Rules

## 6.1 Version Update

文件發生正式內容變更時，必須更新 Version（版本）。

---

## 6.2 Last Update

正式更新文件時，必須更新 Last Update（最後更新日期）。

---

## 6.3 Commit Message

GitHub Commit（GitHub 提交）應清楚描述此次變更。

例如：

```text
Update AI Design to v1.3
```

---

# END OF DOCUMENT
