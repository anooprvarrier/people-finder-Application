export const USERS = {
    1: {
        id: 1,
        email: 'anooprvarrier@gmail.com',
        password: 'anoop1234'
    },
    2: {
        id: 2,
        email: 'anooprvarrier@zoho.com',
        password: 'anoop1234'
    },
    3: {
        id: 3,
        email: 'vishnucvarrier@gmail.com',
        password: 'vishnu1234'
    },
    4: {
        id: 4,
        email: 'jishnucvarrier@gmail.com',
        password: 'jishnu1234'
    },
    5: {
        id: 5,
        email: 'warrierabr@gmail.com',
        password: 'abr1234'
    }
};
export function authenticate(email, password) {
    const user = Object.values(USERS).find(user => user.email === email);
    if (user && user.password == password)
        return user;
    else
        return undefined;
}