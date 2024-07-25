export const initialState = {
    isLoggedIn: false,
    user: null,
};

 export default function getUser() {
    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
    } else {
        user = null;
    }
    return user;
}