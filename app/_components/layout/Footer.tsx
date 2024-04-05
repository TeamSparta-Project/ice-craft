import React from "react";
import FooterLogo from "@/public/images/footer_logo.svg";
import S from "@/app/_style/commons/commons.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={S.footer}>
      <Image src={FooterLogo} alt="Logo" />
      <p>copyright &copy; 2024 by IceCraft. all rights reserved.</p>
      <Link href="https://github.com/TeamSparta-Project/ice-craft" target="_blank">
        깃허브로고
      </Link>
    </footer>
  );
};
export default Footer;