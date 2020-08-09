export default function ({ store, redirect, route: { meta }, app, ...rest }) {
    console.log({ app });

    // If the user is not authenticated
    const { permissions, user, token } = store.state.auth;
    if (!user || !token || !permissions) {
        return redirect("/login");
    }

    for (const { permission } of meta) {
        if (permission && !permissions.includes(permission)) {
            store.commit("auth/unset");
            redirect("/login");
            break;
        }
    }
}
