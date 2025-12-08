
export const mockUser = {
  id: "mock-user-1",
  email: "demo@shibaura-it.ac.jp",
  display_name: "芝浦 太郎",
  created_at: new Date().toISOString(),
}

export const mockFaculties = [
  { id: "1", name: "工学部", created_at: new Date().toISOString() },
  { id: "2", name: "システム理工学部", created_at: new Date().toISOString() },
  { id: "3", name: "デザイン工学部", created_at: new Date().toISOString() },
  { id: "4", name: "建築学部", created_at: new Date().toISOString() },
]

export const mockDepartments = [
  { id: "1", faculty_id: "1", name: "情報・通信工学科", created_at: new Date().toISOString() },
  { id: "2", faculty_id: "1", name: "機械工学科", created_at: new Date().toISOString() },
  { id: "3", faculty_id: "1", name: "物質化学科", created_at: new Date().toISOString() },
  { id: "4", faculty_id: "1", name: "電気電子工学科", created_at: new Date().toISOString() },
  { id: "5", faculty_id: "1", name: "土木工学科", created_at: new Date().toISOString() },
  { id: "6", faculty_id: "1", name: "先進国際学科", created_at: new Date().toISOString() },
  { id: "7", faculty_id: "2", name: "電子情報システム学科", created_at: new Date().toISOString() },
  { id: "8", faculty_id: "2", name: "機械制御システム学科", created_at: new Date().toISOString() },
  { id: "9", faculty_id: "2", name: "環境システム学科", created_at: new Date().toISOString() },
  { id: "10", faculty_id: "2", name: "生命科学科", created_at: new Date().toISOString() },
  { id: "11", faculty_id: "2", name: "数理科学科", created_at: new Date().toISOString() },
  { id: "12", faculty_id: "3", name: "デザイン工学科", created_at: new Date().toISOString() },
  { id: "13", faculty_id: "4", name: "建築学科", created_at: new Date().toISOString() },
]

export const mockSubjects = [
  { id: "1", department_id: "1", name: "情報通信コース", created_at: new Date().toISOString() },
  { id: "2", department_id: "1", name: "情報工学コース", created_at: new Date().toISOString() },
  { id: "3", department_id: "2", name: "基幹機械コース", created_at: new Date().toISOString() },
  { id: "4", department_id: "2", name: "先進機械コース", created_at: new Date().toISOString() },
  { id: "5", department_id: "3", name: "環境・物質工学コース", created_at: new Date().toISOString() },
  { id: "6", department_id: "3", name: "化学・生命工学コース", created_at: new Date().toISOString() },
  { id: "7", department_id: "4", name: "電気・ロボット工学コース", created_at: new Date().toISOString() },
  { id: "8", department_id: "4", name: "先端電子工学コース", created_at: new Date().toISOString() },
  { id: "9", department_id: "5", name: "都市・環境コース", created_at: new Date().toISOString() },
  { id: "10", department_id: "6", name: "先進国際コース", created_at: new Date().toISOString() },
  { id: "11", department_id: "7", name: "電子情報システムコース", created_at: new Date().toISOString() },
  { id: "12", department_id: "8", name: "機械制御システムコース", created_at: new Date().toISOString() },
  { id: "13", department_id: "9", name: "環境システムコース", created_at: new Date().toISOString() },
  { id: "14", department_id: "10", name: "生命科学コース", created_at: new Date().toISOString() },
  { id: "15", department_id: "10", name: "生命医工学コース", created_at: new Date().toISOString() },
  { id: "16", department_id: "11", name: "数理科学コース", created_at: new Date().toISOString() },
  { id: "17", department_id: "12", name: "社会情報システムコース", created_at: new Date().toISOString() },
  { id: "18", department_id: "12", name: "UXデザインコース", created_at: new Date().toISOString() },
  { id: "19", department_id: "12", name: "プロダクトデザインコース", created_at: new Date().toISOString() },
  { id: "20", department_id: "13", name: "APコース", created_at: new Date().toISOString() },
  { id: "21", department_id: "13", name: "SAコース", created_at: new Date().toISOString() },
  { id: "22", department_id: "13", name: "UAコース", created_at: new Date().toISOString() },
]

