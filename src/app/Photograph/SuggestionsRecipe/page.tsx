"use client";
import React, { useState, useRef, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import Progressbar from '../../../components/Progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faUndo } from '@fortawesome/free-solid-svg-icons';
import { css } from '../../../../styled-system/css';
import { accentColor, white } from '@/style/color';

const data = [
    { color: 'red', name: 'Red' },
    { color: 'blue', name: 'Blue' },
    { color: 'green', name: 'Green' }
];

export default function SuggestionsRecipe() {
    const [lastDirection, setLastDirection] = useState<string>();
    const [currentIndex, setCurrentIndex] = useState<number>(data.length - 1);
    const [percent, setPercent] = useState<number>(0);

    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo<any>(
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
        await childRefs[newIndex].current.restoreCard();
    };

    const swipe = async (direction: string) => {
        if (canSwipe && currentIndex < data.length) {
            await childRefs[currentIndex].current.swipe(direction);
        }
    };

    const swiped = (direction: string, index: number) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    };

    const outOfFrame = (index: number) => {
        currentIndexRef.current >= index && childRefs[index].current.restoreCard();
    };

    return (
        <main className={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' })}>
            <Progressbar width={80} percent={percent} />
            <div className={css({ width: '80%', height: '450px',m:'5px auto 0', position: 'relative' })}>
                {data.map((item, index) => (
                    <TinderCard
                    ref={childRefs[index]}
                    key={item.name}
                    onSwipe={(dir) => swiped(dir, index)}
                    onCardLeftScreen={() => outOfFrame(index)}
                    className={css({position:'absolute',top:'0',left:'0',width:'100%',height:'100%'})}
                    >
                        <div
                        style={{ backgroundColor: item.color, }}
                        className={css({
                            borderRadius: '10px', 
                            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
                            color: '#fff',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width:'100%',
                            height:'100%'
                        })}>
                            {item.name}
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className={css({width: '80%', m: '10px auto',position:'relative'})}>
                <div className={css({ display: 'flex',alignItems:'center', justifyContent: 'space-around',width:'100%',position:'absolute',top:'-32px' })} style={{color:white}}>
                    <div onClick={() => swipe('left')} className={css({ cursor: 'pointer',width:'65px',height:'65px',rounded:'50%',display: 'flex', alignItems:'center', justifyContent: 'space-around' })} style={{backgroundColor:accentColor}}>
                        <FontAwesomeIcon icon={faThumbsDown} size="2x"/>
                    </div>
                    <div onClick={goBack} className={css({ cursor: 'pointer',width:'60px',height:'60px',rounded:'50%',display: 'flex', alignItems:'center', justifyContent: 'space-around' })} style={{backgroundColor:accentColor}}>
                        <FontAwesomeIcon icon={faUndo} size="2x"/>
                    </div>
                    <div onClick={() => swipe('right')} className={css({ cursor: 'pointer',width:'65px',height:'65px',rounded:'50%',display: 'flex', alignItems:'center', justifyContent: 'space-around' })} style={{backgroundColor:accentColor}}>
                        <FontAwesomeIcon icon={faThumbsUp} size="2x"/>
                    </div>
                </div>
            </div>
        </main>
    );
}
