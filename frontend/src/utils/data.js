import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
    LuWalletCards,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Painel",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Rendimento",
        icon: LuWalletMinimal,
        path: "/income",
    },
    {
        id: "03",
        label: "Despesas",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        id: "06",
        label: "Sair",
        icon: LuLogOut,
        path: "logout",
    },
];