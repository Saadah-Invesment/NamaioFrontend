import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Props { }

const NamaioLogo: NextPage<Props> = ({ }) => {
    return (
        <Link href={"/"}>
            <div className="">  {/* Removes gap */}
                <Image
                    src="/images/namaio-logo.png"
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

export default NamaioLogo