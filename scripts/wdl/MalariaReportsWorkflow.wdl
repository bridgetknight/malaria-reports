version 1.0

import "MalariaReports.wdl" as MRS

workflow GenerateMalariaReports {

    meta {
        author: "Bridget Knight"
        description: "## Report Generation \n This workflow calls the Python script that generates a sequencing report."
    }
    
    input {
        Int mem_gb
    }
    
    call MRS.RunReportScript { 
        input: 
            mem_gb = mem_gb 
    }

}


