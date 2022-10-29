import React, { useState } from "react";
import { Button, TextField, Typography, Select, MenuItem, ButtonGroup, Paper } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const languages = ["english", "japanese", "chinese", "german", "spanish", "russian", "korean", "french", "portuguese", "turkish", "polish", "catalan", "dutch", "arabic", "swedish", "italian", "indonesian", "hindi", "finnish", "vietnamese", "hebrew", "ukrainian", "greek", "malay", "czech", "romanian", "danish", "hungarian", "tamil", "norwegian", "thai", "urdu", "croatian", "bulgarian", "lithuanian", "latin", "maori", "malayalam", "welsh", "slovak", "telugu", "persian", "latvian", "bengali", "serbian", "azerbaijani", "slovenian", "kannada", "estonian", "macedonian", "breton", "basque", "armenian", "nepali", "mongolian", "bosnian", "kazakh", "albanian", "swahili", "galician", "marathi", "punjabi", "sinhala", "khmer", "shona", "yoruba", "somali", "afrikaans", "occitan", "georgian", "belarusian", "tajik", "sindhi", "gujarati", "amharic", "yiddish", "lao", "uzbek", "faroese", "haitian creole", "pashto", "turkmen", "nynorsk", "maltese", "sanskrit", "luxembourgish", "myanmar", "tibetan", "tagalog", "malagasy", "tatar", "hawaiian", "lingala", "hausa", "bashkir", "javanese", "sundanese"]
export type Language = typeof languages[number]
export interface Props {
  onSubmit: ({ file, language }: { file: File, language: Language | undefined }) => void
  loading: boolean
}

const TranscribeInput: React.FC<Props> = ({ onSubmit, loading }) => {
  //const [loading, setLoading] = useState<boolean>(true)
  const [file, setFile] = useState<File | undefined>(undefined)
  const [language, setLanguage] = useState<Language>("japanese")
  const handleSubmit = () => {
    if (file) {
      //setLoading(true)
      onSubmit({ file: file, language: "japanese" })
      //setLoading(false)
    }
  }

  return (
    <Paper style={{ padding: 10 }}>
      <div style={{ display: 'flex', margin: 10 }}>
        <Button component="label"
          variant="contained"
          style={{}}
        >
          オーディオファイルを選択
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              if (e.currentTarget.files && e.currentTarget.files.length > 0) {
                setFile(e.currentTarget.files[0])
              }
            }}
            style={{ opacity: 0, appearance: "none", position: "absolute" }}
          />
        </Button>
        <div style={{ marginLeft: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <Typography style={{ fontSize: 15, color: 'black' }}>{file ? file.name.length < 40 ? file.name : file.name.substring(0, 40) + "..." : ""}</Typography>
        </div>
        <div style={{ flex: 1 }} />
        <Select
          value={language}
          style={{ marginRight: 10, width: 200 }}
          placeholder="language"
          size="small"
          onChange={(e) => { setLanguage(e.target.value as Language) }}
        >
          {languages.map((l: string) => {
            return <MenuItem key={l} value={l}>{l}</MenuItem>
          })}
        </Select>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleSubmit}
          disabled={!file}
        >
          Submit
        </LoadingButton>
      </div>
    </Paper>
  );
};

export default TranscribeInput;
