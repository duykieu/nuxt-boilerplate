// Plugin này giúp chúng ta quan sát trạng thái của auth
// Một khi auth thay đổi ví dụ như click vào nút logout sẽ tự động redirect về login

export default function ({ store, redirect, $axios, ...rest }) {
    console.log({ rest });
    store.watch(
        state => state.auth,
        ({ token, user, permissions }) => {
            if (!token || !user || !permissions) {
                redirect("/login");
            }
            $axios.setToken(token, "Bearer");
        },
        {
            deep: true,
        },
    );
}
