import React, { Component } from "react";
import config from "./config";
import { PrimaryButton, SecondaryButton } from "./Util";

export default class Home extends Component {
  render() {
    return (
      <div className="container items-center text-center my-20">
        <div>
          <h1 className="text-2xl">Touts vos jeux préférés, gratuits et téléchargable en un seul click !</h1>
          <div className="mt-4">
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
