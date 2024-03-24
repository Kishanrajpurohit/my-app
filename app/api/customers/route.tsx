import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";


export async function POST(request:NextRequest){

const body = await request.json();
const customer = await prisma.customers.create({
      data: {
        customername : body.custname,
         mobilenumber : body.mobno,
         devicename : body.devicename,
         problem     : body.problem
      }

    });

 return NextResponse.json(customer);
}
