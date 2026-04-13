import { MazeWrapper } from '../components/maze/MazeWrapper';
import MainLayout from '../layouts/MainLayout';

export default function Maze({ pokemons }: any) {
    return <MazeWrapper pokemons={pokemons} />;
}

Maze.layout = (page: any) => {
    const { auth } = page.props;
    return <MainLayout auth={auth}>{page}</MainLayout>;
};
