import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../public/components/Layout'

export default function Index() {
  const fileRef = useRef();
  const AIP_URL = 'http://localhost:8000/api';
  const [batchId, setBatchId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [displayMeg, setDisplayMeg] = useState(false);


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
              setBatchDetails(undefined)
              setDisplayMeg(true);
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
      <div className='upload_area'>
        <div>
          <p> Uplaod CSV Here</p>
            <form className='upload_form' onSubmit={handleForm}>
              <input className='upload_file' type="file" ref={fileRef} />
              <input className='upload_btn' type="submit" value="Upload CSV" />
            </form>
        </div>
        {batchDetail.progress !== undefined && 
        <div>
            <p className='progress_label'>Upload is in Progress {batchDetail.progress}%</p>
            <progress value={batchDetail.progress} max="100"></progress>
        </div>
        }

        {displayMeg && 
        <div className='msg'>
            <p className='progress_label'>Job {batchId} Is Done.</p>
        </div>
        }
      </div>  
      </Layout>
  )
}
