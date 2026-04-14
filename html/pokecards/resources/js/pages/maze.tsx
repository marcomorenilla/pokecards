import { MazeWrapper } from '../components/maze/MazeWrapper';
import MainLayout from '../layouts/MainLayout';

export default function Maze({ pokemons, auth, maze }: any) {
    return <MazeWrapper maze={maze} pokemons={pokemons} auth={auth} />;
}

Maze.layout = (page: any) => {
    const { auth } = page.props;
    return <MainLayout auth={auth}>{page}</MainLayout>;
};
