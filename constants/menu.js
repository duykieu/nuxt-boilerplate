export default [
    {
        label: "Trang chủ",
        path: "/",
        permission: "DashboardIndex",
        icon: "house-fill",
    },
    {
        label: "Sản phẩm",
        icon: "house-door",
        active: ["/category/create"],
        children: [
            {
                label: "Tất cả sản phẩm",
                path: "/product",
                permission: "ProductIndex",
            },
            {
                label: "Thêm sản phẩm",
                path: "/product/create",
                permission: "ProductStore",
            },
            {
                label: "Quản lý bộ sưu tập",
                path: "/product/category",
                permission: "CategoryIndex",
            },
            {
                label: "Quản lý thuộc tính",
                path: "/product/option",
                permission: "CategoryIndex",
            },
        ],
    },

    {
        label: "Người dùng",
        icon: "person",
        active: ["/user-group/create"],
        children: [
            {
                label: "Tất cả người dùng",
                path: "/user",
                permission: "UserIndex",
            },
            {
                label: "Thêm người dùng",
                path: "/user/create",
                permission: "UserStore",
            },
            {
                label: "Nhóm người dùng",
                path: "/user-group",
                permission: "UserGroupIndex",
                active: ["user-group"],
            },
        ],
    },
    {
        label: "Cài đặt",
        path: "/setting",
        permission: "SettingIndex",
        icon: "gear",
    },
];
