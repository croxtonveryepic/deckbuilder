'use client';
import { useSearchParams } from 'next/navigation';
import { decodeFullDeckCode } from '../components/deck-encoder';
import { Suspense, useEffect } from 'react';

function Import() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has('code')) {
      let d;
      try {
        const urlDeckCode = searchParams.get('code')!;
        d = decodeFullDeckCode('import', urlDeckCode);
        console.log(d);
        localStorage.setItem('tempShrine', urlDeckCode.substring(0, 4));
        localStorage.setItem('tempDeck', urlDeckCode.substring(4));
      } catch (e) {
        console.log('Error importing deck from link');
        console.log(e);
        localStorage.removeItem('tempShrine');
        localStorage.removeItem('tempDeck');
      }
    }
    window.location.replace('http://localhost:3000');
  });

  return <div style={{ height: '100vh' }}>Importing deck...</div>;
}

export default function ImportPage() {
  return (
    <Suspense>
      <Import></Import>
    </Suspense>
  );
}
