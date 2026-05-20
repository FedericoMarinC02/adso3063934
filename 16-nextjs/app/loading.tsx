import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image
                src="/imgs/carga.gif"
                width={300}
                height={300}
                alt="loading"
            />
        </div>
    )
}