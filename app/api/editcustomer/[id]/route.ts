import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";


export async function PATCH(request:NextRequest, { params }:{params : {id : string}}){
    const body = await request.json();
    const updatecustomers = await prisma.customers.update({
        where: {
            id : parseInt(params.id)

        },
        data: {
        customername : body.custname,
         mobilenumber : body.mobno,
         devicename : body.devicename,
         problem     : body.problem
      }
      })

 return NextResponse.json(updatecustomers);
}