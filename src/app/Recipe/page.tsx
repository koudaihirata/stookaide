"use client"
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
type Category = {
    category1: string;
    category2: string;
    category3: string;
    categoryId: string;
    categoryName: string;
};

export default function Recipe() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [keyword, setKeyword] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

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

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        const url = `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_API_KEY}`;
    
        const res = await fetch(url);
        const data = await res.json();
    
        let parentDict: { [key: string]: string } = {};
        let df: Category[] = [];
    
        for (let category of data.result.large) {
            df.push({
                category1: category.categoryId,
                category2: "",
                category3: "",
                categoryId: category.categoryId,
                categoryName: category.categoryName,
            });
        }
    
        for (let category of data.result.medium) {
            df.push({
                category1: category.parentCategoryId,
                category2: category.categoryId,
                category3: "",
                categoryId: category.parentCategoryId + "-" + category.categoryId,
                categoryName: category.categoryName,
            });
            parentDict[category.categoryId] = category.parentCategoryId;
        }
    
        for (let category of data.result.small) {
            df.push({
                category1: parentDict[category.parentCategoryId],
                category2: category.parentCategoryId,
                category3: category.categoryId,
                categoryId:
                parentDict[category.parentCategoryId] +
                "-" +
                category.parentCategoryId +
                "-" +
                category.categoryId,
                categoryName: category.categoryName,
            });
        }
    
        const dfKeyword = df.filter((row) => row.categoryName.includes(keyword));
        let dfRecipe: Recipe[] = [];
        let displayedRecipeIds = new Set();
    
        for (let row of dfKeyword) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        
            let recipeUrl = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_API_KEY}&categoryId=${row.categoryId}`;
            let res = await fetch(recipeUrl);
            let jsonData = await res.json();
            let recipes = jsonData.result;
        
            recipes.forEach((recipe:any) => {
                if (!displayedRecipeIds.has(recipe.recipeId)) {
                dfRecipe.push({
                    image: recipe.foodImageUrl,
                    title: recipe.recipeTitle,
                    description: recipe.recipeDescription,
                    Indication: recipe.recipeIndication,
                    recipeUrl: recipe.recipeUrl,
                });
                displayedRecipeIds.add(recipe.recipeId);
                }
            });
        }
    
        setRecipes(dfRecipe);
        setLoading(false);
    };
    

    return (
        <main>
            <div className={css({width:'85%',margin:'0 auto'})}>
                <section className={css({width:'100%',height:'30px',borderBottom:'2px solid #333',display:'flex',alignItems:'center'})}>
                    <h2>レシピ一覧</h2>
                </section>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="キーワードを入力"
                    />
                    <button type="submit">検索</button>
                </form>
                {loading ? (
                <p>Loading...</p>
                ) : (
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
                )}
            </div>
        </main>
    );
}
