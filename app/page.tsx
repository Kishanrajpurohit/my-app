
'use client'
import Image from "next/image";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import Link from "next/link";
import { Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast()

  const onSubmit = async (data: any) => {
    const res = await fetch('http://localhost:3000/api/customers',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      })
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-screen h-screen flex-col items-center ml-12 mt-5"
      >
        <Box className="w-96 sm:w-72">
          <Input
            placeholder="Customer Name"
            size="sm"
            className="w-96 mt-8"
            {...register("custname", {
              required: true,
              maxLength: 18,
              minLength: 3,
            })}
          />
        </Box>
        <Box className="w-96 sm:w-72">
          <Input
            placeholder="Mobile Number"
            size="sm"
            className="w-96 mt-2"
            {...register("mobno", {
              required: true,
              maxLength: 10,
              minLength: 10,
            })}
          />
        </Box>
        <Box className="w-96 sm:w-72">
          <Select
            placeholder="Device Name"
            size="sm"
            className="mt-2"
            {...register("devicename", {
              required: true,
            })}
          >
            <option value="Laptop">Laptop</option>
            <option value="CPU">CPU</option>
            <option value="Printer">Printer</option>
          </Select>
        </Box>
        <Box className="w-96 sm:w-72">
          <Textarea
            placeholder="Type the problem of the device"
            className="w-96 mt-2"
            {...register("problem", {
              required: true,
              maxLength: 30,
              minLength: 4,
            })}
          />
        </Box>
        <Box className=" ">
          <Button
            type="submit"
            colorScheme="messenger"
            size="sm"
            className="w-96 mt-2 sm:w-72"
            onClick={() =>
              toast({
                title: 'Customer Added',
                
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            }
          >
            Add Customer
          </Button>
        </Box>
      </form>
    </>
  );
}
