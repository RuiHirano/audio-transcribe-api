import React, { useState, memo, useMemo } from 'react';
import axios from "axios";
import Header from "../components/Header"
import TranscribeForm, { Language } from '../components/TranscribeForm';
import { useQuery, useMutation } from '@tanstack/react-query'
import ReactAudioPlayer from 'react-audio-player';
import TranscribeInput from '../components/TranscribeInput';
import AudioPlayer from '../components/AudioPlayer';
import HomeLayout from '../layouts/HomeLayout';

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS || 'http://localhost:5000'
console.log("API_ADDRESS", API_ADDRESS)

const Home: React.FC = () => {
    const [file, setFile] = useState<File | undefined>(undefined)
    const [audioSec, setAudioSec] = useState<number>(0)

    const { isLoading, mutate: handleSubmit, data } = useMutation(
        ({ file, language }: { file: File, language: Language | undefined }) => {
            setFile(file)
            const params = new FormData();
            params.append("file", file);
            let url = `${API_ADDRESS}/transcribe`
            if (language) {
                url += "?language=" + language
            }
            return axios.post(url, params, { headers: { 'Content-Type': 'multipart/form-data', 'accept': 'application/json' } }).then(res => res.data === undefined ? null : res.data)
        },
        {
            onSuccess: () => {
                console.log("success")
            },
            onError: (error) => {
                console.log(error)
            },
        }
    )

    return (
        <div>
            <HomeLayout title='Astella ~AI音声自動文字起こし~'>
                <div style={{ marginTop: 50, marginLeft: 200, marginRight: 200 }}>
                    <div style={{ marginBottom: 20 }}>
                        <TranscribeInput
                            onSubmit={(d) => { setFile(d.file); handleSubmit(d) }}
                            loading={isLoading}
                        />
                    </div>
                    <TranscribeForm
                        data={data}
                        file={file}
                        loading={isLoading}
                    />
                </div>
            </HomeLayout>
        </div>
    )
};
export default Home;
