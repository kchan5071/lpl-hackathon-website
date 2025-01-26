import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page",
  description: "This is the Contact Page",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Meet the Team"
        description="The lovely devs that brought you this product."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
