interface UserInfoRequest {
    userId: string;
}

export async function POST(body: UserInfoRequest) {
    return Response.json("OK")
}