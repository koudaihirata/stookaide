"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';
import Link from 'next/link';

type Recipe = {
    image: string;
    title: string;
    description: string;
    Indication:string;
    recipeUrl:string;
};

export default function Recipe() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const url = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_API_KEY}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const recipes = data.result.map((recipe: any) => ({
                    image: recipe.foodImageUrl,
                    title: recipe.recipeTitle,
                    description: recipe.recipeDescription,
                    Indication: recipe.recipeIndication,
                    recipeUrl: recipe.recipeUrl,
                }));
                setRecipes(recipes);
                console.log(data.result);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <main>
            <div className={css({width:'85%',margin:'0 auto'})}>
                <section className={css({width:'100%',height:'30px',borderBottom:'2px solid #333',display:'flex',alignItems:'center'})}>
                    <h2>レシピ一覧</h2>
                </section>
                <ul id="recipe_list">
                    {recipes.map((recipe, index) => (
                        <Link key={index} href={recipe.recipeUrl} legacyBehavior passHref>
                            <a target="_blank" rel="noopener noreferrer">
                                <li className={css({width:'100%',marginTop:'20px',border:'3px solid #FFCE7B',rounded:'10px',display:'flex',alignItems:'center',flexDirection:'column',gap:'10px'})}>
                                    <img src={recipe.image} alt={recipe.title} width={220} height={200} className={css({width:'220',height:'200',rounded:'10px',marginTop:'10px'})}/>
                                    <h3 className={css({width:'100%',textAlign:'center',fontWeight:'bold'})}>{recipe.title}</h3>
                                    <p className={css({width:'90%',margin:'0 auto',textAlign:'center',fontSize:'14px'})}>{recipe.description}</p>
                                    <p className={css({fontSize:'20px',marginBottom:'10px'})}>{recipe.Indication}</p>
                                </li>
                            </a>
                        </Link>
                    ))}
                </ul>
            </div>
        </main>
    );
}
