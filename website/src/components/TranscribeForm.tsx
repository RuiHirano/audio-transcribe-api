import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Input, ButtonGroup, Paper } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';
import { createReactEditorJS } from "react-editor-js";
import AudioPlayer from "./AudioPlayer";

export const EDITOR_JS_TOOLS = {
}

const ReactEditorJS = createReactEditorJS();

const languages = ["english", "japanese", "chinese", "german", "spanish", "russian", "korean", "french", "portuguese", "turkish", "polish", "catalan", "dutch", "arabic", "swedish", "italian", "indonesian", "hindi", "finnish", "vietnamese", "hebrew", "ukrainian", "greek", "malay", "czech", "romanian", "danish", "hungarian", "tamil", "norwegian", "thai", "urdu", "croatian", "bulgarian", "lithuanian", "latin", "maori", "malayalam", "welsh", "slovak", "telugu", "persian", "latvian", "bengali", "serbian", "azerbaijani", "slovenian", "kannada", "estonian", "macedonian", "breton", "basque", "armenian", "nepali", "mongolian", "bosnian", "kazakh", "albanian", "swahili", "galician", "marathi", "punjabi", "sinhala", "khmer", "shona", "yoruba", "somali", "afrikaans", "occitan", "georgian", "belarusian", "tajik", "sindhi", "gujarati", "amharic", "yiddish", "lao", "uzbek", "faroese", "haitian creole", "pashto", "turkmen", "nynorsk", "maltese", "sanskrit", "luxembourgish", "myanmar", "tibetan", "tagalog", "malagasy", "tatar", "hawaiian", "lingala", "hausa", "bashkir", "javanese", "sundanese"]
export type Language = typeof languages[number]
const displayModes = ["raw", "line"]
type DisplayMode = typeof displayModes[number]

export interface Props {
  data: any
  loading: boolean
  file?: File
}

const TranscribeForm: React.FC<Props> = ({ data, file, loading }) => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("raw")
  const [text, setText] = useState<string>("")
  const [audioSec, setAudioSec] = useState<number>(0)

  const dataToString = (data: any) => {
    if (!data) return ""
    let result = ""
    data.segments.forEach((seg: any) => {
      if (displayMode === "raw") {
        result += seg.text
      } else if (displayMode === "line") {
        result += seg.text + "\n"
      } else {
        result += seg.text
      }
    })
    return result
  }

  useEffect(() => {
    setText(dataToString(data))
  }, [data, displayMode])

  return (
    <Paper style={{ padding: 10 }}>
      <div style={{ marginBottom: 10 }}>
        <ButtonGroup size="small" variant="contained" aria-label="outlined primary button group">
          {displayModes.map((mode: DisplayMode) => {
            return <Button
              key={mode}
              color={displayMode === mode ? "primary" : "inherit"}
              disableElevation={displayMode === mode}
              onClick={() => { setDisplayMode(mode) }}
            >{mode}</Button>
          })}
        </ButtonGroup>
      </div>
      <div style={{ marginBottom: 10 }}>
        <TextField
          multiline
          variant="outlined"
          value={text}
          disabled={loading}
          onChange={(e) => { setText(e.target.value) }}
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              minHeight: "50vh",
            }
          }}
          maxRows={20}
        />
      </div>
      <div style={{}}>
        <AudioPlayer
          file={file}
          onListen={(sec: number) => { setAudioSec(sec) }}
        />
      </div>
    </Paper>
  );
};

export default TranscribeForm;
