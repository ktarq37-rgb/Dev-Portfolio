"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { HeroAvatar, MagneticIcon } from "@/components/hero-avatar";
import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { ContactForm } from "@/components/contact-form";
import { Spotlight } from "@/components/spotlight";
import {
  ArrowDown,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import type { Profile, Skill, Project, Service } from "@/lib/data";

/* ---- SVG tech icons (no react-icons dependency) ---- */
function TechIcon({ name, className = "" }: { name: string; className?: string }) {
  const base = `${className} shrink-0`;
  switch (name) {
    case "React":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-9.82-.26c.07.28.18.57.29.86l.29-.51-.3-.51c-.31.05-.61.1-.88.16m2.68 4.01c.59.66 1.2 1.28 1.83 1.79-.52-.59-1.03-1.23-1.51-1.9l-.32.11m5.61-11.82c-.33-.05-.67-.08-1.01-.11.29-.47.58-.92.84-1.37-.62-.06-1.25-.09-1.89-.09h-.66l1.69 1.57h1.03z" />
        </svg>
      );
    case "Next.js":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.473.597.614.957.14.36.21.774.21 1.24 0 .697-.149 1.287-.448 1.77a3.255 3.255 0 0 1-1.188 1.111 5.342 5.342 0 0 1-1.695.621 9.306 9.306 0 0 1-1.951.191c-.47 0-.924-.03-1.363-.092a7.59 7.59 0 0 1-1.272-.269 5.9 5.9 0 0 1-1.058-.442v-2.666c.348.27.714.49 1.098.661.384.172.763.294 1.138.365a5.67 5.67 0 0 0 1.016.106c.304 0 .578-.028.822-.082a1.98 1.98 0 0 0 .614-.24.993.993 0 0 0 .406-.403c.09-.166.14-.362.14-.587 0-.21-.07-.404-.21-.58a2.223 2.223 0 0 0-.574-.49 6.068 6.068 0 0 0-.86-.44c-.353-.155-.728-.31-1.121-.467-.47-.19-.89-.399-1.258-.624a4.13 4.13 0 0 1-.943-.77 3.16 3.16 0 0 1-.59-.98c-.136-.372-.204-.803-.204-1.296 0-.657.138-1.218.414-1.684a3.4 3.4 0 0 1 1.108-1.15 4.89 4.89 0 0 1 1.594-.67 7.949 7.949 0 0 1 1.868-.21zM7.326 9.93h5.328v2.097H10.26v8.224H7.984V12.027H5.647V9.93h1.679z" />
        </svg>
      );
    case "Node.js":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.28.28 0 0 0-.137-.242L11.997 1.607a.27.27 0 0 0-.27 0L2.933 6.681a.282.282 0 0 0-.139.241v10.15a.27.27 0 0 0 .137.236l2.409 1.392c1.307.653 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.18 18.675A1.857 1.857 0 0 1 1.27 17.07V6.921c0-.681.363-1.317.953-1.658L11.018.187a1.93 1.93 0 0 1 1.843 0l8.794 5.076c.59.34.954.977.954 1.658v10.15c0 .681-.364 1.316-.954 1.657l-8.794 5.076a1.847 1.847 0 0 1-.863.196zm2.565-6.996c-3.958 0-4.787-1.818-4.787-3.34 0-.142.113-.254.255-.254h1.14c.126 0 .234.092.253.215.172 1.162.687 1.75 3.026 1.75 1.862 0 2.654-.421 2.654-1.408 0-.57-.225-.992-3.118-1.275-2.416-.239-3.91-.773-3.91-2.71 0-1.784 1.504-2.846 4.025-2.846 2.831 0 4.233.983 4.41 3.091a.257.257 0 0 1-.065.19.258.258 0 0 1-.183.08h-1.146a.252.252 0 0 1-.245-.197c-.272-1.209-.933-1.594-2.771-1.594-2.04 0-2.278.711-2.278 1.243 0 .646.28.834 3.02 1.198 2.714.361 4.008.871 4.008 2.77-.002 1.93-1.608 3.027-4.238 3.027z" />
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3418-2.2466.0307-2.4504-.0967 1.398-2.2781 2.5478-5.0684 3.1313-7.6693.3272-1.4592.2996-2.6488-.0759-3.4515C22.4639 1.6442 20.4555 0 17.6326 0c-1.5303 0-2.8537.3997-3.276.539a7.3527 7.3527 0 0 0-2.4063-.3882c-1.2544 0-2.384.3479-3.2994.9976a6.5048 6.5048 0 0 0-1.3122-.7479C6.6442.1282 5.8817 0 5.2254 0 3.0431 0 1.6494 1.4247 1.3223 4.0577.9875 6.7589.7554 11.2836.3906 15.2863c-.3099 3.4117.5805 5.6416 2.5066 6.273.7072.2321 1.476.2675 2.227.102 1.0013-.2205 1.9145-.7733 2.5829-1.5596 1.7254.3726 3.41.258 4.9652-.3428.05.3225.1091.64.1789.9562.2046.9194.6002 1.7133 1.1355 2.2227a2.4206 2.4206 0 0 0 1.6886.6846c.565 0 1.1608-.1866 1.7218-.5385.7482-.469 1.5271-1.2389 2.1296-2.2628.0614-.1039.1175-.2129.1669-.3248.6875-1.5537 1.8504-5.6702 2.0861-6.5159.0965-.046.1901-.0836.2801-.1118.4927-.1542.839-.4245 1.0064-.7826.1649-.353.1412-.772-.0621-1.1128zM2.3107 20.8585c-1.268-.4144-1.6343-2.1635-1.3795-4.9737.3649-4.0027.5968-8.521.929-11.1984.142-1.1508.5263-3.1752 2.3654-3.1752.4746 0 1.0327.0921 1.6379.3275-1.062 1.039-1.6746 2.6393-1.833 4.8322-.1547 2.1446.1899 4.9634.9816 7.9856a.271.271 0 0 0 .5238-.1384c-.7838-2.992-1.1216-5.777-.9707-7.8783.1747-2.4361.9504-3.9859 2.1854-4.7459a5.5037 5.5037 0 0 1 .6326-.3284c.0795.0591.159.1215.237.1886 1.1452.985 1.8168 2.7331 1.9982 5.1962.0885 1.2006.0352 2.5186-.1518 3.9411a.271.271 0 0 0 .5336.0893c.1906-1.449.2452-2.7936.155-4.0202-.139-1.8913-.5956-3.4071-1.3588-4.5502.4876-.1191 1.0742-.2049 1.7488-.2049.7927 0 1.4852.1461 2.074.4322a2.2265 2.2265 0 0 0-.1571.0735C11.5496 3.4214 10.7698 5.4 10.6 8.3476c-.0957 1.6624.1174 3.5016.5838 5.3264a.271.271 0 1 0 .5244-.1369c-.4603-1.8016-.6704-3.613-.5768-5.2453.165-2.8652.8995-4.7607 2.0633-5.328a2.3548 2.3548 0 0 1 .5137-.2097 5.2582 5.2582 0 0 1 1.4694 1.2898c.0048.0069.01.013.0152.0193 1.1787 1.6124 1.7483 4.3536 1.5558 7.503-.0997 1.6322-.4327 3.2015-.9614 4.5358-.1488.3756-.314.7254-.4923 1.0413-.1005-.0525-.1974-.1127-.2867-.1783-.7862-.578-1.2361-1.5426-1.2988-2.7846-.045-.8913.0268-1.8651.2222-2.9747a.2708.2708 0 1 0-.5328-.0962c-.1998 1.1341-.273 2.1316-.2262 3.0516.0716 1.4166.6074 2.528 1.5244 3.1838 0 0 .3268.2338.7696.3684-.1954.2866-.402.5343-.6098.7305-.6636.6266-1.2836.8586-1.8528.694-.5706-.165-.9768-.6833-1.2108-1.5437a19.8627 19.8627 0 0 1-.3508-1.751c-.11-.721-.2131-1.472-.3574-2.1658-.1495-.7194-.3543-1.3519-.673-1.8082-.317-.4532-.7638-.7532-1.3812-.786-.5384-.0286-1.0084.1553-1.3956.5096a2.6746 2.6746 0 0 0-.0693.0684c-.8014.8287-1.1982 2.151-1.0755 3.5969.1138 1.3395.6646 2.5326 1.5091 3.2653.0406.0353.0833.0688.1268.1003-.1898.4148-.4113.7762-.6616 1.0747-.5729.6833-1.3306 1.0957-2.1927 1.285-.5764.1266-1.1707.1031-1.7173-.0663z" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      );
    case "Figma":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 8.943h-4.588c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM4.117 11.963c0 1.665 1.354 3.02 3.019 3.02h3.117V8.944H7.136c-1.665 0-3.019 1.354-3.019 3.019zm7.147-8.981H7.136c-2.476 0-4.49 2.014-4.49 4.49s2.014 4.491 4.49 4.491h4.588V2.982h-.46zm-.46 1.471v6.539H7.136c-1.665 0-3.019-1.355-3.019-3.019s1.355-3.52 3.019-3.52h3.668zm0 15.035c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.46v8.98h-.46zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02V11.98zm7.676 3.019c0-2.476-2.014-4.49-4.49-4.49s-4.49 2.014-4.49 4.49 2.014 4.49 4.49 4.49 4.49-2.014 4.49-4.49zm-7.509 0c0-1.665 1.355-3.019 3.019-3.019s3.019 1.355 3.019 3.019-1.355 3.019-3.019 3.019-3.019-1.354-3.019-3.019z" />
        </svg>
      );
    case "Docker":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.12a.186.186 0 0 0-.185.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
        </svg>
      );
    default:
      return <Code className={base} />;
  }
}

