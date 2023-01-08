import React from 'react';
import Md from '@uiw/react-markdown-preview';
import config from './config';

const DMCAContent = `# Informations légales\n\nNous ne craquons pas les jeux et les logiciels, nous les partageons juste. En aucun cas nous ne sommes responsable des causes du au piratage All-Cracks.fr est absolument légal et ne contient que des liens trouvés sur d'autres sites par notre équipes (nous n'hébergeons absolument rien sur notre serveur). Tout nos cracks sont testé et approuvé par notre équipe.\n\n### Contenu protégé par droits d'auteurs\n\nAll-Cracks.fr est conforme avec la Digital Millennium Copyright Act (DMCA).\nNous apportons une réponse rapide à tous avis d’infraction afin de prendre les mesures appropriées conforme avec la DMCA ainsi que des autres lois applicables en matière de droits d’auteurs.\nSi votre jeu/logiciel protégé par des droits d’auteur a été publié ici et que vous souhaitez que ce jeu/logiciel soit supprimé du site, vous devez avoir une communication écrite qui détaille les informations listées dans la section suivante.\nSi vous avez des questions ou des préoccupations, n’hésitez pas à nous contacter par e-mail.\nLes éléments suivants doivent être inclus dans votre réclamation d’atteinte aux droits d’auteur:\n\n### Piratage\n\nCe site n'encourage pas le piratage.\nCes liens sont destinés uniquement à des fins de sauvegardes.\nNe téléchargez pas les fichiers si vous ne disposez pas du support d'origine.\nPour tous nos visiteurs, n'oubliez pas de soutenir les développeurs des jeux et des logiciels.\nSi vous aimez un jeu/logiciel, alors achetez le !\n\n## Nous contacter\n\nSi vous avez une quelquonque demandes liés au droits d'auteurs, vous pouvez nous contacter par mail a l'adresse suivante : [contact@all-cracks.fr](mailto:contact@all-cracks.fr) ou bien via discord en envoyant un mp a \`${config.ownerName}\` ou encore en ouvrant un ticket sur notre [serveur discord](${config.discordInvite})`;

export default function DMCA() {
  // const [content, setContent] = useState<string>("Chargement...")
  // useEffect(() => {
  //   document.title = `DMCA${config.titleSufix}`
  //   async function fetchContent() {
  //     await fetch("./DMCA.md").then((r) => r.text()).then((text) => {
  //       setContent(text.replace(/\${owner}/gm, config.ownerName).replace(/\${discord}/gm, config.discordInvite))
  //     })
  //   }
  //   fetchContent()
  // }, [])

  return <Md className="mx-4 my-10 rounded-lg px-8 py-6 sm:mx-10 md:mx-20" source={DMCAContent.replace(/\\n/g, '\n')} />;
}
