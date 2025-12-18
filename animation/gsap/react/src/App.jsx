import BasicBoxExample from "./examples/svg_complete/1/box.jsx";

const EXAMPLES = [
    {
        id: "basic/box",
        title: "basic/box",
        Component: BasicBoxExample,
    },
];

function getActiveExampleId() {
    const raw = window.location.hash || "";
    const id = raw.replace(/^#\/?/, "").trim();
    return id;
}

export default function App() {
    const activeId = getActiveExampleId();
    const active = EXAMPLES.find((e) => e.id === activeId) || null;

    return (
        <main className='page'>
            <h1 className='title'>GSAP + React (@gsap/react)</h1>
            <p className='desc'>
                아래 목록에서 예제를 고르세요. (URL 해시로 선택: <code>#basic/box</code>)
            </p>

            <nav className='nav'>
                {EXAMPLES.map((e) => (
                    <a key={e.id} className='navItem' href={`#${e.id}`}>
                        {e.title}
                    </a>
                ))}
            </nav>

            <div className='divider' />

            {active ? (
                <active.Component />
            ) : (
                <p className='muted'>예제를 선택하면 여기에 렌더링됩니다.</p>
            )}
        </main>
    );
}
