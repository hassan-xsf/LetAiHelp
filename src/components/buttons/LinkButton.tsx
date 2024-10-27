import Link from "next/link";

const LinkButton = ({
  name,
  href = "/sign-in",
}: {
  name: string;
  href?: string;
}) => {
  return (
    <Link
      href={href}
      aria-label={name}
      className="z-10 rounded-md bg-green-600 p-2 text-xs font-semibold text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 sm:text-sm"
    >
      {name}
    </Link>
  );
};

export default LinkButton;
