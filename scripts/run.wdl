version 1.0

task runPython {
    input {
        Int mem_gb
    }

    command {
        python3 report_gen.py ${mem_gb}
    }

    output {
        File analysis = "analysis.html"
        File summary = "summary.html"
    }
    
    runtime {
        docker: ""
        memory: mem_gb + "GB"
    }
}

workflow reportGeneration {
    input {
        Int mem_gb
    }
    
    call runPython { 
        input: 
            mem_gb = mem_gb 
    }

    meta {
        author: "Bridget Knight"
        description: "## Report Generation \n This workflow calls the Python script that generates a sequencing report."
    }
}



