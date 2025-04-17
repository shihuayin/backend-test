# Junior Full Stack Backend Test

本项目为 Hult Ashridge 管理面板提供后端 CRUD API，实现对 `Programs` 表的增删改查操作，并配有自动化测试和示例数据导入脚本。

## 项目简介

- 基于 Node.js + TypeScript 的 Express 后端
- 使用 DynamoDB Local 存储数据
- 提供 `GET`、`POST`、`PUT`、`DELETE` 四个接口操作 `Programs` 表
- 自动化测试：Jest + Supertest 覆盖所有 CRUD 场景
- 示例数据：从 `data/example-programs.json` 导入

---

## 环境要求

- Node.js v14+
- npm
- Docker（用于运行 DynamoDB Local）

---

## 全流程命令（按顺序执行）

```bash
# 1. 安装依赖（项目根目录）
npm install

# 2. 启动本地 DynamoDB（后台运行即可）
docker run -d --name dynamodb-local -p 8000:8000 amazon/dynamodb-local

# 3. 初始化表（创建 Programs 表）
npm run init-table

# 4. 导入示例数据
npm run import-programs

# 5. **开一个新终端窗口**，启动后端服务并保持运行
npm run dev

# 6. 在原窗口运行自动化测试（确保 CRUD 逻辑通过）
npm test
```

---

## 手动验证 CRUD 接口（在原窗口执行）

以下 `curl` 命令均在 **原终端窗口**（执行过 `npm test` 的同一窗口）运行；确保窗口  2 中的 `npm run dev` 服务仍在运行。

1. **查询所有程序 (Read)**

   ```bash
   curl -X GET http://localhost:3000/programs
   ```

   预期：返回数组，包含示例数据

2. **添加新程序 (Create)**

   ```bash
   curl -X POST http://localhost:3000/programs \
     -H "Content-Type: application/json" \
     -d '{
       "id": 999,
       "title": "Manual Test Program",
       "topic": "demo",
       "learningFormats": ["video"],
       "bestseller": false,
       "startDate": "2025-07-01"
     }'
   ```

   预期：响应 `{ "message": "Program added successfully" }`

3. **验证新增 (Read)**

   ```bash
   curl -X GET http://localhost:3000/programs
   ```

   预期：返回列表中包含 `id: 999` 的记录

4. **更新程序 (Update)**

   ```bash
   curl -X PUT http://localhost:3000/programs/999 \
     -H "Content-Type: application/json" \
     -d '{ "bestseller": true }'
   ```

   预期：响应包含 `updated` 对象且 `bestseller: true`

5. **删除程序 (Delete)**
   ```bash
   curl -X DELETE http://localhost:3000/programs/999
   ```
   预期：响应 `{ "message": "Program with id 999 deleted." }`

## 使用 Postman 手动验证 CRUD 接口

您还可以在 Postman 中按以下步骤手动创建并执行四个请求：

1. **查询所有程序 (GET /programs)**

   - Method: GET
   - URL: `http://localhost:3000/programs`  
     点击 **Send**，预期状态码 **200**，返回数组。

2. **添加新程序 (POST /programs)**

   - Method: POST
   - URL: `http://localhost:3000/programs`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "id": 999,
       "title": "Manual Test Program",
       "topic": "demo",
       "learningFormats": ["video"],
       "bestseller": false,
       "startDate": "2025-07-01"
     }
     ```
     点击 **Send**，预期状态码 **201**，响应 `{ "message": "Program added successfully" }`。

3. **更新程序 (PUT /programs/:id)**

   - Method: PUT
   - URL: `http://localhost:3000/programs/999`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     { "bestseller": true }
     ```
     点击 **Send**，预期状态码 **200**，响应体包含 `updated` 对象且 `bestseller: true`。

4. **删除程序 (DELETE /programs/:id)**
   - Method: DELETE
   - URL: `http://localhost:3000/programs/999`  
     点击 **Send**，预期状态码 **200**，响应 `{ "message": "Program with id 999 deleted." }`。
