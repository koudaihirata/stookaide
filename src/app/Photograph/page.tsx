"use client"; 
import { useState, useEffect } from 'react';
import { css } from '../../../styled-system/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Btn from '@/components/Btn';
import { useRouter } from 'next/navigation';

export default function Photograph() {
    const [detectedObjects, setDetectedObjects] = useState<Set<string>>(new Set<string>());
    const router = useRouter();

    useEffect(() => {
        const translations: { [key: string]: string } = {
            'apple': 'りんご',
            'banana': 'バナナ',
            'carrot': 'にんじん',
            'orange': 'オレンジ',
            'tomato': 'トマト',
            'person': '人間'
            // 必要に応じて他の翻訳を追加
        };
    
        const fetchDetections = async () => {
            try {
                const response = await fetch('http://localhost:5001/results');
                const detectedObjects: string[] = await response.json();
                
                // 翻訳が存在するオブジェクトのみをセットに追加
                // const newDetectedObjects = new Set<string>(
                //     detectedObjects
                //         .filter((obj: string) => translations.hasOwnProperty(obj))
                //         .map((obj: string) => translations[obj])
                // );
                // 検出したもの全てを追加
                const newDetectedObjects = new Set(detectedObjects.map((obj: string) => translations[obj] || obj));
                setDetectedObjects(prevObjects => new Set<string>([...prevObjects, ...newDetectedObjects]));
            } catch (error) {
                console.error('Error fetching detections:', error);
            }
        };

        const interval = setInterval(fetchDetections, 1000);  // 1秒ごとに検出結果を取得

        return () => clearInterval(interval);
    }, []);

    const handleSearchRecipes = () => {
        router.push('/Recipe');
    };

    return (
        <main>
            <h2 className={css({fontSize:'20px',fontWeight:'bold',textAlign:'center',pt:'10px'})}>食材を撮影してください</h2>
            <img id="videoFeed" src="http://localhost:5001/detect" alt="ビデオフィード" className={css({width:'90%',height:'280px',rounded:'15px',margin:'0 auto',pt:'5px'})} />
            <h3 className={css({fontSize:'18px',fontWeight:'bold',textAlign:'center',pt:'10px'})}>余っている食材達</h3>
            <ul className={css({width:'80%',height:'100px',margin:'0 auto',rounded:'8px',border:'3px solid #FFCE7B',p:'5px',display:'flex',flexWrap:'wrap',gap:'8px'})}>
                {Array.from(detectedObjects).map((obj, index) => 
                    <li key={index} className={css({border:'1px solid #FFCE7B',display:'inline-block',rounded:'12px',height:'24px'})}>
                        <div className={css({display:'flex',alignItems:'center',gap:'3px',flexWrap:'wrap',margin:'0 4px'})}>
                            <p className={css({fontSize:'14px'})}>{obj}</p>
                            <div className={css({width:'1px',height:'16px',bg:'#333'})}></div>
                            <FontAwesomeIcon icon={faXmark} className={css({fontSize:'18px'})}/>
                        </div>
                    </li>
                )}
            </ul>
            <div className={css({width:'100%',display:'flex',justifyContent:'center',pt:'10px'})}>
                <Btn label='レシピ検索' onClick={handleSearchRecipes} />
            </div>
        </main>
    );
}
