import { prisma } from "@/lib/prisma.server";
import { auth } from "@/server/auth";
import { NextResponse } from "next/server";


export async function POST(request: Request){

    const session = await auth();

    if(!session?.user || !session.user.id){
        return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
try{

    const data = await request.json()

    const job = await prisma.job.create({
        data:{
            ...data,
            postedById: session.user.id
        }
    })
    return NextResponse.json(job)
}
catch(error){
    console.error("Error creating job", error)
    return new NextResponse("internal server error",{status: 500})

}
}