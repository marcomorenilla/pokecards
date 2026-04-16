import { useEffect, useState } from 'react';
import { SocialInfo } from './SocialInfo';
import { SocialSection } from './SocialSection';

const initialMazeMap = new Map();
export function SocialWrapper({ mazes, user: auth }: any) {
    const [usersMazes, setUsersMazes] = useState(initialMazeMap);

    useEffect(() => {
        const newMap = new Map(usersMazes);
        mazes.map((data: any) => {
            const userId = data['user_id'];
            const pokemon = data.pokemons;

            let userList = newMap.get(userId);
            if (userList) {
                newMap.set(userId, [...userList, pokemon]);
            } else {
                newMap.set(userId, Array.from(pokemon));
            }
        });
        setUsersMazes(newMap);
        for (let [key, value] of newMap) {
            console.log('key', key);
            console.log('value', value);
        }
    }, []);

    return (
        <>
            <SocialInfo />
            {Array.from(usersMazes).map(([user, maze]) => (
                <SocialSection pokemons={maze} user={auth} key={user} />
            ))}
        </>
    );
}
