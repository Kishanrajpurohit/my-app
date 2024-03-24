import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";


export async function GET(request:NextRequest, response:NextResponse){


    const customers = await prisma.customers.findMany();

 return NextResponse.json(customers);
}