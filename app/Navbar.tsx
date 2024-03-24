import Image from "next/image";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import Link from "next/link";



export default function Navbar() {
  return (
    <>
      <div className="w-screen flex justify-center sm:w-full">
        <Tabs className="w-screen sm:w-full">
          <TabList>
          <Link href="/">
            <Tab>Add Customer</Tab>
            </Link>
            <Link href="/Customers">
              <Tab>Customer List</Tab>
            </Link>
          </TabList>
        </Tabs>
      </div>

      
    </>
  );
}
