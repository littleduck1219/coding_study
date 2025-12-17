import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function App() {
    const boxRef = useRef(null);

    useGSAP(() => {
        gsap.to(boxRef.current, { x: 240, duration: 1, yoyo: true, repeat: -1 });
    }, []);

    return (
        <main className='page'>
            <h1 className='title'>GSAP + React (@gsap/react)</h1>
            <p className='desc'>npm으로 gsap/@gsap/react를 관리하는 기본 예제입니다.</p>
            <div className='stage'>
                <div ref={boxRef} className='box' />
            </div>
        </main>
    );
}
