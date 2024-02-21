import Link from "next/link";
import logoImg from "@/assets/logo.png";
import styles from "./main-header.module.css";
import Image from "next/image";
import MainHeadBackground from "./main-header-background";
import NavLink from "./nav-link";

export default function MainHeader() {
    return (
        <>
        <MainHeadBackground />
        <header className={styles.header}>
            <Link className={styles.logo} href="/">
                <Image src={logoImg} alt="a plate with food on it" priority/>
                NextLevel Food
            </Link>

            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink href='/meals'>Browse Meals</NavLink>
                    </li>
                    <li>
                    <NavLink href='/community'>Foodies Community</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    </>
    )
}