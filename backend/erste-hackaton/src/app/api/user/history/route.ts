interface UserHistoryRequest {
    userId: string;
    page: number;
}

export async function POST(body: UserHistoryRequest) {
    return Response.json("OK")
}