import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Props { }

const TezcaiLogo: NextPage<Props> = ({ }) => {
    return (
        <Link href={"/"}>
            <div className="">  {/* Removes gap */}
                <Image
                    src="/images/tezcai-logo.png"
                    alt="Logo"
                    width={200}
                    height={200}
                    className=''
                    loading='lazy'
                />
                
            </div>
        </Link>
    )
}

export default TezcaiLogo