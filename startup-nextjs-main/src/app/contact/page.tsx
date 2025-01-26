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
    <div className="bg-white">
      <Contact />
    </div>
  );
};

export default ContactPage;
