export interface JwtUser {
    id: string
    email: string
}

export interface GraphqlContext {
    user?: JwtUser
}

export interface CreateTweet {
    data: {
        content: string
    }
}