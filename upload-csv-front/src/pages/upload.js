import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../public/components/Layout'

export default function upload() {
    const fileRef = useRef();
    const AIP_URL = 'http://localhost:8000/api';
    const [batchId, setBatchId] = useState();
    const [isLoading, setIsLoading] = useState(false);
  
    function handleForm(e) {
        e.preventDefault();
        if(isLoading) return;
        const inputFile = fileRef.current;
        const file = inputFile.files[0];
        if(!file) return;

        const formData = new FormData();
        formData.append('mycsv', file);

        setIsLoading(true);

        fetch(`${AIP_URL}/upload`, {method: 'post', body: formData})
        .then((res)=> res.json())
        .then( (data)=> {
            setBatchId(data.id);
            setIsLoading(false);
        });
    }

    const [batchDetail, setBatchDetails] = useState({});

    function batchDetails(id = null) {
        const currentBatchId = id ?? batchId;
        fetch(`${AIP_URL}/batch?id=${currentBatchId}`)
        .then((res)=> res.json())
        .then((data)=> {
            if(data.progress >= 100){
                clearInterval(progresssInterval.current)
            }
            setBatchDetails(data)
        })
    }

    const progresssInterval = useRef("");

    function updateProgress(){
        if(progresssInterval.current !== "") return;
        progresssInterval.current = setInterval(()=>{
            batchDetails();
        }, 2000);
        
    }

    useEffect(()=>{
        if(batchId != null){
            updateProgress();
        } 
    },[batchId]);

    useEffect(()=>{
        fetch(`${AIP_URL}/batch/in-progress`)
        .then((res)=> res.json()).then((data)=> setBatchId(data.id));
    }, [])

    return (
        <Layout>
            {batchDetail.progress !== undefined && 
                <section>
                    <p>Upload is in Progress {batchDetail.progress}%</p>
                    <progress value={batchDetail.progress} max="100"></progress>
                </section>
            }
            {batchDetail.progress === undefined && 
                <section>
                    <h1>Upload Page</h1>
                    <form onSubmit={handleForm}>
                            <input className='' type="file" ref={fileRef} />
                            <input type="submit" />
                    </form>
                </section>
            }

        </Layout>
    )
}
