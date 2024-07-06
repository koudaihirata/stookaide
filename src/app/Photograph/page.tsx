"use client"; 
import { useState, useEffect } from 'react';
import { css } from '../../../styled-system/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Btn from '@/components/Btn';
import { useRouter } from 'next/navigation';
import { accentColor, white } from '@/style/color';

export default function Photograph() {
    const [detectedObjects, setDetectedObjects] = useState<Set<string>>(new Set<string>());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newObject, setNewObject] = useState("");
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
                const newDetectedObjects = new Set<string>(
                    detectedObjects
                        .filter((obj: string) => translations.hasOwnProperty(obj))
                        .map((obj: string) => translations[obj])
                );
                // 検出したもの全てを追加
                // const newDetectedObjects = new Set(detectedObjects.map((obj: string) => translations[obj] || obj));
                setDetectedObjects(prevObjects => new Set<string>([...prevObjects, ...newDetectedObjects]));
            } catch (error) {
                console.error('Error fetching detections:', error);
            }
        };

        const interval = setInterval(fetchDetections, 1000);  // 1秒ごとに検出結果を取得

        return () => clearInterval(interval);
    }, []);

    const handleRemoveItem = (index: number) => {
        setDetectedObjects(prevObjects => {
            const newObjects = Array.from(prevObjects);
            newObjects.splice(index, 1);
            return new Set(newObjects);
        });
    };

    const handleSearchRecipes = () => {
        router.push('/Recipe');
    };

    const handleAddNewObject = () => {
        if (newObject.trim() !== "") {
            setDetectedObjects(prevObjects => new Set<string>([...prevObjects, newObject.trim()]));
            setNewObject("");
            setIsModalOpen(false);
        }
    };

    return (
        <main>
            <h2 className={css({fontSize:'20px',fontWeight:'bold',textAlign:'center',pt:'10px'})}>食材を撮影してください</h2>
            <img id="videoFeed" src="http://localhost:5001/detect" alt="ビデオフィード" className={css({width:'90%',height:'280px',rounded:'15px',margin:'0 auto',pt:'5px'})} />
            <h3 className={css({fontSize:'18px',fontWeight:'bold',textAlign:'center',pt:'10px'})}>余っている食材達</h3>
            <ul className={css({width:'80%',height:'100px',margin:'0 auto',rounded:'8px',border:'3px solid #FFCE7B',p:'5px',display:'flex',flexWrap:'wrap',gap:'8px',overflowY:'scroll',position:'relative',})}>
                {Array.from(detectedObjects).map((obj, index) => 
                    <li key={index} className={css({border:'1px solid #FFCE7B',display:'inline-block',rounded:'12px',height:'24px'})}>
                        <div className={css({display:'flex',alignItems:'center',gap:'3px',flexWrap:'wrap',margin:'0 4px'})}>
                            <p className={css({fontSize:'14px'})}>{obj}</p>
                            <div className={css({width:'1px',height:'16px',bg:'#333'})}></div>
                            <FontAwesomeIcon icon={faXmark} className={css({fontSize:'18px', cursor: 'pointer'})} onClick={() => handleRemoveItem(index)}/>
                        </div>
                    </li>
                )}
                <div className={css({width:'30px',height:'30px',rounded:'50%',position:'absolute',bottom:'5px',right:'5px',display:'flex',alignItems:'center',justifyContent:'center',transform:'rotate(45deg)',zIndex:'0'})} style={{backgroundColor:accentColor}} onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon={faXmark} className={css({fontSize:'24px', cursor: 'pointer'})} style={{color:white}}/>
                </div>
            </ul>
            <div className={css({width:'100%',display:'flex',justifyContent:'center',pt:'10px'})}>
                <Btn label='レシピ検索' onClick={handleSearchRecipes} />
            </div>
            {isModalOpen && (
                <div className={css({position:'fixed',top:0,left:0,width:'100%',height:'100%',bg:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'})}>
                    <div className={css({width:'300px',bg:white,p:'20px',rounded:'10px',textAlign:'center'})}>
                        <h3 className={css({fontSize:'18px',fontWeight:'bold'})}>新しい食材を追加</h3>
                        <input
                            type="text"
                            value={newObject}
                            onChange={(e) => setNewObject(e.target.value)}
                            className={css({width:'100%',p:'10px',mt:'10px',mb:'20px',border:'1px solid #ccc',borderRadius:'5px'})}
                        />
                        <button onClick={handleAddNewObject} className={css({p:'10px 15px',rounded:'8px',fontWeight:'bold'})} style={{backgroundColor:accentColor,color:white}}>
                            追加
                        </button>
                        <button onClick={() => setIsModalOpen(false)} className={css({p:'10px 15px',rounded:'8px',fontWeight:'bold',color:'#333',ml:'10px'})}>
                            キャンセル
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
