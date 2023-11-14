export type GoogleUserMetaDataType = {
  iss: string
  sub: string
  name: string
  email: string
  picture: string
  full_name: string
  avatar_url: string
  provider_id: string
  email_verified: boolean
}

export type UserDataType = {
  id: string
  name: string
  cumulative_winnings: number
  amount_spent: number
}