export const mockProfessors = [
  { id: "1", subject_id: "1", name: "田中太郎", created_at: new Date().toISOString() },//教授の名前を設定//
  { id: "2", subject_id: "1", name: "佐藤花子", created_at: new Date().toISOString() },
  { id: "3", subject_id: "2", name: "鈴木一郎", created_at: new Date().toISOString() },
  { id: "4", subject_id: "3", name: "山田次郎", created_at: new Date().toISOString() },
  { id: "5", subject_id: "4", name: "中村三郎", created_at: new Date().toISOString() },
  { id: "6", subject_id: "5", name: "小林四郎", created_at: new Date().toISOString() },
  { id: "7", subject_id: "6", name: "加藤五郎", created_at: new Date().toISOString() },
  { id: "8", subject_id: "7", name: "吉田六郎", created_at: new Date().toISOString() },
  { id: "9", subject_id: "8", name: "高橋三郎", created_at: new Date().toISOString() },
  { id: "10", subject_id: "9", name: "斎藤七郎", created_at: new Date().toISOString() },  
  { id: "11", subject_id: "10", name: "渡辺八郎", created_at: new Date().toISOString() },
  { id: "12", subject_id: "11", name: "伊藤九郎", created_at: new Date().toISOString() },
  { id: "13", subject_id: "12", name: "松本十郎", created_at: new Date().toISOString() },
  { id: "14", subject_id: "13", name: "林十一郎", created_at: new Date().toISOString() },
  { id: "15", subject_id: "14", name: "清水十二郎", created_at: new Date().toISOString() },
  { id: "16", subject_id: "15", name: "山本十三郎", created_at: new Date().toISOString() },
  { id: "17", subject_id: "16", name: "池田十四郎", created_at: new Date().toISOString() },
  { id: "18", subject_id: "17", name: "橋本十五郎", created_at: new Date().toISOString() },
  { id: "19", subject_id: "18", name: "石井十六郎", created_at: new Date().toISOString() },
  { id: "20", subject_id: "19", name: "青木十七郎", created_at: new Date().toISOString() },
  { id: "21", subject_id: "20", name: "藤田十八郎", created_at: new Date().toISOString() },
  { id: "22", subject_id: "21", name: "西村十九郎", created_at: new Date().toISOString() },
]

export const mockExams = [
  {
    id: "e1",
    professor_id: "p1",
    title: "2023年度 前期中間試験",
    year: 2023,
    semester: "前期",
    exam_type: "中間試験",
    content:
      "1. 単純支持はりのせん断力図(SFD)と曲げモーメント図(BMD)を描け。\n2. 応力とひずみの関係について、フックの法則を用いて説明せよ。",
    user_id: "mock-user-1",
    created_at: new Date("2023-06-20").toISOString(),
  },
  {
    id: "e2",
    professor_id: "p2",
    title: "2023年度 後期期末試験",
    year: 2023,
    semester: "後期",
    exam_type: "期末試験",
    content:
      "1. クイックソートのアルゴリズムを擬似コードで記述し、計算量について考察せよ。\n2. 二分探索木の探索、挿入、削除の操作について説明せよ。",
    user_id: "mock-user-1",
    created_at: new Date("2024-01-25").toISOString(),
  },
  {
    id: "e3",
    professor_id: "p5",
    title: "2024年度 設計課題講評",
    year: 2024,
    semester: "前期",
    exam_type: "課題提出",
    content:
      "「都市の中の隠れ家」をテーマにした設計課題において、各自のコンセプトと空間構成の意図を記述すること。また、周辺環境との関係性についても触れること。",
    user_id: "mock-user-1",
    created_at: new Date("2024-07-15").toISOString(),
  },
   {
    id: "4",
    professor_id: "5",
    title: "2024年度 中間試験",
    year: 2024,
    semester: "前期",
    exam_type: "中間試験",
    content:
      "/linear_algebra_2024_first_midterm.tex.pdf",
    user_id: "mock-user-1",
    created_at: new Date("2024-07-10").toISOString(),
  },
]

export const mockQuestions = [
  {
    id: "q1",
    exam_id: "e1",
    professor_id: "p1",
    user_id: "mock-user-1",
    title: "SFDの符号について",
    content: "せん断力の符号の定義がいまいち分かりません。時計回りに回そうとする力がプラスで合っていますか？",
    created_at: new Date("2023-06-22").toISOString(),
  },
]

export const mockApiKey = {
  user_id: "mock-user-1",
  api_key: "",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// ヘルパー関数
export function getMockFaculties() {
  return mockFaculties
}

export function getMockDepartments(facultyId: string) {
  return mockDepartments.filter((d) => d.faculty_id === facultyId)
}

export function getMockSubjects(departmentId: string) {
  return mockSubjects.filter((s) => s.department_id === departmentId)
}

export function getMockProfessors(subjectId: string) {
  return mockProfessors.filter((p) => p.subject_id === subjectId)
}

export function getMockProfessorById(id: string) {
  return mockProfessors.find((p) => p.id === id)
}

export function getMockExams(professorId: string) {
  return mockExams.filter((e) => e.professor_id === professorId)
}

export function getMockExamById(id: string) {
  return mockExams.find((e) => e.id === id)
}

export function getMockQuestions(examId: string) {
  return mockQuestions.filter((q) => q.exam_id === examId)
}

export function getMockSubjectById(id: string) {
  return mockSubjects.find((s) => s.id === id)
}

export function getMockDepartmentById(id: string) {
  return mockDepartments.find((d) => d.id === id)
}

export function getMockFacultyById(id: string) {
  return mockFaculties.find((f) => f.id === id)
}