interface UserInfoRequest {
    userId: number;
}

export async function POST(body: UserInfoRequest) {
    return Response.json("OK")
}