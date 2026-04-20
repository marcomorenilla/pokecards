import { useEffect, useMemo, useState } from 'react';
import { SocialInfo } from './SocialInfo';
import { SocialSection } from './SocialSection';
import { router } from '@inertiajs/react';

const initialMazeMap = new Map();
export function SocialWrapper({ usersMazes, reacted }: any) {
    const reactedArray = useMemo(() => {
        const reactedGroup = new Map<string, any>([
            ['likeReaction', []],
            ['dislikeReaction', []],
        ]);

        reacted.forEach((singleReaction: any) => {
            const key =
                singleReaction.reaction === 1
                    ? 'likeReaction'
                    : 'dislikeReaction';

            const currentArray = reactedGroup.get(key) || [];

            reactedGroup.set(key, [...currentArray, singleReaction.maze_id]);
        });

        return reactedGroup;
    }, [reacted]);
    const handleLiked = (mazeId: any) => {
        router.post(
            '/social/like',
            { maze_id: mazeId, reaction: 1 },
            { preserveScroll: true },
        );
    };
    const handleDisliked = (mazeId: any) => {
        router.post(
            '/social/like',
            { maze_id: mazeId, reaction: 0 },
            { preserveScroll: true },
        );
    };

    return (
        <>
            <SocialInfo />
            {usersMazes &&
                usersMazes.map((user: any) => {
                    const userProp = { name: user.name, img: user.img };
                    const maze = user.mazes;

                    const likedArray = reactedArray.get('likeReaction');
                    const dislikedArray = reactedArray.get('dislikeReaction');
                    const liked = likedArray?.includes(user.id);
                    const disliked = dislikedArray?.includes(user.id);

                    return (
                        <SocialSection
                            key={user.id}
                            mazeId={user.id}
                            user={userProp}
                            maze={maze}
                            liked={liked}
                            disliked={disliked}
                            handleLiked={handleLiked}
                            handleDisliked={handleDisliked}
                        />
                    );
                })}
        </>
    );
}
