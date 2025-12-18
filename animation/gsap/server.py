import os
import argparse
from livereload import Server

# ---------------------------------------------------------
# 1. 목차(index.html)를 자동으로 만드는 함수
# ---------------------------------------------------------
def create_index_html():
    # server.py 파일 위치를 기준으로 항상 동일한 루트를 사용
    root_dir = os.path.dirname(os.path.abspath(__file__))

    # 섹션별 목록 (HTML 코스 -> 회차/하위 예제)
    html_courses = {}
    # React 예제 목록 (react/src/examples 기준)
    react_courses = {}

    # 모든 하위 폴더를 탐색 (os.walk)
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # index.html이 있는 폴더만 찾음
        if 'index.html' not in filenames:
            continue

        # 루트 폴더에 있는 index.html은 목록에서 제외 (자기 자신이므로)
        if os.path.abspath(dirpath) == os.path.abspath(root_dir):
            continue

        # 루트 기준 상대 경로로 변환 (OS 독립적으로 처리)
        rel_path = os.path.relpath(dirpath, root_dir).replace('\\', '/')

        # "레벨이 다른 항목"이 같은 목차에 섞이지 않도록 섹션 분리:
        # - html/ 아래의 예제만 회차 목록으로 표시
        # - react/는 별도 섹션으로 안내만 제공 (Vite dev server로 실행)
        if rel_path.startswith("html/"):
            html_rel = rel_path[len("html/"):]  # 예: svg_complete/1
            parts = [p for p in html_rel.split('/') if p]
            if not parts:
                continue

            course = parts[0]  # 예: svg_complete
            lesson = '/'.join(parts[1:])  # 예: 1 (혹은 더 깊은 경로)
            if not lesson:
                lesson = "(index)"

            html_courses.setdefault(course, []).append((lesson, rel_path))

    # React 예제 스캔: react/src/examples/**.(jsx|tsx)
    react_examples_root = os.path.join(root_dir, "react", "src", "examples")
    if os.path.isdir(react_examples_root):
        for dirpath, dirnames, filenames in os.walk(react_examples_root):
            for filename in filenames:
                if not (filename.endswith(".jsx") or filename.endswith(".tsx")):
                    continue
                if filename.startswith("_"):
                    continue

                rel = os.path.relpath(os.path.join(dirpath, filename), react_examples_root).replace("\\", "/")
                parts = [p for p in rel.split("/") if p]
                if len(parts) < 2:
                    # course/file.jsx 형태가 아니면 스킵
                    continue

                course = parts[0]
                lesson = "/".join(parts[1:]).replace(".jsx", "").replace(".tsx", "")
                react_courses.setdefault(course, []).append(lesson)

    # HTML 내용 조립 (정렬해서 보기 좋게)
    def _lesson_sort_key(item):
        lesson, _path = item
        # 회차가 숫자면 숫자 기준 정렬
        if lesson.isdigit():
            return (0, int(lesson))
        return (1, lesson)

    course_names = sorted(html_courses.keys())
    html_courses_html = []
    for course in course_names:
        lessons = sorted(html_courses[course], key=_lesson_sort_key)
        lesson_items = "\n".join(
            [f'<li><a href="/{p}/">{l}</a></li>' for (l, p) in lessons]
        )
        html_courses_html.append(
            f"""
            <details class="course">
                <summary>{course}</summary>
                <ul class="lessons">
                    {lesson_items}
                </ul>
            </details>
            """
        )

    react_course_names = sorted(react_courses.keys())
    react_courses_html = []
    for course in react_course_names:
        lessons = sorted(set(react_courses[course]))
        lesson_items = "\n".join(
            [
                # Vite dev server에서 해시로 예제 선택
                f'<li><a href="http://localhost:5173/#{course}/{l}">{l}</a></li>'
                for l in lessons
            ]
        )
        react_courses_html.append(
            f"""
            <details class="course">
                <summary>{course}</summary>
                <ul class="lessons">
                    {lesson_items}
                </ul>
            </details>
            """
        )
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>강의 목록 (자동 생성됨)</title>
        <style>
            body {{ font-family: sans-serif; padding: 20px; line-height: 1.6; }}
            h1 {{ border-bottom: 2px solid #eee; padding-bottom: 10px; }}
            h2 {{ margin-top: 24px; }}
            ul {{ list-style-type: none; padding: 0; }}
            li {{ margin: 5px 0; }}
            a {{ text-decoration: none; color: #007bff; font-size: 18px; }}
            a:hover {{ text-decoration: underline; color: #0056b3; }}
            code {{ background: #f6f8fa; padding: 2px 6px; border-radius: 6px; }}
            .muted {{ color: #777; font-size: 13px; }}
            details.course {{ margin: 10px 0; }}
            details.course > summary {{ cursor: pointer; font-size: 18px; }}
            ul.lessons {{ list-style-type: none; padding-left: 18px; margin: 8px 0 0; }}
            ul.lessons li {{ margin: 6px 0; }}
        </style>
    </head>
    <body>
        <h1>📂 강의 목록</h1>

        <h2>HTML 예제</h2>
        {''.join(html_courses_html) if html_courses_html else '<p class="muted">html/ 아래에 index.html 예제가 없습니다.</p>'}

        <h2>React 예제</h2>
        <p class="muted">
            React 예제는 Vite 개발 서버로 실행합니다:
            <code>cd react</code> <code>npm i</code> <code>npm run dev</code>
        </p>
        {''.join(react_courses_html) if react_courses_html else '<p class="muted">react/src/examples 아래에 예제(.jsx/.tsx)가 없습니다.</p>'}
        <ul>
            <li><a href="/react/README.md">react/README.md</a></li>
        </ul>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
            * 이 목록은 server.py에 의해 자동으로 업데이트됩니다.
        </p>
    </body>
    </html>
    """

    # 파일 쓰기 (내용이 바뀐 경우에만 저장 -> 무한 새로고침 방지)
    current_content = ""
    index_path = os.path.join(root_dir, 'index.html')
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            current_content = f.read()

    # 공백 제거 후 비교 (단순 변경 감지)
    if current_content.strip() != html_content.strip():
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print("✨ 목록(index.html)이 업데이트 되었습니다.")

# ---------------------------------------------------------
# 2. 서버 설정 및 실행
# ---------------------------------------------------------

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="GSAP 강의 예제 로컬 서버")
    parser.add_argument(
        "--port",
        type=int,
        default=int(os.environ.get("PORT", "8080")),
        help="서버 포트 (기본: 8080, 또는 환경변수 PORT)",
    )
    args = parser.parse_args()

    # 서버 시작 전 한번 실행 (처음 목록 생성)
    create_index_html()

    server = Server()

    # 하위 폴더의 파일들이 변하면 -> 새로고침
    server.watch('**/*.html')
    server.watch('**/*.css')
    server.watch('**/*.js')

    # 중요: 파일이 추가/삭제되어 구조가 바뀌면 목록을 다시 생성
    # (index.html이 바뀔 때 무한 루프 도는 것을 막기 위해 로직이 내장됨)
    server.watch('**/*', func=create_index_html)

    print(f"🚀 서버가 시작되었습니다: http://localhost:{args.port}")
    server.serve(port=args.port, host='0.0.0.0')