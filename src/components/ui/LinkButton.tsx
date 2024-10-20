import Link from "next/link"



const LinkButton = ({ name, href = "/sign-in" }: { name: string, href?: string }) => {
    return (
        <Link href={href} className="bg-green-600 text-white font-semibold hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-sm p-2 rounded-md cursor-pointer z-10">
            {name}
        </Link>
    )
}


export default LinkButton