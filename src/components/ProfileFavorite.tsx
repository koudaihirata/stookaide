import Image from "next/image";
import { css } from "../../styled-system/css";
import { mainColor } from "@/style/color";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
    created_at: string;
    date_of_birth: string;
    email: string;
    favorite_recipe: string | null;
    gender: string;
    id: number;
    postal_code: string;
    profile_image: string | null;
    username: string;
}

interface AccessToken {
    message: string;
    user: User;
}

interface Recipe {
    recipeUrl: string;
    recipeTitle: string;
    foodImageUrl: string;
}

export default function ProfileFavorite() {
    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const checkTokens = async () => {
            const accessToken = JSON.parse(localStorage.getItem('accessToken') || 'null');
            const refreshToken = JSON.parse(localStorage.getItem('refreshToken') || 'null');

            // console.log(accessToken);
            // console.log(accessToken.user.favorite_recipe);
            
            if (!accessToken && !refreshToken) {
                // トークンがない場合、ログインページにリダイレクト
                router.push('/certification/LogIn');
            } else {
                if (accessToken.user.favorite_recipe) {
                    const favoriteRecipes = JSON.parse(accessToken.user.favorite_recipe).recipes;
                    setRecipes(favoriteRecipes);
                }
            }
        };

        checkTokens();
    }, [router]);

    return(
        <>
            <section>
                <h3 className={css({textAlign:'center',fontWeight:'bold',mt:'18px'})}>お気に入りレシピ</h3>
                <div className={css({display:'flex',overflowX:'scroll',whiteSpace:'nowrap',mt:'8px'})}>
                    {recipes.map((recipe, index) => (
                        <Link key={index}  href={recipe.recipeUrl} legacyBehavior passHref>
                            <a target="_blank" rel="noopener noreferrer">
                                <div className={css({w:'110px',h:'140px',display:'flex',alignItems:'center',flexDirection:'column',m:'0 12px',gap:'6px'})}>
                                    <div className={css({w:'80px',h:'80px',rounded:'50px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'})} style={{backgroundColor:mainColor}}>
                                        <Image src={recipe.foodImageUrl} alt="レシピのトップ画" width={70} height={70} className={css({w:'70px',h:'70px',rounded:'50%'})}/>
                                    </div>
                                    <p className={css({fontWeight:'bold',fontSize:'10px',whiteSpace:'normal',overflow:'ellipsis',textOverflow:'ellipsis'})}>{recipe.recipeTitle}</p>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}