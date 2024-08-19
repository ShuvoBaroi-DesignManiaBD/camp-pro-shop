import { MenuItem } from "@/types/menu.type";
import UniqueIdGenerator from "@/utils/UniqueIdGenerator";

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