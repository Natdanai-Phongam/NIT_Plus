# NIT_Plus — Product Context

## Product
**Name**: NIT_Plus
**Full name**: ระบบบริหารจัดการสถาบันประสาทวิทยาแห่งชาติ
**Organization**: สถาบันประสาทวิทยา (Neurological Institute of Thailand — NIT)
**Type**: Web App / Admin Dashboard (Government Medical Institution)
**Register**: product
**Reference URL**: https://app.nit.go.th/nit/admin/home (requires authentication)

## Users
- **Primary users**: แพทย์, พยาบาล, เจ้าหน้าที่ธุรการ, ผู้ดูแลระบบ ของสถาบันประสาทวิทยา
- **Their main goal**: จัดการข้อมูลผู้ป่วย, ข่าวสาร, รายงาน และข้อมูลสถาบัน ผ่าน interface ที่ใช้งานได้ทุกวัน
- **Context**: ใช้งานบนเครื่อง desktop workstation ของสถาบัน ส่วนใหญ่เป็น Windows, หน้าจอ 1280–1440px
- **Language**: ภาษาไทยเป็นหลัก มีบางส่วนเป็นภาษาอังกฤษ (เช่น ชื่อโรค, รหัส, Refer-ID)

## Brand & Tone
- **Tone**: Clean & Approachable — เป็นทางการแต่ไม่แข็งกระด้าง
- **Personality**: Trustworthy, efficient, organized, calm
- **Visual anchor**: **Institutional Navy `#1E3869`** — single brand color for all primary actions, navigation, and brand marks

## Strategic Principles
1. **Clarity over cleverness** — ทุก element ต้องเข้าใจได้ทันที
2. **Thai-first rendering** — ทดสอบทุก typography ด้วย Thai script ก่อน
3. **Data density without clutter** — รองรับข้อมูลเยอะโดยไม่ทำให้รู้สึกอึดอัด
4. **Single brand anchor** — Navy เท่านั้น ห้ามมี secondary brand color

## Anti-References
- Avoid: dark-mode admin templates ที่ใช้สีม่วง/ฟ้า neon
- Avoid: generic Bootstrap dashboards พร้อม gradient headers
- Avoid: glassmorphism และ decorative blur effects
- Avoid: bounce หรือ spring easing
- Avoid: card-in-card nesting ที่สร้าง visual confusion

## Tech Stack
- **Component library**: Ant Design 5.x (React)
- **Framework**: Vite + React 18
- **Routing**: react-router-dom v6+
- **Styling**: Ant Design ConfigProvider tokens + CSS Modules
- **Font**: System font stack with `'Noto Sans Thai'` fallback
