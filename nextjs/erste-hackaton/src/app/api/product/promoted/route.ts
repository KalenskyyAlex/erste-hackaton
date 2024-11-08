interface UserRequest {
    userId: number;
}

export async function POST(body: UserRequest) {


    return Response.json("OK")
}