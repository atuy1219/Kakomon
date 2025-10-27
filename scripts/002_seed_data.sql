-- サンプルデータの挿入

-- 学部
insert into public.faculties (name) values
  ('工学部'),
  ('理学部'),
  ('文学部'),
  ('経済学部')
on conflict (name) do nothing;

-- 学科（工学部）
insert into public.departments (faculty_id, name)
select id, '情報工学科' from public.faculties where name = '工学部'
union all
select id, '電気電子工学科' from public.faculties where name = '工学部'
union all
select id, '機械工学科' from public.faculties where name = '工学部'
on conflict (faculty_id, name) do nothing;

-- 学科（理学部）
insert into public.departments (faculty_id, name)
select id, '数学科' from public.faculties where name = '理学部'
union all
select id, '物理学科' from public.faculties where name = '理学部'
union all
select id, '化学科' from public.faculties where name = '理学部'
on conflict (faculty_id, name) do nothing;

-- 科目（情報工学科）
insert into public.subjects (department_id, name)
select d.id, 'データ構造とアルゴリズム'
from public.departments d
join public.faculties f on d.faculty_id = f.id
where f.name = '工学部' and d.name = '情報工学科'
union all
select d.id, 'データベース'
from public.departments d
join public.faculties f on d.faculty_id = f.id
where f.name = '工学部' and d.name = '情報工学科'
union all
select d.id, 'ソフトウェア工学'
from public.departments d
join public.faculties f on d.faculty_id = f.id
where f.name = '工学部' and d.name = '情報工学科'
on conflict (department_id, name) do nothing;

-- 教授（データ構造とアルゴリズム）
insert into public.professors (subject_id, name)
select s.id, '田中教授'
from public.subjects s
join public.departments d on s.department_id = d.id
join public.faculties f on d.faculty_id = f.id
where f.name = '工学部' and d.name = '情報工学科' and s.name = 'データ構造とアルゴリズム'
union all
select s.id, '佐藤教授'
from public.subjects s
join public.departments d on s.department_id = d.id
join public.faculties f on d.faculty_id = f.id
where f.name = '工学部' and d.name = '情報工学科' and s.name = 'データ構造とアルゴリズム'
on conflict (subject_id, name) do nothing;

-- 教授（データベース）
insert into public.professors (subject_id, name)
select s.id, '鈴木教授'
from public.subjects s
join public.departments d on s.department_id = d.id
join public.faculties f on d.faculty_id = f.id
where f.name = '工学部' and d.name = '情報工学科' and s.name = 'データベース'
union all
select s.id, '山田教授'
from public.subjects s
join public.departments d on s.department_id = d.id
join public.faculties f on d.faculty_id = f.id
where f.name = '工学部' and d.name = '情報工学科' and s.name = 'データベース'
on conflict (subject_id, name) do nothing;
