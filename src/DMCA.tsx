import React, { useState, useEffect } from "react";
import Md from "@uiw/react-markdown-preview";
import config from './config'
const DMCAPath = require('./DMCA.md');

export default function DMCA() {
  const [content, setContent] = useState<string>("Chargement...")
  useEffect(() => {
    document.title = "DMCA | All-Cracks.fr"
    async function fetchContent() {
      await fetch(DMCAPath).then((r) => r.text()).then((text) => {
        setContent(text.replace(/\${owner}/gm, config.ownerName).replace(/\${discord}/gm, config.discordInvite))
      })
    }
    fetchContent()
  }, [])

  console.log(content)

  return <Md className="mx-20 my-10 px-8 py-6 rounded-lg" source={content} />;
}
