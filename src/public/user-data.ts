export const POPULATE = 'POPULATE';

export function populate (userData) {
    console.log('~~~~~~~~~~~~~~~~~~.6 userData', userData)
    return {
        type: POPULATE,
        userData
    }
}
