export const POPULATE = 'POPULATE';

export function populate (userData) {
    return {
        type: POPULATE,
        userData
    }
}
