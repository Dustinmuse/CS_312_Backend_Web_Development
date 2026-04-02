import Image from "next/image";
import Link from "next/link";

import logoAsset from "@/public/assets/logo.svg";
import styles from "./index.module.css";

export const Logo = (
  <Link href="/" className={styles.root}>
    <Image
      src={logoAsset}
      alt="Grub Hunter logo"
      fill
      priority
      sizes="(min-width: 600px) 169px, 119px"
    />
  </Link>
);
