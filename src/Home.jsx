import React, { Component } from "react";
import config from "./config";
import { PrimaryButton, SecondaryButton } from "./Util.tsx";

export default class Home extends Component {
  render() {
    return (
      <div className="container items-center text-center my-20 mx-10 w-full">
        <div className="w-full m-0">
          <h1 className="text-2xl text-center lg:mx-20">Touts vos jeux préférés, gratuits et téléchargable en un seul <span className="text-blue-500 underline">click</span><i className="fa-solid fa-arrow-pointer absolute translate-y-5 -translate-x-3 text-black text-shadow-white"></i> !</h1>
          <div className="relative mt-10 flex flex-row justify-center items-center">
            <PrimaryButton href="/games" type="link" className="mr-4">
              Voir tout les jeux
            </PrimaryButton>
            <SecondaryButton href={config.discordInvite} type="href">
              <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
              Notre discord
            </SecondaryButton>
          </div>
        </div>
      </div>
    );
  }
}
