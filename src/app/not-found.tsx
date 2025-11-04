import Image from "next/image";

export default function PageNotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center mb-60">
        <Image src="/not-found.svg" height={350} width={350} alt="404" />
        <h2 className="text-3xl font-bold mt-20">Página não encontrada!</h2>
      </div>
    </div>
  );
}
