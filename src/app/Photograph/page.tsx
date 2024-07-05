"use client"; 
import { useState, useEffect } from 'react';

export default function Photograph() {
    const translations: { [key: string]: string } = {
        'apple': 'りんご',
        'banana': 'バナナ',
        'carrot': 'にんじん',
        'orange': 'オレンジ',
        'tomato': 'トマト',
        'person': '人間'
        // 必要に応じて他の翻訳を追加
    };

    const [detectedObjects, setDetectedObjects] = useState<Set<string>>(new Set<string>());

    useEffect(() => {
        const fetchDetections = async () => {
            try {
                const response = await fetch('http://localhost:5001/results');
                const detectedObjects: string[] = await response.json();
                
                // 翻訳が存在するオブジェクトのみをセットに追加
                const newDetectedObjects = new Set<string>(
                    detectedObjects
                        .filter((obj: string) => translations.hasOwnProperty(obj))
                        .map((obj: string) => translations[obj])
                );
                setDetectedObjects(prevObjects => new Set<string>([...prevObjects, ...newDetectedObjects]));
            } catch (error) {
                console.error('Error fetching detections:', error);
            }
        };

        const interval = setInterval(fetchDetections, 1000);  // 1秒ごとに検出結果を取得

        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            <h1>リアルタイムオブジェクト検出</h1>
            <img id="videoFeed" src="http://localhost:5001/detect" alt="ビデオフィード" style={{ width: '640px', height: '480px', backgroundColor: 'black' }} />
            <h2>検出結果:</h2>
            <ul>
                {Array.from(detectedObjects).map((obj, index) => <li key={index}>{obj}</li>)}
            </ul>
        </main>
    );
}
