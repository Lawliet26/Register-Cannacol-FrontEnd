export const authUtils = {
    //Guardar tokens en el localestorage
    setTokens: (tokens) => {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
    },

    //obtener token de acceso
    getAccessToken: ()=>{
        return localStorage.getItem('access_token');
    },

    //Obtener refresh token
    getRefreshToken: ()=> {
        return localStorage.getItem('refresh_token');
    },

    //Guardar datos del usuario
    setUser: (user)=>{
        localStorage.setItem('user', JSON.stringify(user));
    },

    //Obtener datos del usuario
    getUser: ()=>{
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user): null;
    },

    //Verificar si el usuario está autenticado
    isAuthenticated: ()=>{
        const token = localStorage.getItem('access_token');
        return token !== null;
    },

    //Limpiar todo
    clearAuth: ()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    }
}