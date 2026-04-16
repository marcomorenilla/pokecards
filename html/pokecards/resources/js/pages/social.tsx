import { SocialWrapper } from '../components/social/SocialWrapper';
import MainLayout from '../layouts/MainLayout';

export default function Social({ pokemons, auth }: any) {
    const { user } = auth;
    return <SocialWrapper user={user} mazes={pokemons} />;
}

Social.layout = (page: any) => {
    const { auth } = page.props;
    console.log('props-social', page.props);
    return <MainLayout auth={auth}>{page}</MainLayout>;
};
