import { SocialWrapper } from '../components/social/SocialWrapper';
import MainLayout from '../layouts/MainLayout';

export default function Social({ users_mazes, reacted }: any) {
    return <SocialWrapper reacted={reacted} usersMazes={users_mazes} />;
}

Social.layout = (page: any) => {
    const { auth } = page.props;
    console.log('props-social', page.props);
    return <MainLayout auth={auth}>{page}</MainLayout>;
};
