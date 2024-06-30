import Image from "next/image";
import notfound from "../../../../public/abstract-art-6.svg";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="relative w-1/2 h-1/2">
        <Image src={notfound} fill alt="not-found" />
      </div>
      <p className="italic text-muted-foreground">
        Seems like the project cannot be found !
      </p>
    </div>
  );
}
