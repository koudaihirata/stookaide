"use client";
import React, { useState, useRef, useMemo, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import Progressbar from '../../../components/Progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faUndo } from '@fortawesome/free-solid-svg-icons';
import { css } from '../../../../styled-system/css';
import { accentColor, white } from '@/style/color';
import { useSearchParams } from 'next/navigation';

export default function SuggestionsRecipe() {
    const [lastDirection, setLastDirection] = useState<string>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [percent, setPercent] = useState<number>(0);
    const [data, setData] = useState<any[]>([]);
    const [keywords, setKeywords] = useState<string[]>([]);

    const currentIndexRef = useRef(currentIndex);
    const searchParams = useSearchParams();

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

    const swipe = async (direction: string) => {
        if (canSwipe && currentIndex < data.length) {
            if (direction === 'right' && data[currentIndex]) {
                window.open(data[currentIndex].recipeUrl, '_blank');
            }
            await (childRefs[currentIndex].current as any).swipe(direction);
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

    useEffect(() => {
        const fetchKeywords = () => {
            const objects = searchParams.get('objects');
            const detectedObjects = objects ? objects.split(',') : [];
            setKeywords(detectedObjects.length > 0 ? detectedObjects : ["牛肉"]);
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

                for (let row of df_keyword) {
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
                        }
                    });
                }

                setData(df_recipe);
                setCurrentIndex(df_recipe.length - 1);
            } catch (error) {
                console.error('エラーが発生しました：', error);
            }
        };

        fetchData();
    }, [keywords]);

    return (
        <main className={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' })}>
            <Progressbar width={80} percent={percent} />
            <div className={css({ width: '80%', height: '450px', m: '5px auto 0', position: 'relative' })}>
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
                                height: '100%'
                            })}>
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
