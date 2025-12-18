import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function BasicBoxExample() {
    const boxRef = useRef(null);

    useGSAP(() => {
        gsap.to(boxRef.current, { x: 240, duration: 1, yoyo: true, repeat: -1 });
    }, []);

    return (
        <section>
            <h2 className='exTitle'>basic/box</h2>
            <div className='stage'>
                <div ref={boxRef} className='box' />
            </div>
        </section>
    );
}