/* ---- Service icon mapping ---- */
const serviceIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code,
  Palette,
  Smartphone,
  Lightbulb,
};

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Twitter,
  Linkedin,
};

/* ---- Fade in variant ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20, delay: i * 0.08 },
  }),
};

/* ---- Component ---- */
interface PortfolioPageProps {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  services: Service[];
}

export function PortfolioPage({ profile, skills, projects, services }: PortfolioPageProps) {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <Spotlight />

      {/* Noise texture */}
      <div className="noise-bg fixed inset-0 z-0 pointer-events-none" />

      {/* Subtle dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg" />

      {/* Ambient glow top */}
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-violet-600/[0.07] rounded-full blur-[120px] pointer-events-none z-0" />

      <Navbar />

      {/* ========== HERO BENTO SECTION ========== */}
      <section className="relative min-h-screen pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[170px] md:auto-rows-[190px]">

            {/* Hero Text -- large */}
            <BentoCard className="md:col-span-2 md:row-span-2 p-7 flex flex-col justify-center" delay={0}>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-block px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold tracking-wide uppercase mb-5 w-fit"
              >
                Available for Freelance
              </motion.span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1] mb-3 tracking-tight text-balance">
                <span className="text-white/90">{"Hi, I'm"}</span>{" "}
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                  {profile.name}
                </span>
              </h1>

              <p className="text-sm md:text-base text-white/50 max-w-md mb-6 leading-relaxed">
                {profile.title}
              </p>

              <div className="flex flex-wrap gap-2.5">
                <motion.a
                  href={profile.resumeUrl}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 bg-white text-slate-950 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-white/90 transition-colors"
                >
                  Download CV <ArrowDown size={14} />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-white/80 font-semibold text-sm flex items-center gap-2 hover:bg-white/[0.04] hover:border-white/20 transition-all"
                >
                  {"Let's Talk"} <Mail size={14} />
                </motion.a>
              </div>
            </BentoCard>

            {/* Avatar Card */}
            <BentoCard className="md:col-span-1 lg:col-span-2 md:row-span-2 p-0 flex items-end justify-center overflow-hidden" delay={0.08}>
              <HeroAvatar avatarUrl={profile.avatarUrl} />
            </BentoCard>

            {/* Tech Stack */}
            <BentoCard className="md:col-span-2 lg:col-span-2 p-5" delay={0.15}>
              <h3 className="text-[10px] font-semibold text-violet-400 tracking-[0.2em] uppercase mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.04, type: "spring" }}
                    whileHover={{ scale: 1.08, y: -1 }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/60 hover:text-white hover:border-violet-500/25 transition-colors duration-200"
                  >
                    <TechIcon name={skill.name} className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </BentoCard>

            {/* Social Links */}
            <BentoCard className="p-5 flex flex-col justify-between" delay={0.2}>
              <h3 className="text-[10px] font-semibold text-violet-400 tracking-[0.2em] uppercase mb-3">
                Connect
              </h3>
              <div className="flex gap-2">
                {profile.socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon];
                  return (
                    <MagneticIcon key={link.platform} href={link.url} label={link.platform}>
                      {Icon && <Icon size={18} />}
                    </MagneticIcon>
                  );
                })}
              </div>
            </BentoCard>

            {/* Quick Services */}
            <BentoCard className="p-5" delay={0.24}>
              <h3 className="text-[10px] font-semibold text-violet-400 tracking-[0.2em] uppercase mb-3">
                Services
              </h3>
              <div className="flex flex-col gap-1.5">
                {services.slice(0, 3).map((service, i) => {
                  const Icon = serviceIconMap[service.icon] || Code;
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.08, type: "spring" }}
                      className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
                    >
                      <Icon size={12} className="text-violet-400 shrink-0" />
                      <span className="text-[11px]">{service.title}</span>
                    </motion.div>
                  );
                })}
              </div>
            </BentoCard>

            {/* Featured Project Cards */}
            {featuredProjects.map((project, idx) => (
              <BentoCard
                key={project.id}
                className={`${idx === 0 ? "md:col-span-2 lg:col-span-2" : "md:col-span-1 lg:col-span-2"} p-0 group`}
                delay={0.3 + idx * 0.06}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex gap-1.5 mb-1.5">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[9px] font-semibold rounded-md bg-violet-500/15 text-violet-300 border border-violet-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{project.title}</h4>
                    <p className="text-[11px] text-white/50 line-clamp-1">{project.description}</p>
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </BentoCard>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="py-24 px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-display font-bold text-white/[0.03] mb-4 select-none"
          >
            ABOUT
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto"
          >
            {profile.bio}
          </motion.p>
        </div>
      </section>

      {/* ========== ALL PROJECTS ========== */}
      <section id="projects" className="py-24 px-4 md:px-6 relative">
        <div className="absolute top-0 right-[-200px] w-[600px] h-[600px] bg-violet-600/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl md:text-4xl font-display font-bold text-white mb-2"
            >
              Projects
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/40 text-sm">
              A selection of recent work
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/[0.06] hover:border-violet-500/25 overflow-hidden transition-colors duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute inset-0 bg-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {(project.liveUrl || project.repoUrl) && (
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                          >
                            <Github size={14} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex gap-1.5 mb-2">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[9px] font-semibold rounded-md bg-white/[0.04] text-white/50 border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-[12px] text-white/40 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section id="services" className="py-24 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl md:text-4xl font-display font-bold text-white mb-2"
            >
              Services
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/40 text-sm">
              What I can do for you
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service, i) => {
              const Icon = serviceIconMap[service.icon] || Code;
              return (
                <motion.div
                  key={service.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                >
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="group relative p-6 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/[0.06] hover:border-violet-500/25 transition-colors duration-300"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 group-hover:bg-violet-500/15 transition-colors">
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-sm font-bold text-white">{service.title}</h3>
                          <ArrowUpRight
                            size={14}
                            className="text-white/20 group-hover:text-violet-400 transition-colors"
                          />
                        </div>
                        <p className="text-[12px] text-white/40 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="py-24 px-4 md:px-6 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/[0.05] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-5 tracking-tight text-white">
              {"Let's work"} <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                together.
              </span>
            </h2>
            <p className="text-sm text-white/40 mb-8 leading-relaxed max-w-md">
              Have a project in mind? I{"'"}d love to hear about it. Reach out and let{"'"}s start a conversation.
            </p>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center text-violet-400 border border-white/[0.06]">
                <Mail size={18} />
              </div>
              <a
                href="mailto:hello@example.com"
                className="text-sm text-white/70 hover:text-violet-400 transition-colors font-medium"
              >
                hello@example.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.08 }}
            className="backdrop-blur-xl bg-white/[0.02] p-7 rounded-2xl border border-white/[0.06]"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-8 text-center text-white/30 border-t border-white/[0.04]">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
