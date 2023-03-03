<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;

use App\Models\CsvUpload;
use App\Models\JobBatches;
use App\Jobs\DataCsvProcess;


class CsvUploadController extends Controller
{

    public function index()
    {
        return view('upload-file');
    }

    public function upload()
    {
        if(request()->has('mycsv')){
            $data = file(request()->mycsv);
            $path = resource_path('temp');
            $chunks = array_chunk($data, 100);
            
            $header = [];

            $batch =  Bus::batch([])->dispatch();
            foreach($chunks as $key=>$chunk){
                $data = array_map('str_getcsv', $chunk);
                
                if($key === 0){
                    $header = $data[0];
                    unset($data[0]);
                }
                $batch->add(new DataCsvProcess($data, $header));
            }
            return $batch;
        }
        return "No File Uploaded";
    }

    public function batch()
    {
        $batchId = request('id');
        return Bus::findBatch($batchId);
    }

    public function batchInProgress()
    {
        $batches = DB::table('job_batches')->where('pending_jobs', '>', 0)->get();
        if (count($batches) > 0) {
            return Bus::findBatch($batches[0]->id);
        }

        return [];
    }
}
