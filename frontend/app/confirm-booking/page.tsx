'use client';
import { useSearchParams } from 'next/navigation';

const page = () => {
    const searchParams = useSearchParams();
    const date = searchParams.get('date');
    const time = searchParams.get('time');

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                margin: 0,
            }}
        >
            <h1>Potwierdzenie wizyty</h1>
            <p>Wybrana data: {date}</p>
            <p>Wybrana godzina: {time}</p>
        </div>
    );
};

export default page;
