import React, { useEffect } from "react";
import config from "./config";
import { PrimaryButton, SecondaryButton } from "./Util";

export default function Home() {
  useEffect(() => {
    document.title = "All-Cracks.fr";
  }, []);
  return (
    <div className="container items-center text-center my-40 w-full">
      <div className="w-full m-0">
        <h1 className="text-2xl text-center lg:mx-20">
          Touts vos jeux préférés, gratuits et téléchargable en un seul{" "}
          <span className="text-blue-500 underline">click</span>
          <i className="fa-solid fa-arrow-pointer absolute translate-y-5 -translate-x-3 text-black text-shadow-white"></i>{" "}
          !
        </h1>
        <div className="relative mt-10 flex flex-col sm:flex-row justify-center items-center text-center">
          <PrimaryButton href="/games" type="link" className="sm:mr-4 sm:mb-0 mb-4">
            Voir tout les jeux
          </PrimaryButton>
          <SecondaryButton href={config.discordInvite} type="href">
            <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
            Notre discord
          </SecondaryButton>
        </div>
      </div>
      <div className="w-full mt-40">
        <h1 className="text-2xl">La sécurité avant tout <i className="fa-solid fa-locker"></i></h1>
        <div className="text-lg text-slate-300 mt-10">Tout nos jeux sont tésté et approuvé par notre équipe.<br/><span className="text-white text-3xl">0%</span> de chance d'avoir un virus</div>
      </div>
    </div>
  );
}
