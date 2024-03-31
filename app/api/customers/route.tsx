import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";
const dayjs = require('dayjs')
var postreqcalled = 0;


export async function POST(request:NextRequest){
  var date = dayjs().$d
  var a = postreqcalled +1;
postreqcalled = a;
console.log(postreqcalled);
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
