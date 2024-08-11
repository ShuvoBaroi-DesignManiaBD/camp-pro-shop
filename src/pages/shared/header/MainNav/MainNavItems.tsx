import UniqueIdGenerator from "@/utils/UniqueIdGenerator";

type MenuItem = {
    key: string,
    label: string,
    url: string,
    children?: [MenuItem]
}

const MainNavItems: MenuItem[] = [
    {
        key: UniqueIdGenerator(),
        label: 'Home',
        url: '/'
    },
    {
        key: UniqueIdGenerator(),
        label: 'About',
        url: '/about',
        children: [
            {
                key: UniqueIdGenerator(),
                label: 'Home',
                url: '/'
            },]
    },
    {
        key: UniqueIdGenerator(),
        label: 'Shop',
        url: '/shop',
        children: [
            {
                key: UniqueIdGenerator(),
                label: 'Shop',
                url: '/shop'
            },]
    },
]

export default MainNavItems;