"use client";
import React, { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import TinderCard from 'react-tinder-card';
import Progressbar from '../../../components/Progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faUndo, faStar } from '@fortawesome/free-solid-svg-icons';
import { css } from '../../../../styled-system/css';
import { accentColor, mainColor, white } from '@/style/color';
import { useSearchParams, useRouter } from 'next/navigation';
import LoadingAnimation from '@/components/LoadingAnimation/LoadingAnimation';

function SuggestionsRecipeComponent() {
    const [lastDirection, setLastDirection] = useState<string>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [percent, setPercent] = useState<number>(0);
    const [data, setData] = useState<any[]>([]);
    const [keywords, setKeywords] = useState<string[]>([]);
    const currentIndexRef = useRef(currentIndex);
    const searchParams = useSearchParams();
    const [loadingStatus, setLoadingStatus] = useState<string>('');
    const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
    const [alpha, setAlpha] = useState<number | null>(null);
    const [beta, setBeta] = useState<number | null>(null);
    const [gamma, setGamma] = useState<number | null>(null);
    const [gyroPermissionGranted, setGyroPermissionGranted] = useState<boolean>(false);
    

    const childRefs = useMemo<React.RefObject<any>[]>(
        () => Array(data.length).fill(0).map((i) => React.createRef()),
        [data.length]
    );

    const progressbarCalclation = (val: number) => {
        const result = 1 - (val + 1) / data.length;
        setPercent(result);
    };

    const updateCurrentIndex = async (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
        progressbarCalclation(val);
    };

    const canGoBack = currentIndex < data.length - 1;
    const canSwipe = currentIndex >= 0;

    const goBack = async () => {
        if (!canGoBack) return;
        const newIndex = currentIndex + 1;
        updateCurrentIndex(newIndex);
        await (childRefs[newIndex].current as any).restoreCard();
    };

    const swipe = (direction: string) => {
        if (canSwipe && currentIndex >= 0 && currentIndex < data.length) {
            if (direction === 'right' && data[currentIndex]) {
                // 右スワイプ時にURLを開く
                window.open(data[currentIndex].recipeUrl, '_blank');
                (childRefs[currentIndex].current as any)?.swipe(direction); // 右スワイプを実行
            } else if (direction === 'left') {
                // 左スワイプ時に次のカードに進む
                (childRefs[currentIndex].current as any)?.swipe(direction);
                updateCurrentIndex(currentIndex - 1);
            }
        }
    };
        
    const swiped = (direction: string, index: number) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
        if (direction === 'right' && data[index]) {
            window.open(data[index].recipeUrl, '_blank');
        }
    };

    const outOfFrame = (index: number) => {
        currentIndexRef.current >= index && (childRefs[index].current as any).restoreCard();
    };

    // ジャイロセンサーのデータ取得を開始する関数
    const startGyro = () => {
        window.addEventListener('deviceorientation', (event) => {
            setAlpha(event.alpha || 0);
            setBeta(event.beta || 0);
            setGamma(event.gamma || 0);
        
            if (event.alpha && event.alpha < 320 && event.alpha > 300) {
                swipe('right');
            }
            if (event.alpha && event.alpha > 40 && event.alpha < 60) {
                swipe('left');
            }
        });
    };
    
    // ジャイロセンサーの権限リクエストと開始
    const requestGyroPermission = async () => {
        if ((DeviceOrientationEvent as any).requestPermission) {
            try {
                const response = await (DeviceOrientationEvent as any).requestPermission();
                if (response === 'granted') {
                    setGyroPermissionGranted(true);
                    startGyro();
                } else {
                    console.warn('ジャイロデータへのアクセスが拒否されました');
                }
            } catch (error) {
                console.error('ジャイロセンサーの権限リクエスト中にエラーが発生しました:', error);
            }
        } else {
            setGyroPermissionGranted(true);
            startGyro();
        }
    };

    useEffect(() => {
        if (!gyroPermissionGranted) {
            requestGyroPermission();
        }
    }, [gyroPermissionGranted]);

    useEffect(() => {
        const fetchKeywords = () => {
            const objects = searchParams.get('objects');
            const detectedObjects = objects ? objects.split(',') : [];
            setKeywords(detectedObjects.length > 0 ? detectedObjects : [""]);
        };

        fetchKeywords();
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            if (keywords.length === 0) return;

            try {
                let res = await fetch(`https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_API_KEY}`);
                let json_data = await res.json();

                if (!json_data.result) {
                    throw new Error('Invalid API response structure');
                }

                let parent_dict: { [key: string]: string } = {}; // mediumカテゴリの親カテゴリの辞書
                let df: any[] = [];

                for (let category of json_data.result.large) {
                    df.push({ category1: category.categoryId, category2: "", category3: "", categoryId: category.categoryId, categoryName: category.categoryName });
                }

                for (let category of json_data.result.medium) {
                    df.push({ category1: category.parentCategoryId, category2: category.categoryId, category3: "", categoryId: category.parentCategoryId + "-" + category.categoryId, categoryName: category.categoryName });
                    parent_dict[category.categoryId] = category.parentCategoryId;
                }

                for (let category of json_data.result.small) {
                    df.push({ category1: parent_dict[category.parentCategoryId], category2: category.parentCategoryId, category3: category.categoryId, categoryId: parent_dict[category.parentCategoryId] + "-" + category.parentCategoryId + "-" + category.categoryId, categoryName: category.categoryName });
                }

                let df_keyword = df.filter(row => keywords.some(keyword => row.categoryName.includes(keyword)));

                let df_recipe: React.SetStateAction<any[]> = [];
                let displayedRecipeIds = new Set();
                let recipeCount = 0;

                setLoadingStatus('レシピを取得しています...');

                for (let i = 0; i < df_keyword.length; i++) {
                    let row = df_keyword[i];
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    let url = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_API_KEY}&categoryId=${row.categoryId}`;
                    let res = await fetch(url);

                    let json_data = await res.json();

                    if (!json_data.result) {
                        continue;
                    }

                    let recipes = json_data.result;

                    recipes.forEach((recipe: { recipeId: unknown; foodImageUrl: any; recipeTitle: any; recipeUrl: any; recipeIndication: any; }) => {
                        if (!displayedRecipeIds.has(recipe.recipeId)) {
                            df_recipe.push({
                                ImageUrl: recipe.foodImageUrl,
                                name: recipe.recipeTitle,
                                recipeUrl: recipe.recipeUrl,
                                Indication: recipe.recipeIndication,
                            });
                            displayedRecipeIds.add(recipe.recipeId);
                            recipeCount++;
                        }
                    });

                    setLoadingStatus(`レシピを取得中: ${i + 1} / 6`);

                    if (recipeCount >= 20) {
                        break;
                    }
                }

                setData(df_recipe);
                setLoadingStatus('');
                setCurrentIndex(df_recipe.length - 1);
            } catch (error) {
                console.error('エラーが発生しました：', error);
                setLoadingStatus('エラーが発生しました');
            }
        };

        fetchData();
    }, [keywords]);

    const toggleFavorite = (item:any) => {
        setFavorites(prev => ({
            ...prev,
            [item.name]: !prev[item.name]
        }));
        console.log("ImageUrl:", item.ImageUrl);
        console.log("Name:", item.name);
        console.log("Indication:", item.Indication);
    };
    return (
        <main className={css({ w:'100%',h:'100vh',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',overflow:'hidden' })}>
            <button onClick={requestGyroPermission} className={css({ mb: '10px', padding: '10px', background: mainColor, color: white, borderRadius: '5px' })}>ジャイロセンサーの許可</button>
            <div className={css({ textAlign: 'center', mb: '10px', color: mainColor })}>
                    <p>Alpha: {alpha?.toFixed(2)}</p>
                    <p>Beta: {beta?.toFixed(2)}</p>
                    <p>Gamma: {gamma?.toFixed(2)}</p>
            </div>
            <Progressbar width={80} percent={percent} />
            <div className={css({ width: '80%', height: '450px', m: '15px auto 0', position: 'relative' })}>
                {loadingStatus && 
                    <div className={css({w:'100%',h:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'40px'})}>
                        <LoadingAnimation/>
                        <p className={css({textAlign:'center'})}>{loadingStatus}</p>
                    </div>}
                {data.map((item, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        key={item.name}
                        onSwipe={(dir) => swiped(dir, index)}
                        onCardLeftScreen={() => outOfFrame(index)}
                        className={css({ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' })}
                    >
                        <div
                            style={{ backgroundImage: `url(${item.ImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            className={css({
                                borderRadius: '10px',
                                boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
                                color: '#fff',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                flexDirection:'column',
                                width: '100%',
                                height: '100%',
                            })}>
                                <div onClick={() => toggleFavorite(item)} className={css({content:'""',position:'absolute',top:'4%',right:'4%',w:'50px',h:'50px',rounded:'50%',display:'flex',alignItems:'center',justifyContent:'center',boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)'})} style={{background: 'white'}}>
                                    <FontAwesomeIcon icon={faStar} style={{ color: favorites[item.name] ? '#FFCE7B' : '#d9d9d9', fontSize: '32px' }}/>
                                </div>
                                <div className={css({bg:'rgba(0,0,0,0.5)',rounded:'0 0 10px 10px'})}>
                                    <h2 className={css({fontSize:'24px',fontWeight:'bold',textAlign:'center'})}>{item.name}</h2>
                                    <p className={css({textAlign:'center',pb:'24px'})}>{item.Indication}</p>
                                </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className={css({ width: '80%', m: '10px auto', position: 'relative' })}>
                <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', position: 'absolute', top: '-32px' })}>
                    <div onClick={() => swipe('left')} className={css({ cursor: 'pointer', width: '65px', height: '65px', rounded: '50%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)' })} style={{ backgroundColor: white }}>
                        <FontAwesomeIcon icon={faThumbsDown} size="2x" className={css({ color: '#FF31AD' })} />
                    </div>
                    <div onClick={goBack} className={css({ cursor: 'pointer', width: '60px', height: '60px', rounded: '50%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)' })} style={{ backgroundColor: white }}>
                        <FontAwesomeIcon icon={faUndo} size="2x" className={css({ color: '#d9d9d9' })} />
                    </div>
                    <div onClick={() => swipe('right')} className={css({ cursor: 'pointer', width: '65px', height: '65px', rounded: '50%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)' })} style={{ backgroundColor: white }}>
                        <FontAwesomeIcon icon={faThumbsUp} size="2x" className={css({ color: '#5AFF31' })} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function SuggestionsRecipe() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuggestionsRecipeComponent />
        </Suspense>
    );
}