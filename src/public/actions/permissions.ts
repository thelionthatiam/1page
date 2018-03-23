export const GUEST = 'GUEST'
export const USER = 'USER'


export const guest = () => {
    return {
      type: GUEST
    }
}

export const user = () => {
  return {
    type: USER
  }
}
