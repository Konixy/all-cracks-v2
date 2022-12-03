import React, { useState, useEffect } from "react";
import Md from "@uiw/react-markdown-preview";
import config from './config'

export default function DMCA() {
  const [content, setContent] = useState<string>("Chargement...")
  useEffect(() => {
    document.title = `DMCA${config.titleSufix}`
    async function fetchContent() {
      await fetch("./DMCA.md").then((r) => r.text()).then((text) => {
        setContent(text.replace(/\${owner}/gm, config.ownerName).replace(/\${discord}/gm, config.discordInvite))
      })
    }
    fetchContent()
  }, [])

  console.log(content)

  return <Md className="mx-4 sm:mx-10 md:mx-20 my-10 px-8 py-6 rounded-lg" source={content} />;
}
