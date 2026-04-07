import MainLayout from '@/js/layouts/MainLayout';
import { IndexGrid } from '../components/index/IndexGrid';

const Index = ({ auth }: any) => {
    const { user } = auth;
    return <IndexGrid coins={user.coins} />;
};

Index.layout = (page: any) => {
    const { auth } = page.props;

    return <MainLayout auth={auth}>{page}</MainLayout>;
};

export default Index;
