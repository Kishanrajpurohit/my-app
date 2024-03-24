"use client";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import prisma from "@/prisma/client";
import { useForm } from "react-hook-form";
import { Console } from "console";
import delay from "delay";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="20px"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [customers, setcustomers] = useState<any[]>([]);
  const [firstName, setFirstName] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(customers);

  const onSubmit = async (data: any) => {
    console.log(firstName);

    const res = await fetch(
      "http://localhost:3000/api/editcustomer/" + firstName,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      }
    );
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/getcustomer")
      .then((response) => response.json())
      .then((json) => setcustomers(json))
      .catch((error) => console.error(error));
      
  }, []);

  function handleSearch(e: { target: { value: any; }; }) {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = customers.filter((customer) =>
    customer.customername.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }
 console.log(customers);
  return (
    <>
      <div className="w-screen flex justify-center">
        <Box className="w-96">
          <Input
            placeholder="Search the customers"
            size="sm"
            className="w-96 mt-8"
            onChange={handleSearch}
          />
        </Box>
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow className="text-bold">
            <TableHead className="pl-10">Customer Name</TableHead>
            <TableHead>Mobile Number</TableHead>
            <TableHead>Device Name</TableHead>
            <TableHead className="">Problem</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium pl-10">
                {customer.customername}
              </TableCell>
              <TableCell>{customer.mobilenumber}</TableCell>
              <TableCell>{customer.devicename}</TableCell>
              <TableCell className="">{customer.problem}</TableCell>
              <TableCell>
                <Badge colorScheme="green">completed</Badge>
              </TableCell>
              <TableCell className="">
                <Button
                  colorScheme="teal"
                  size="xs"
                  onClick={() => {
                    setFirstName(customer.id);
                    setOverlay(<OverlayTwo />);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit the Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={16}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-screen  flex-col items-center ml-4 mt-5"
            >
              <Box className="w-96">
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
              <Box className="w-96 ">
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
              <Box className="w-96 ">
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
              <Box className="w-96">
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
                  className="w-96 mt-2"
                >
                  Add Customer
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
